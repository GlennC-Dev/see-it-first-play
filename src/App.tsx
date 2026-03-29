import express from 'express';

const app = express();

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Update with your client's origin in production
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Middleware for comprehensive logging
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Headers:`, req.headers);
    next();
});

// Your existing routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});