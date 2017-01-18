'use strict'

const fs = require('fs')

let getJSON = JSON.parse(fs.readFileSync('data.json', 'UTF-8'))
let getArgv = process.argv;
let getNode = "$ node todo.js";

// Untuk membaca dokumentasi penggunaan dari fungsi node
if(getArgv[2] == undefined || getArgv[2] == 'help'){
  console.log(`===================== HELP =====================`);
  console.log(`${getNode} add <task content>`);
  console.log(`${getNode} show list`);
  console.log(`${getNode} task <task_id>`);
  console.log(`${getNode} delete <task_id>`);
  console.log(`${getNode} complete <task_id>`);
  console.log(`${getNode} uncomplete <task_id>`);
}

  // SHOW List
  else if(getArgv[2] == 'list') {
    for(var i = 0; i < getJSON.length; i++) {
      if(getJSON[i].Status == "Complete") {
        console.log(`${getJSON[i].ID}.[x] ${getJSON[i].Task}`)
      } else {
        console.log(`${getJSON[i].ID}.[ ] ${getJSON[i].Task}`)
      }
    }
  }

  // Menambahkan TASK berupa object yang di push ke getJSON
  else if(getArgv[2] == 'add') {
    let tempArr = [];
    for(var i = 3; i < getArgv.length; i++) {
      tempArr.push(getArgv[i]);
    }
    let valStr = tempArr.join(" ")
    getJSON.push({
      "ID"     : getJSON.length + 1,
      "Task"   : valStr,
      "Status" : "Uncomplete"
    });
    fs.writeFileSync('data.json', JSON.stringify(getJSON), 'utf-8')
  }

  // Menghapus TASK berupa object dari getJSON
  else if(getArgv[2] == 'delete') {
    for(var i = 0; i < getJSON.length; i++) {
      if(getJSON[i].ID == getArgv[3]) {
        getJSON.splice(i, i + 1);
        fs.writeFileSync('data.json', JSON.stringify(getJSON), 'utf-8')
      }
    }
  }

  // COMPLETE TASK
  else if(getArgv[2] == 'complete') {
    for(var i = 0; i < getJSON.length; i++) {
      if(getJSON[i].ID == getArgv[3]) {
        getJSON[i].Status == "Complete";
        fs.writeFileSync('data.json', JSON.stringify(getJSON), 'utf-8')
      }
    }
  }

  // UNCOMPLETE Task
  else if(getArgv[2] == 'uncomplete') {
    for(var i = 0; i < getJSON.length; i++) {
      if(getJSON[i].ID == getArgv[3]) {
        getJSON[i].Status = "Uncomplete";
        fs.writeFileSync('data.json', JSON.stringify(getJSON), 'utf-8')
      }
    }
  }

  // TASK
  else if(getArgv[2] == 'task') {
    for(var i = 0; i < getJSON.length; i++) {
      if(getJSON[i].ID == getArgv[3]) {
        console.log(getJSON[i]);
        fs.writeFileSync('data.json', JSON.stringify(getJSON), 'utf-8')
      }
    }
  }
