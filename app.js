var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var code = require("express-handlebars");
var flash = require('connect-flash');
var bluebird = require('bluebird');
var mongodb = bluebird.promisifyAll(require('mongoose'));
const connection_url = process.env.MONGODB_URL || 'mongodb://localhost/Centers';
const connection_port = process.env.PORT || 3000;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");



var session = require('express-session');

var app = express();

// view engine setup
app.set('port', (process.env.PORT || 3000));
app.engine(".hbs", code({ defaultLayout: "layout", extname: ".hbs" }));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
    secret: 'fr',
    resave: false,
    saveUninitialized: false,
}))
app.use(flash())
app.use((req, res, next) => {
    res.locals.message = req.session.message
    res.locals.message1 = req.session.message1
    res.locals.done = req.session.done
    delete req.session.message
    delete req.session.message1
    delete req.session.done
    next()
})
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//database connection
mongodb.connectAsync(
    connection_url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log("DataBase Running....");
        }
    }
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
app.listen(app.get('port'), () => {
    console.log('Server Is Running')
})
module.exports = app;
