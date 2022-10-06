const express = require('express');
const cors = require('cors');
const env = require('./config/envConfig');
const connect = require('./config/db');
const userRoutes = require('./routes/users/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');

const app = express();
// db connection 
connect();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use('/api/categories', categoryRouter);

const port = env.PORT || 6000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});