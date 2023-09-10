const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Server
app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

// Default routes
app.get('/', (req, res) => {
    res.send('Hello World');
})

// Routes
const routes = require('./routes/routes');

app.use('/api/v1/', routes);

// Database connection
const dbConnect = require('./config/database');
dbConnect();