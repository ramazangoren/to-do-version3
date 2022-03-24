const express = require('express');
const mysql = require('mysql');

const pool = mysql.createPool({
    limit: 1000000,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: "database"
})


const home = (req, res) => {

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas", (err, data) => {
            if (err) throw err;
            res.render('home', { data })
        })
    })
}

const searchinhomepage = (req, res) => {
    
    let search = req.body.searchforhome;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas WHERE idea LIKE ?",["%" + search + "%"], (err, data) => {
            if (err) throw err;
            res.render('home', { data })
        })
    })
}


const save = (req, res) => {
    let notes = req.body;
    pool.getConnection((error, connection) => {
        if (error) throw error;
        let sql = "INSERT INTO ideas SET idea=?, details=?, dateCreated=?, dateUpdated=?";
        connection.query(sql, [notes.idea, notes.details, new Date(), new Date()], (err, data) => {
            if (err) throw err;
            res.redirect('/')
        })
    })
}




const titleinnotes = (req, res) => {

    pool.getConnection((error, connection) => {
        if (error) throw error;
        connection.query("SELECT * FROM ideas where id = ?", [req.params.id], (err, data) => {
            if (err) throw err;
            // console.log(data);
            res.render('notes', { data })
        })
    })
}



const editsave = (req, res) => {
    
    const noteData = req.body;

    pool.getConnection((error, connection)=>{
        if (error) throw error;
        
        let sql = "UPDATE ideas SET idea=?, details=?,  dateUpdated=? WHERE id=?";
        connection.query(sql, [ noteData.idea, noteData.details, new Date(), req.params.id],(err, data)=>{
            if (err) throw err;  
            pool.getConnection((err, connection) => {
                if (err) throw err;
                connection.query("SELECT * FROM ideas WHERE id=?", [req.params.id], (error, data) => {
                    if (error)throw error;
                        res.render('notes', { data })
                })
            
            })
            
        })
    })
}








// const deletenotes = (req, res) => {

//     pool.getConnection((error, connection) => {
//         if (!error){
//           connection.query("DELETE FROM ideas WHERE id=?", [req.params.id], (err, data) => {
//               if (err) throw err;
//               res.redirect('/');
//           });
//         }
//         else
//         {
//             console.log(error);
//         }
//     })
// }







module.exports = {
    home: home,
    searchinhomepage: searchinhomepage,
    save: save,
    titleinnotes: titleinnotes,
    editsave: editsave
    // deletenotes: deletenotes
}