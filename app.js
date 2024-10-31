const express = require('express');
const exchangeRoutes = require('./route/convertRoutes');
const limiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const CustomError = require("./controller/CustomError");
require('dotenv').config();

const app = express();


app.use('/restapi', limiter);




app.use(express.json()); // Middleware to parse JSON in request bodies
app.use('/restapi', exchangeRoutes);
app.use((req, res, next) => {
  next(CustomError.notFound('The requested route does not exist.'));
});
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

module.exports = app;
