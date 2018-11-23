const express = require('express');
var mysql = require('mysql');


const app = express();
const port = 3000;

// config de base de ejs
app.use('/public', express.static('public'))
app.set('views', './views');
app.set('view engine', 'ejs'); // config de ejs

// creations de la connection a la base de donnée
var db = mysql.createConnection({
    host     : '51.15.214.210',
    user     : 'promo_read',
    password : 'promo_read',
    database : 'english_vocabulary',
    port: 49162,

  });

// connection a la base de donnée
db.connect((err)=>{
    if(err){
        throw err
    }
    console.log('Connected on mysql')
})

app.get('/',(req,res)=>{
    let sql = 'SELECT * FROM  entries '
    db.query(sql, (err,rows) =>{
        if(err) throw err;
        let table = [];
        table = rows;
        //console.log(table)

        res.render('table',{tableau : table })
    });

})
app.listen(port, ()=>{
    console.log(`Connected on port ${port}`)
})