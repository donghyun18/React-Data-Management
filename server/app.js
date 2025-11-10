// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming request URL: ${req.url}`);
    console.log(`[DEBUG] Request method: ${req.method}`);
    console.log(`[DEBUG] Request origin: ${req.headers.origin}`);
    next();
});
app.use(express.json());

// Health check - Testing (not important)
app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connect('mongodb://localhost:27017/petheaven', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch(err => {
    console.error("❌ MongoDB connection error:", err);
});

const adoptionRoutes = require('./routes/adoption');
const volunteerRoutes = require('./routes/volunteer');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const releaseRoutes = require('./routes/release');
const donateRoutes = require('./routes/donate');

app.use('/adoption', adoptionRoutes);
app.use('/volunteer', volunteerRoutes);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/release', releaseRoutes);
app.use('/donate', donateRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

