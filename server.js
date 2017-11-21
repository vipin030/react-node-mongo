/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const config = require('./webpack.config.js');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
var app_config = require('./config');
var apiRoutes = express.Router(); 
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
var User = require('./user');
var Expense = require('./expense');
var mongoose = require('mongoose');
app.set('superSecret', app_config.secret);
mongoose.connect('mongodb://localhost/mydb', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
app.post('/auth/getToken/', (req, res) => { console.log(req.body);
  User.findOne({"username":req.body.email,"password":req.body.password}, function(err, user) {
    if (err) throw err;
    if(!user)
    {
      res.json({success:false,message:'Authentication failed'});
    }
    else { console.log(app.get('superSecret'));console.log(user);
       var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });
      res.json({
         success:true,message:"Success",token:token,user:user.name
      });
    }
      // object of the user
    console.log(user);
  });
   // if (req.body.email == 'hello@test.com' && req.body.password == 'test') {
     //   res.status(200)
    //           .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'});
    // } else {
    //     res.sendStatus(403);
    // }
});
app.post('/saveExpense',(req,res)=>{
  var expense = new Expense({"reason":req.body.reason,"price":req.body.price});
  expense.save(function(err){
    if(err) throw err;
    console.log("Saved Successfully");
    res.json({success:true,message:"Success"});
  })
});
app.post('/showExpense',(req,res)=> {
  var condn = {};
  if(req.body.id.trim()!=="")
    condn = {"reason":new RegExp('^'+req.body.id.trim(), "i")};
  Expense.find(condn,function(err,expenses) {
    if(err) throw err;
    res.json({data:expenses});
  });
});
if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
