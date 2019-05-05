
import Express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = Express();
//const port = 4000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(routes);
// app.listen(port, ()=>{
//     console.log(`example app listening on port $ ${port}`)
// })

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
database: 'test',
//port:'8070'
});
 
db.connect((err)=> {
  if (err) {
   throw err;
  }
 
  console.log('connect ed to database');
});
global.db=db;

app.listen(3000, () => console.log('Application started on port 3000'));