const express = require('express');
const app = express();
const env = require('./config/envConfig');
const connect = require('./config/db');
const userRoutes = require('./routes/users/userRoutes');
const cors = require('cors');

// db connection 
connect();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});