
const fs = require('fs');
const CommonResponse = require('../responses/common-response');


const dataKaryawan = `${__dirname}/../db/karyawan.json`;
const listkaryawan = (fs.existsSync(dataKaryawan) ? JSON.parse(fs.readFileSync(dataKaryawan, {encoding: 'UTF8'})) : []);

function findAll() {
  let response;
  let sql = `SELECT * FROM karyawan`;
  con.query(sql,
    (err, results)=>{
    if (err) {
      console.log(err);
    } else {
      response = results;
    }
  });
}

function findById(nik) {
  let ky = listkaryawan.find((karyawan) => {return karyawan.nik === nik});
  if (ky) {
    ky.jenis_kelamin = ky.jenis_kelamin==1 ? "Laki-Laki" : "Perempuan"; 
    return success(ky);
  } else {
    return fail(44, "Karyawan not found", null);
  }
  
}

function findBonus(nik) {
  let ky = listkaryawan.find((karyawan)=>{return karyawan.nik === nik});
  if (ky) {
    let bonus = getBonus(ky.grade, ky.salary);
    let resp = {
      "nik": ky.nik,
      "nama" : ky.nama,
      "bonus": bonus
    }
    return success(resp);
  } else {
    return fail(44, "Karyawan not found", null);
  }
  
}

function insert(data, resolve, reject) {
  const index = listkaryawan.findIndex((karyawan) => {
      return karyawan.nik === data.nik
    });

  if (index < 0) {
    let salary = parseFloat(data.salary).toFixed(3);
    data.salary = parseFloat(salary);
    listkaryawan.push(data);
    save(listkaryawan);
    return resolve(findById(data.nik));
  } else {
    return reject(34, "Nik telah digunakan", data);
  }

  
}

function update(nik, data, resolve, reject) {
  const karyawan = listkaryawan.find((karyawan) => {
    return karyawan.nik === nik
  });

    if (karyawan) {

        karyawan.nik = karyawan.nik;
        karyawan.nama = data.nama;
        karyawan.jenis_kelamin = data.jenis_kelamin;
        karyawan.alamat = data.alamat;
        karyawan.salary = data.salary;
        karyawan.grade = data.grade;

        // listkaryawan.push(karyawan);
        save(listkaryawan);
        return resolve(karyawan);

        // return success(findById(nik));
        
  } else {
    return reject(44, "Karyawan Not Found", null);
  }
  
}

function hapus(nik, resolve, reject) {
  const index = listkaryawan.findIndex((karyawan) => { return karyawan.nik === nik});
  console.log(index);
  

  if (index > -1) {
    listkaryawan.splice(index);
    save(listkaryawan);

    return resolve(null);
  } else {
    return reject(44, "Karyawan not found", null);
  }

}

function save(karyawan) {
  fs.writeFileSync(dataKaryawan, JSON.stringify(karyawan));
}


function success(data){
  return new CommonResponse(20, "Success", data);
}

function fail(status, message, data){
  return new CommonResponse(status, message, data);
}

function getBonus(grade, salary) {
  if (grade === "A") {
    return salary * 3;
  } else if (grade === "B") {
    return salary * 2;
  }  else {
    return salary + 500000;
  }
}


export {findAll, findById, findBonus, insert, update, hapus, success, fail, getBonus};
