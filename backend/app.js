const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const { response } = require('express');

const cors = require('cors');


//port
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());


//mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'laundrydb'
});


//Route
app.get('/', (req, res)=>{
    res.send('Welcome to Invoice API');
});


// Get all invoices
app.get('/Invoices', (req, res) => {
    const sql = "SELECT * FROM invoice WHERE status = 'Pending'";
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.send('Not result');
        }
    })
});


// Get invoice by id
app.get('/Invoice/:id', (req, res) => {
    res.send("Get invoice by Id");
});


// Add invoice
app.post('/Invoice', (req, res) => {

    const sql = 'INSERT INTO invoice SET ?';

    const invoiceObj = {
        invoice_number: req.body.invoice_number,
        total: req.body.total,
        currency: req.body.currency,
        invoice_date: req.body.invoice_date,
        due_date: req.body.due_date,
        vendor_name: req.body.vendor_name,
        remittance_address: req.body.remittance_address,
        status: req.body.status
    }

    connection.query(sql, invoiceObj, error => {
        if(error) throw error;
        res.status(200);
        res.send(
            {
                "message":'Invoice submitted successfully!'
            }
        );
    })
});


// Update invoice
app.post('/Invoice/update', (req, res) => {
    
    const  {ids}  = req.body;
    const sql = `UPDATE invoice SET status = 'Approve' WHERE id in (${ids})`;
  
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Invoice updated!');
    });
});
  

// Update invoice
app.delete('/delete/:id', (req, res) => {
    res.send("Delete invoice");
});


// Check connection
connection.connect((error) =>  {
    if(error) throw error;
    console.log("MySQL database server is running!");
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
