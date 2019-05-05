import express from 'express';
import * as karyawan from '../dao/karyawan';
// const fs = require('fs');
// const User =require( `./../dao/karyawan`);
// const express = require('express');
// const KaryawanRouter = express.Router();
// const data=`${__dirname}../../database/karyawan.json`;


const KaryawanRouter =express.Router();

KaryawanRouter.get('/find',(req,res)=>{
    let query = "SELECT*FROM `karyawan` ORDER BY nik ASC";

    db.query(query,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

KaryawanRouter.get('/find/:id',(req,res)=>{
    let playerId = req.params.id;
    let query = 'SELECT*FROM `karyawan` where nik="' + playerId + '"';

    db.query(query,(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});

KaryawanRouter.post('/find',(req,res)=>{
    let nik = req.body.nik;
    let nama = req.body.nama;
    let jeniskelamin = req.body.jeniskelamin;
    let alamat = req.body.alamat;
    let salary = req.body.salary;
    let grade = req.body.grade;
    let query = "INSERT INTO karyawan (nik,nama,jeniskelamin,alamat,salary,grade) VALUES (?,?,?,?,?,?)";

    db.query(query,[nik,nama,jeniskelamin,alamat,salary,grade],(err,result)=>{
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    });
});


// KaryawanRouter.delete('find/:id',(req,res)=>{
//     let playerId = req.params.id;
//     let query = "DELETE FROM karyawan where nik=?";

//     db.query(query,[playerId],(err,result)=>{
//         if(err){
//             res.json(err);
//         }else{
//             res.json(result);
//         }
//     });
// })

KaryawanRouter.delete('/karyawan/:id', (req, res, next) => {

    let sql = `DELETE FROM karyawan WHERE nik = ${req.params.id}`;
    db.query(sql,(err, results)=>{
      if (err) {
        res.json(err);
      } else {
        let message = "Delete Success";
        res.json({message});
      }
    });
});

KaryawanRouter.get('/karyawan/:id/bonus', (req, res, next)=>{

    // const karyawan = findBonus(req.params.id);
    // res.json(karyawan);
  
    let sql = `SELECT * FROM karyawan WHERE nik = ${req.params.id}`;
    db.query(sql,(err, results)=>{
      if (err) {
        res.json(err);
      } else {
        let data = results[0];
        let bonus = getBonus(data.grade, data.salary);
        let resp = {
          "nik": data.nik,
          "nama" : data.nama,
          "bonus": bonus
        }
        res.json(resp);
      }
    });
    
  });

  KaryawanRouter.put('/karyawan/:id', (req, res, next) => {

    // let response = update(req.params.id, req.body, success, fail);
  
    // res.json(response);
  
    let data = req.body;
  
    let sql = `UPDATE karyawan SET nama='${data.nama}', jeniskelamin=${data.jeniskelamin}, alamat='${data.alamat}', salary=${data.salary}, grade='${data.grade}' WHERE nik= '${req.params.id}'`;
  
    db.query(sql,(err, results)=>{
      if (err) { res.json(err); } 
    });
  
    let sql2 = `SELECT * FROM karyawan WHERE nik = ${req.params.id}`;
    con.query(sql2,(err, results)=>{
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    });
  
  });


KaryawanRouter.get('/karyawans',(req,res, next)=>{
    res.json(karyawan.findAll());
});

KaryawanRouter.get('/karyawan/:id',(req,res, next)=>{
    let Karyawan =karyawan.find(req.params.id);

    if(Karyawan) res.json(Karyawan);
    else next();
});


KaryawanRouter.post('/karyawan',(req,res, nex)=>{
    const Karyawan =karyawan.insert(req.body);
    res.json(Karyawan);
});

KaryawanRouter.delete('karyawan/:id',(req,res, nex)=>{
    let Karyawan =karyawan.find(req.params.id);
    const karyawan1 =karyawan.delete(Karyawan);

    res.json(karyawan1);
});


export default KaryawanRouter;