"use strict"
const fs = require('fs')
var colors = require('colors');

var dataFile = fs.readFileSync('data.json','UTF-8')
var dataList = JSON.parse(dataFile)
let dataArr = []
//
// for (var i = 0; i < dataList.length; i++) {
//   dataArr.push(dataList[i])
// }
//
// dataList.push({ "id":5, "task": "tes", "status": false })
let messageArr = ["# will call help",'help', 'list', 'add <task_content>', 'task <task_id>', 'delete <task_id>', 'complete <task_id>', 'uncomplete <task_id>']

let argv = process.argv

// show menu & help
if (argv[2] == undefined || argv[2] =='help') {
  for (var i = 0; i < messageArr.length; i++) {
    console.log(messageArr[i]);
  }
}

// task ...
if (argv[2] == 'task' ) {
  if (argv[3] == undefined || argv[3] == 0 || argv[3] > dataList.length) {
    console.log(`Format salah. Masukkan ${'task <spasi> nomer id'.bold}. Jumlah task saat ini : ${dataList.length}`);
  }
  else {
    console.log(`task ke ${argv[3]} :\n` + dataList[argv[3]-1]['task']);
  }
}

// list ..
if (argv[2] == 'list') {
  console.log(`\nBerikut to do list:\n`);
  for (var i = 0; i < dataList.length; i++) {
    if (dataList[i]['status'] == false) {
      console.log(`[ ] ${dataList[i]['task']}`);
    }
    if (dataList[i]['status'] == true) {
      console.log(`[X] ${dataList[i]['task']}`.bold.cyan);
    }
  }
}

// add ..
if (argv[2] == 'add') {
  if (argv[3] == undefined) {
    console.log('Masukkan task id yang akan diinput');
  }
  else {
    // here add process
    let addData = argv.splice(3, argv.length)
    dataList.push({"id":dataList.length + 1, "task": addData.join(' '), "status": false})
    console.log(`Task ${addData.join(' ').cyan} berhasil terinput dengan id ${colors.cyan(dataList.length)}`);
  }
  fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
}

// delete
if (argv[2] == 'delete') {
  if (argv[3] == undefined || argv[3] == 0 || argv[3] > dataList.length) {
    console.log(`Format salah. Masukkan ${'delete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
  }
  else {
    console.log(`Task ${dataList[argv[3]-1]['task'].red} berhasil didelete`);
    dataList.splice(argv[3]-1,1)
    for (var i = 0; i < dataList.length; i++) {
      dataList[i]['id'] = i+1
    }
    fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
  }
}

// complete
if (argv[2] == 'complete') {
  if (argv[3] == undefined) {
    console.log(`Format salah. Masukkan ${'complete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
  }
  else {
    dataList[argv[3]-1]['status'] = true
    console.log(`task ${dataList[argv[3]-1]['task'].bold.cyan} telah menjadi ${'complete!'.bold}`);
  }
    fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
  }

  // uncomplete
  if (argv[2] == 'uncomplete') {
    if (argv[3] == undefined) {
      console.log(`Format salah. Masukkan ${'uncomplete <spasi> nomer id'.bold}. Jumlah task saat ini = ${dataList.length}`);
    }
    else {
      dataList[argv[3]-1]['status'] = false
      console.log(`task ${dataList[argv[3]-1]['task'].bold.cyan} telah menjadi ${'uncomplete!'.bold}`);
    }
      fs.writeFileSync('data.json',JSON.stringify(dataList) ,'utf8')
    }
