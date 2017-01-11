"use strict"
const fs= require('fs')
var skrip = 'data.json'
let data = JSON.parse(fs.readFileSync(skrip,'utf-8'))
let code = process.argv[2]
let code2 = process.argv.splice(3).join(' ')
var tampungan=[]

class Task{
  constructor(task){
    if(data.length-1>=0){
    this.id = data[data.length-1].id + 1
    }
    else{
      this.id = 1
    }
    this.task=task
    this.completed = false
    this.createdAt = new Date()
  }
}

if(code==='list'){
  for(var i=0;i<data.length;i++){
    if(data[i].completed===true){
      console.log(`${i+1}. [x] ${data[i].task}`)
    }
    else{
      console.log(`${i+1}. [ ] ${data[i].task}`)
    }
  }
}


else if(code==='help'){
  console.log(`$ node todo.js help`)
  console.log(`$ node todo.js list`)
  console.log(`$ node todo.js add <task_content>`)
  console.log(`$ node todo.js task <task_id>`)
  console.log(`$ node todo.js delete <task_id>`)
  console.log(`$ node todo.js complete <task_id>`)
  console.log(`$ node todo.js uncomplete <task_id>`)
}

else if(code==='add'){
  data.push(new Task(code2));
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else if(code==='delete'){
  data.splice(code2-1,1)
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else if(code==='task'){

    if(data[code2-1].completed===true){
      console.log(`${code2}. [x] ${data[code2-1].task}`)
    }
    else{
      console.log(`${code2}. [ ] ${data[code2-1].task}`)
    }

}

else if(code==='complete'){
  data[code2-1].completed=true;
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')

}

else if(code==='uncomplete'){
  data[code2-1].completed=false;
  fs.writeFileSync(skrip,JSON.stringify(data),'utf-8')
}

else {
  console.log(`$ node todo.js help`)
  console.log(`$ node todo.js list`)
  console.log(`$ node todo.js add <task_content>`)
  console.log(`$ node todo.js task <task_id>`)
  console.log(`$ node todo.js delete <task_id>`)
  console.log(`$ node todo.js complete <task_id>`)
  console.log(`$ node todo.js uncomplete <task_id>`)
}
