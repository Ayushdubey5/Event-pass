const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

// In-memory storage for OTPs (in a production app, use a database)
const otpStore = new Map();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*', // In production, specify your frontend URL
  methods: ['GET', 'POST'],
}));

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTP with 5-minute expiration
const storeOTP = (email, eventId, otp) => {
  const key = `${email}-${eventId}`;
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
  otpStore.set(key, {
    otp,
    expiresAt,
    verified: false,
    attempts: 0
  });
  
  // Set timeout to remove expired OTPs
  setTimeout(() => {
    if (otpStore.has(key) && otpStore.get(key).expiresAt <= Date.now()) {
      otpStore.delete(key);
    }
  }, 5 * 60 * 1000);
};

// Send OTP
app.post('/api/send-otp', (req, res) => {
  const { email, eventId } = req.body;
  
  if (!email || !eventId) {
    return res.status(400).json({ 
      message: 'Email and event ID are required',
      success: false
    });
  }

  const otp = generateOTP();
  storeOTP(email, eventId, otp);
  
  // In a real app, send email here
  console.log(`OTP for ${email} (Event ID: ${eventId}): ${otp}`);
  
  res.status(200).json({ 
    message: 'OTP sent successfully. Check console for OTP (for demo purposes only)',
    success: true
  });
});

// Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, eventId, otp } = req.body;
  
  if (!email || !eventId || !otp) {
    return res.status(400).json({ 
      message: 'Email, event ID, and OTP are required',
      success: false
    });
  }
  
  const key = `${email}-${eventId}`;
  const storedData = otpStore.get(key);
  
  if (!storedData) {
    return res.status(400).json({ 
      message: 'No OTP found or OTP expired. Please request a new one',
      success: false
    });
  }
  
  // Increment attempt counter
  storedData.attempts += 1;
  
  // Check if too many attempts
  if (storedData.attempts > 3) {
    otpStore.delete(key);
    return res.status(400).json({ 
      message: 'Too many failed attempts. Please request a new OTP',
      success: false 
    });
  }
  
  // Check if OTP expired
  if (storedData.expiresAt <= Date.now()) {
    otpStore.delete(key);
    return res.status(400).json({ 
      message: 'OTP has expired. Please request a new one',
      success: false
    });
  }
  
  // Check if OTP matches
  if (storedData.otp === otp) {
    storedData.verified = true;
    
    // In a real app, you might want to keep the verification status
    // Here we'll remove it after successful verification
    setTimeout(() => otpStore.delete(key), 1000);
    
    return res.status(200).json({ 
      message: 'OTP verified successfully',
      success: true
    });
  }
  
  res.status(400).json({ 
    message: 'Invalid OTP',
    success: false
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('For demo purposes, OTPs will be logged to the console');
});