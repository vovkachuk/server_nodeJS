const express = require('express');
const bodyParser = require('body-parser');;
const bcrypt = require('bcrypt-nodejs');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const user = require('./models/user');
const profile = require('./models/profile');
const config = require('./config');


const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)


app.get('/', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;
   res.render('index', {user: {id, login}});
  })



app.get('/reg', (req, res) => {
    res.render('reg',{data: ''});
  })

app.post('/reg', (req, res) => {
  const {login, psw, psw2} = req.body;  
  if(!login || !psw || !psw2){
    res.render('reg', {data: 'Пустые поля, введите корректные значения'});
  } else {if(psw != psw2){
    res.render('reg', {data: 'Пароли не совпадают'});
  } else{

  user.findOne({login}).then(user_nfind => { 
    if(user_nfind){
      res.render('reg', {data: 'Имя занято'});
    }else{
      bcrypt.hash(psw, null, null, function(err, hash) {
        user.create({login: login, psw: hash }).then(user => 
          {
            req.session.userId = user.id;
              req.session.userLogin = user.Login;
              profile.create({login: login, name:' ',age:' ',country:' ',city:' '})
        })
        
        .catch(res =>{
          res.render('reg', {data: 'Ошибка добавления в БД'})
        })
    })
    res.redirect('/');
  }
  })
}}
})

app.get('/signin', (req, res) => {
  res.render('signin', {data: ''});
})

app.post('/signin', (req, res) => {
  const {login, psw} = req.body;
  if(!login || !psw ){
    res.render('signin', {data: 'Пустые поля, введите корректные значения'});
  } else {
    user.findOne({login}).then(user => { 
      if(!user){
        res.render('signin', {data: 'Логин/пароль не совпадает'});
      }else{
        bcrypt.compare(psw, user.psw, function(err, result){
          if(!result){
            res.render('signin', {data: 'Логин/пароль не совпадает'});
          } else{
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              const id = req.session.userId;
              const login = req.session.userLogin;
              res.render('index', {user: {id, login}});
          }
        })
      }
      })
  }
})


app.get('/logout', (req, res) => {
  if(req.session){
    req.session.destroy(() => { res.redirect('/'); })
  } else {
    res.redirect('/');
  }
})

app.get('/profile', (req, res) => {
  if(req.session){
  const id = req.session.userId;
  const login = req.session.userLogin;
  console.log(login);
  profile.findOne({login}).then(user => {
    const name = user.name;
    const age = user.age;
    const country = user.country;
    const city = user.city;
    res.render('profile', {user: {id, login}, profile: {login, name, age, country, city}});
  })} else {
    res.redirect('signin');
  }
})

app.get('/change', (req, res) => {
  if(req.session){
  const id = req.session.userId;
  const login = req.session.userLogin;
  profile.findOne({login}).then(user => {
    const name = user.name;
    console.log(name);
    const age = user.age;
    const country = user.country;
    const city = user.city;
    res.render('change', {user: {id, login,name, age, country, city}, data: ''});
  })} else {
    res.redirect('signin');
  }
})


app.post('/change', (req, res) => {
  if(req.session){
  const id = req.session.userId;
  const login = req.session.userLogin;
  const {newLogin, name, age, country, city, psw} = req.body;
  if(!newLogin){
    res.render('change', {user: {id, newLogin, name, age, country, city}, data: 'Введите обязательный параметр логин' });
  } else{
    if(newLogin != login){
  user.findOne({login:newLogin} ).then(user_ex => { 
    if(user_ex){
      res.render('change',  {user: {id, newLogin, name, age, country, city}, data: 'Имя занято'});
    }else{
      user.findOne({login:login}).then(user_nw => {
        const hash = user_nw.psw;
        user.deleteOne({login:login}, function(err){});
        user.create({login: newLogin, psw: hash }).then(user => 
          {
            profile.deleteOne({login:login}, function(err){});
            profile.create({login: newLogin, name: name,age: age,country:country,city:city})
      })
    })  
    }
  })
  if(psw){
    user.deleteOne({login:newLogin}, function(err){});
    bcrypt.hash(psw, null, null, function(err, hash) {
      user.create({login: newLogin, psw: hash }).then(user => 
        {
        })
  })
}
res.redirect("/logout");    
}else{
      if(psw){
        user.deleteOne({login:login}, function(){});
        bcrypt.hash(psw, null, null, function(err, hash) {
          user.create({login: login, psw: hash }).then(user => 
            {
              res.redirect("/logout");
            })
      })
    }else{
      profile.deleteOne({login:login}, function(){});
      profile.create({login: login, name: name,age: age,country:country,city:city})
      res.redirect("/profile");
    }
    }
  }}}) 
      
  module.exports = app;
