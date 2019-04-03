require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const { globalFunction } = require('./config/globals');
const system = require('./utils/system');
const cors = require('cors');
const controllers = require('./controllers/index');
const staticsConfigs = require('./config/static');
const regulators = require('./middlewares/regulators');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

/** Init global function */
globalFunction();

/** Bind statics */
staticsConfigs.forEach(static => {
  app.use(static.mount, express.static(static.root));
});

/** Bind regulator middlewares */
regulators.forEach(regulator => app.use(regulator));

/** Bind http controllers */
Object.keys(controllers).forEach(c => {
  system.logger.verbose(`Mounting controller: ${c}`);
  app.use(`/api${controllers[c].base || ''}`, controllers[c]);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

