const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;
app.set(PORT, 4000);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
  host: 'game-list-db.cckgr1rbhztp.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'CmQQrCJshgth8auDEj$3k4%tsfxm$XM4tk6YHm^C',
  port: 3306,
  database: 'db_game_list'
}, 'single'));

app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});

app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});
