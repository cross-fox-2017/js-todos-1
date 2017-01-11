'use strict'

const fs = require('fs');

let data = JSON.parse(fs.readFileSync('data.json','utf-8'))
let argv = process.argv
let help = '$ node todo.js'
// console.log(argv);

if (argv[2] == undefined || argv[2] == 'help') {
  console.log(`${help} help`);
  console.log(`${help} list`);
  console.log(`${help} add <task_content>`);
  console.log(`${help} task <task_id>`);
  console.log(`${help} delete <task_id>`);
  console.log(`${help} complete <task_id>`);
  console.log(`${help} uncomplete <task_id>`);
}

if(argv[2] == 'list') {
  // console.log(data.length)
  for (var i = 0; i < data.length;i++) {
    // console.log('list semua')
    if (data[i].completed == true) {
      console.log(`[X] ${i+1} ${data[i].task}`)
    } else {
      console.log(`[ ] ${i+1} ${data[i].task}`)
    }
  }
}

if(argv[2] == 'add') {
  var input = argv.splice(3).join(' ')
  console.log(input);
  data.push({
    id: data.length+1,
    task: input,
    completed: false
  })
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
  console.log(data);
}

if (argv[2] == 'task') {
  if (data[argv[3]-1].completed == true) {
    console.log(`[X] ${data[argv[3]-1].id}. ${data[argv[3]-1].task}`);
  } else {
    console.log(`[ ] ${data[argv[3]-1].id}. ${data[argv[3]-1].task}`);
  }
}

if (argv[2] == 'delete') {
  data.splice(argv[3]-1,1)
  for(var i= 0; i < data.length; i++) {
    data[i].id == i+1
  }
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
}

if (argv[2] == 'complete'){
  data[argv[3]-1].completed = true
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
}

if (argv[2] == 'uncomplete'){
  data[argv[3]-1].completed = false
  fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8')
}
