"use strict"

const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json','UTF-8'));

let argv = process.argv;
let node = "$ node todo.js"
if(argv[2] == undefined || argv[2] == "help"){
  console.log(`===============HELP===============`);
  console.log(`${node} add <task content>`);
  console.log(`${node} list`);
  console.log(`${node} help`);
  console.log(`${node} delete <task_id>`);
  console.log(`${node} complete <task_id>`);
  console.log(`${node} uncomplete <task_id`);
  console.log(`${node} task <task_id>`);
}
else if(argv[2] == "add"){
  let arrayTemp = [];
  for(var i = 3; i < argv.length; i++){
    arrayTemp.push(argv[i]);
  }
  let strings = arrayTemp.join(" ");
  data.push({"id" : data.length + 1,"task" : strings,"status" : "uncomplete"})
  fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
}
else if(argv[2] == "delete"){
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data.splice(i,i+1);
      fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
    }
  }
}
else if(argv[2] == "complete"){
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data[i].status = "complete";
      fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
    }
  }
}
else if(argv[2] == "uncomplete"){
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      data[i].status = "uncomplete";
      fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
    }
  }
}
else if(argv[2] == "task"){
  for(var i = 0; i < data.length; i++){
    if(data[i].id == argv[3]){
      console.log(data[i]);
      fs.writeFileSync('data.json', JSON.stringify(data), 'UTF-8')
    }
  }
}
else if(argv[2] == "list"){
  for(var i = 0; i < data.length; i++){
      if(data[i].status == "complete"){
        console.log(`${data[i].id}. [X] ${data[i].task}`)
      }else{
        console.log(`${data[i].id}. [ ] ${data[i].task}`)
      }
  }
}
