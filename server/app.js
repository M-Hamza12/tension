let express = require('express');
const cors = require('cors');
const app = express();

const errorHandler = require("./api/controller/errorHandler");
const userRouter = require("./api/routes/userRoute");
const exerciseRouter = require("./api/routes/exerciseRoute");

const corsOptions = {
  origin: "https://tension-app.netlify.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/exercise',exerciseRouter);
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(errorHandler);

module.exports = app;
