const express = require('express');
const fetch = require('node-fetch')
const app = express();
const PORT = 3000;
const mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dontdothis@123",
    database: "library_system"
});

function Estabilish_Connection() {
    con.connect(function (err) {
        if (err) throw err;
    })
}

function getName(mail, pass) {
    return new Promise((resolve, reject) => {
        let q1 = `SELECT first_name FROM employee_demographics WHERE employee_mail=\'${mail}\' AND employee_password=\'${pass}\';`;

        con.query(q1, function (err, result) {
            if (err) reject(err);

            if (result[0] === undefined) {
                // console.log('jj')
                resolve('')
            }
            else {
                // console.log(result[0].first_name, '  ', typeof (result[0].first_name))
                resolve(result[0].first_name)
            }
        });
    })
}

app.get('/', async function (req, res) {
    let mail = req.query['mail'];
    let password = req.query['password'];

    let name = await getName(mail, password);
    console.log('name', name)
    if (name == '') { 
        let c ='check for following conditions '; 
        let c1 ='1. check your email and password';
        let c2 = '2. check whether membership ended or not';

        let div = document.getElementById('error');
        div.innerText = c+c1+c2

        // res.send('fi') 
    }
    else {
    // go to next  page
        res.send(name);
    }
});
// console.log("l3")


app.listen(PORT, () => {
    console.log(`Server is running on localhost :3000`);
    Estabilish_Connection();
});