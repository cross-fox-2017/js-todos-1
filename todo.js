fs = require('fs');
// fs.writeFile('data.json', 'Hello World!', function (err) {
//   if (err) return console.log(err);
// });
let data = JSON.parse(fs.readFileSync('data.json','utf8'));
let arg = process.argv
let help = ['node todo.js','node todo.js help','node todo.js list','node todo.js add <task_content>',
'node todo.js task <task_id>','node todo.js delete <task_id>','node todo.js complete <task_id>',
'node todo.js uncomplete <task_id>']
help = help.join('\n')

switch (arg[2]) {

  case 'help':
  console.log('=========Menu Help=========');

  case 'list':
  console.log('=========Menu List=========');
  for (let i=0; i<data.length; i++){
    if (data[i].complete == true) {
      console.log(`${data[i].id}. [x] ${data[i].task}`);
    }
    else {
      console.log(`${data[i].id}. [ ] ${data[i].task}`);
    }
  }
  break;

  case 'add':
  let kata = arg.splice(3,arg.length-3)
  data.push({ "id": data.length+1,"task":kata.join(' '),"complete":false})
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'task':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      if (data[i].complete == true) {
        console.log(`${data[i].id}. [x] ${data[i].task}`);
      }
      else {
        console.log(`${data[i].id}. [ ] ${data[i].task}`);
      }
    }
  }
  break;

  case 'delete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data.splice(i,1);
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'complete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data[i].complete = true;
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  case 'uncomplete':
  for(let i=0; i<arg.length; i++) {
    if(arg[3]==[i+1]){
      data[i].complete = false;
    }
  }
  fs.writeFileSync('data.json', JSON.stringify(data) , 'utf-8');
  break;

  default:
  console.log(help);
  break;
}
