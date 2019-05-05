const fs = require('fs');
const source = `${__dirname}/../database/karyawan.json`;
const users= (fs.existsSync(source) ? JSON.parse(fs.readFileSync(source, {encoding: 'utf8'})): []);

function findAll(){
    return users;
}
function find(id){
    return users.find((user)=>{return user.id === Number(id)});
}

function insert(data){
     console.log(data);
const index = users.findIndex((user) =>{
    return user.id === Number(data.id)
});

if(index <0){
    users.push(data);
}
save(users);
return find(data.id);
}

function update(id){
 const cari = users.find((user)=>{return user.id === Number(id)});


}

function remove(id){
   return users.remove((user) => {return user.id === Number(id)});
}
function save(data){
    fs.writeFileSync(source, JSON.stringify(data));
}

module.exports={
    findAll:findAll,
    find:find,
    insert:insert,
    save: save,
    remove:remove,
    update:update
}