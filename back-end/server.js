const express=require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const cnctn = mysql.createConnection({
  host     : 'localhost',
  user     : 'mysql_dev',
  password : 'Mysqldev@123',
  database : 'utilities'
});


app.use(cors());
app.use(express.json());

app.post('/create',(req,res)=>{
    const name=req.body.name;
    const age=req.body.age;
    const country=req.body.country;
    const position=req.body.position;
    const wage=req.body.wage;

    cnctn.query('INSERT INTO employees(name,age,country,position,wage) values(?,?,?,?,?)',[name,age,country,position,wage],
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            res.send('hello world');
        }
    }
    );
});

app.get('/read',(req,res)=>{
    cnctn.query('SELECT * FROM employees order by id',
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            // console.log(result);
            res.send(result);
        }
    }
    );

});

app.put('/update',(req,res)=>{
    const id=req.body.id;
    // const name=req.body.name;
    // const age=req.body.age;
    // const country=req.body.country;
    // const position=req.body.position;
    const wage=req.body.wage;

    // cnctn.query('UPDATE employees set name=?,age=?,country=?,position=?,wage=? WHERE id=?',[name,age,country,position,wage,id],
    cnctn.query('UPDATE employees set wage=? WHERE id=?',[wage,id],
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('updated to DB');
            res.send('hello world');
        }
    }
    );
});

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    
    cnctn.query('DELETE FROM employees WHERE id=?',[id],
    (err,result)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('deleted from DB');
            res.send('hello world');
        }
    }
    );
});

app.listen(3001,()=>{
    console.log('server started listening on port 3001');
});