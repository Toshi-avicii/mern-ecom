const express = require('express');
const app = express();
const env = require('./config/envConfig');
const connect = require('./config/db');
const userRoutes = require('./routes/users/userRoutes');

// db connection 
connect();

app.use("/", userRoutes);

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});