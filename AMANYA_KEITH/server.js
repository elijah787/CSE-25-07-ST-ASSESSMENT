const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('.'));

// MongoDB connection with better error handling
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/auth_system');
        console.log(' MongoDB connected successfully!');
    } catch (error) {
        console.log(' MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();

// User Schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/sign.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'sign.html'));
});

app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

// Sign Up API
app.post('/api/signup', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: false, message: 'Database not connected' });
        }

        const { fullName, email, phone, password } = req.body;

        // Backend validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+256\d{9}$/;

        if (!emailRegex.test(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }

        if (!phoneRegex.test(phone)) {
            return res.json({ success: false, message: 'Phone must start with +256 followed by 9 digits' });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: 'Password must be at least 6 characters' });
        }

        if (fullName.trim().length < 2) {
            return res.json({ success: false, message: 'Full name must be at least 2 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });

        if (existingUser) {
            return res.json({ success: false, message: 'User already exists with this email or phone' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            phone,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ success: true, message: 'Account created successfully!' });

    } catch (error) {
        console.error('Signup error:', error);
        res.json({ success: false, message: 'Server error: ' + error.message });
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.json({ success: false, message: 'Database not connected' });
        }

        const { emailPhone, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            $or: [
                { email: emailPhone },
                { phone: emailPhone }
            ]
        });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email/phone or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ success: false, message: 'Invalid email/phone or password' });
        }

        res.json({ success: true, message: 'Login successful!' });

    } catch (error) {
        console.error('Login error:', error);
        res.json({ success: false, message: 'Server error: ' + error.message });
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});