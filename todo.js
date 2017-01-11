const fs = require('fs')
const jsonfile = require('jsonfile')
const file = 'data.json'

let input = process.argv.slice(2, process.argv.length)

switch (input[0]) {
  case 'list':
    listData()
    break;

  case 'add':
    addData()
    break;

  case 'task':
    taskData()
    break;

  case 'delete':
    let delData = jsonfile.readFileSync(file)
    deleteData(delData, input)
    jsonfile.writeFileSync(file, delData)
    break;

  case 'complete':
    completeData()
    break;

  case 'uncomplete':
    unCompleteData()
    break;
  default:
      console.log('$node todo.js list');
      console.log('$node todo.js add <task_content>');
      console.log('$node todo.js task <task_id>');
      console.log('$node todo.js delete <task_id>');
      console.log('$node todo.js complete <task_id>');
      console.log('$node todo.js uncomplete <taks_id>');
      console.log('$ node todo.js list:outstanding asc|desc');
      console.log('$ node todo.js list:completed asc|desc');
      console.log('$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N');
      console.log('$ node todo.js filter:<tag_name>');
}
// process.argv.forEach((input) => {
//   if (input == 'help') {
//     console.log('$node todo.js list');
//     console.log('$node todo.js add <task_content>');
//     console.log('$node todo.js task <task_id>');
//     console.log('$node todo.js delete <task_id>');
//     console.log('$node todo.js complete <task_id>');
//     console.log('$node todo.js uncomplete <taks_id>');
//   }else if (input == 'list') {
//     console.log(db);
//   }else if (input == 'add') {
//     db.push(process.argv[3])
//     // let addResult = addData(input)
//     jsonfile.writeFileSync(file)
//     console.log(db);
//   }
// })
//
function listData() {
  let db = jsonfile.readFileSync(file)
  // var temp = JSON.parse(db)
  // console.log(db.length);
  for (var i = 0; i < db.length; i++) {
     console.log(`${db[i].id}. ${db[i].complete} ${db[i].task}`);
  }
  // console.log(JSON.parse(db[i]));
}

function addData() {
  let db = jsonfile.readFileSync(file)
  var temp = ''
  for (var i = 3; i < process.argv.length; i++) {
    temp += process.argv[i] + ' '
  }
  var newData = {
    id: db.length+1,
    task: temp,
    complete: "[ ]"
  }
  db.push(newData)
  jsonfile.writeFileSync(file, db)
}

function taskData(id) {
  idx = process.argv[2]
  id = process.argv[3]
  let db = jsonfile.readFileSync(file)
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'task') {
      console.log(db[i]);
    }
  }
}

function completeData(id) {
  idx = process.argv[2]
  id = process.argv[3]
  let db = jsonfile.readFileSync(file)
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'complete') {
      console.log(`Task ${db[i].task} complete`);
      db[i].complete = "[X]"
    }
  }
  jsonfile.writeFileSync(file, db)
}

function unCompleteData(id) {
  idx = process.argv[2]
  id = process.argv[3]
  let db = jsonfile.readFileSync(file)
  for (var i = 0; i < db.length; i++) {
    if (db[i].id == id && idx == 'uncomplete') {
      console.log(`Task ${db[i].task} complete`);
      db[i].complete = "[ ]"
    }
  }
  jsonfile.writeFileSync(file, db)
}

function deleteData(arr, index) {
  return arr.splice(index, 1)
}
