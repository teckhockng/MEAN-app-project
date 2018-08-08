var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var fs = require('fs');
var multer = require('multer');
var multerS3 = require('multer-s3');

const aws = require('aws-sdk');
aws.config.region = 'us-east-2';
var s3 = new aws.S3();


const S3_BUCKET = process.env.S3_BUCKET;

require('dotenv').config({
  path: 'variables.env'
});

// this is our home route
var indexRouter = require('./routes/index');

// add the profiles routes
var profilesRouter = require('./routes/profiles');

var app = express();
app.use(fileUpload());

//multer with Amazon S3
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'final-mean-project',
//     acl: 'public-read',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now()+file.originalname);
//     }
//   })
// })

// use mongoose to connect to mongo
var mongoose = require( 'mongoose' );
var config = require( './config/connect' );
mongoose.connect( config.db );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// this is our home route
app.use('/', indexRouter);

// this is our profiles router
app.use('/profiles', profilesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//multer response
app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: final-mean-project,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = app;
