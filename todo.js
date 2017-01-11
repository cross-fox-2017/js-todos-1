const fs = require('fs')
let argv = process.argv;
let id = 1
switch (argv[2]) {
  case 'list':
  let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
  for(let i = 0; i < data.length; i++){
    console.log(`${data[i].id} ${data[i].todo}`)
  }
  break;

  case 'add':
  let str = '';
  for(let i = 3; i < argv.length; i++) {
    str += argv[i] + ' '
  }
  let todo = [];
  todo.push({id: id, todo: `[ ] ${str}`, date: new Date()});

  let file = fs.readFileSync('data.json', 'utf-8');
  todo = JSON.parse(file);

  id = todo.length + 1
  todo.push({id: id, todo: `[ ] ${str}`, date: new Date()})
  var json = JSON.stringify(todo);
  fs.writeFile('data.json', json);
  break;

  case 'task':
  let taskID = argv[3] - 1;
  let taskFile = fs.readFileSync('data.json', 'utf-8');
  let taskTodo = JSON.parse(taskFile);
  console.log(`${taskTodo[taskID].id} ${taskTodo[taskID].todo}`)

  break;

  case 'delete':
  let deleteID = argv[3];
  let deleteFile = fs.readFileSync('data.json', 'utf-8');

  let deleteTodo = JSON.parse(deleteFile);
  deleteTodo.splice(deleteID-1,1);

  let deleteJSON = JSON.stringify(deleteTodo);
  fs.writeFile('data.json', deleteJSON);

  break;

  case 'complete':
  let completeID = argv[3] - 1;
  let completeFile = fs.readFileSync('data.json', 'utf-8');

  let completeTodo = JSON.parse(completeFile);
  let changeComplete = completeTodo[completeID].todo.slice(3,20);

  completeTodo[completeID].todo = `[x]${changeComplete}`

  let completeJSON = JSON.stringify(completeTodo);
  fs.writeFile('data.json', completeJSON);
  break;

  case 'uncomplete':
  let uncompleteID = argv[3] - 1;
  let uncompleteFile = fs.readFileSync('data.json', 'utf-8');

  let uncompleteTodo = JSON.parse(uncompleteFile);
  let changeUncomplete = uncompleteTodo[uncompleteID].todo.slice(3,20);

  uncompleteTodo[uncompleteID].todo = `[ ]${changeUncomplete}`

  let uncompleteJSON = JSON.stringify(uncompleteTodo);
  fs.writeFile('data.json', uncompleteJSON);
  break;

  default:
  console.log('node todo.js list\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <task_id>')
  break;
}
