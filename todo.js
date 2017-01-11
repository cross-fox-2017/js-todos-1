"use strict"
const fs = require('fs');
let obj = require('./data.json');
let data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

let word = '$node todo.js '
let argv = process.argv
if (argv[2] == undefined || argv[2] == 'help') {
  console.log(`${word} help`);
  console.log(`${word} list`);
  console.log(`${word} add <task_content>`);
  console.log(`${word} task <task_id>`);
  console.log(`${word} delete <task_id>`);
  console.log(`${word} complete <task_id>`);
  console.log(`${word} uncomplete <task_id>`);
}

if(argv[2] == 'list') {
  for (var i = 0; i < data.length; i++) {
    if(data[i].completed == true) {
      console.log(`[X] ${data[i].id}. ${data[i].task}`)
    } else {
      console.log(`[ ] ${data[i].id}. ${data[i].task}`)
    }
  }
}

if(argv[2] == 'add') {
  console.log("Berhasil menambahkan Task")
  let param = argv.splice(3,argv.length-3)
  data.push({"id":data.length+1,"task":param.join(' '),"completed":false})
  fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
}

if(argv[2] == 'task') {
  console.log(`Task dengan id ke-${argv[3]} adalah:`)
  if(data[argv[3]-1].completed == true) {
    console.log(`[X] ${data[argv[3]-1].id}. ${data[argv[3]-1].task}`)
  } else {
    console.log(`[ ] ${data[argv[3]-1].id}. ${data[argv[3]-1].task}`)
  }
}

if(argv[2] == 'delete') {
  console.log("Berhasil manghapus Task ke-" + argv[3])
  data.splice(argv[3]-1,1)
  for (var i = 0; i < data.length; i++) {
    data[i].id = i+1
  }
  fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
}

if(argv[2] == 'complete') {
  console.log(`Task ke-${argv[3]} ditandai selesai`)
  data[argv[3]-1].completed = true;
  fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
}

if(argv[2] == 'uncomplete') {
  console.log(`Task ke-${argv[3]} ditandai belum selesai`)
  data[argv[3]-1].completed = false;
  fs.writeFileSync('data.json',JSON.stringify(data) ,'utf8')
}
