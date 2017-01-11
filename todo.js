'use strict'

const fs = require('fs');

let getJSON = JSON.parse(fs.readFileSync('data.json', 'UTF-8'));

function setArray(array){
  fs.writeFileSync('data.json', JSON.stringify(array), 'UTF-8')
}

let getArgv = process.argv;
let getNode = "$ node todo.js" // Untuk membaca dokumentasi penggunaan dari fungsi node

switch (getArgv[2]) {
  case null || 'help' :
    console.log(`===================== HELP =====================`);
    console.log(`${getNode} add <task content>`);
    console.log(`${getNode} show list`);
    console.log(`${getNode} task <task_id>`);
    console.log(`${getNode} delete <task_id>`);
    console.log(`${getNode} complete <task_id>`);
    console.log(`${getNode} uncomplete <task_id>`);
    break;

  case 'list' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].status == "Complete"){
      console.log(`${getJSON[i].ID}.[x] ${getJSON[i].Task}`)
    } else {
      console.log(`${getJSON[i].ID}.[] ${getJSON[i].Task}`)
    }
  }
  break;

  // Menambahkan nilai berupa object yang di push ke getJSON
  case 'add' :
  let valStr = getArgv.splice(3).join(" ")
  getJSON.push({"ID"     : getJSON.length + 1,
                "Task"   : valStr,
                "Status" : "Uncomplete"});
  setArray(getJSON);
  break;

  // Menghapus nilai berupa object dari getJSON
  case 'delete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON.splice(i,i+2);
      setArray(getJSON);
    }
  }
  break;

  case 'uncomplete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON[i].Status = "Uncomplete";
      setArray(getJSON);
    }
  }
  break;

  case 'complete' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      getJSON[i].Status = "Complete";
      setArray(getJSON);
    }
  }
  break;

  case 'task' :
  for(var i = 0; i < getJSON.length; i++){
    if(getJSON[i].ID == getArgv[3]){
      console.log(getJSON[i]);
    }
  }
  break;
}
