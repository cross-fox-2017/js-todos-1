"use strict"

var jsonfile = require ('jsonfile')
var file = 'data.json'



class ListToDo {
  constructor(){
    this.listArr = jsonfile.readFileSync(file)
  }

  help(){
    return `\nnode todo.js # will call help\nnode todo.js help\nnode todo.js add <task_content>\nnode todo.js task <task_id>\nnode todo.js delete <task_id>\nnode todo.js complete <task_id>\nnode todo.js uncomplete <taskid>\n`

  }

  writeDataSync(){
    jsonfile.writeFileSync("data.json",this.listArr)
  }

  list(){
    console.log("List yang harus dilakukan")
    let temp = ''
    for(var i=0; i<this.listArr.length; i++){
      if(!this.listArr[i].completed){
        temp = temp + `[ ] ${this.listArr[i].task}\n`
      }
      else{
        temp = temp + `[X] ${this.listArr[i].task}\n`
      }
    }
    return temp
  }

  add(onelists){
    this.listArr.push({id: this.listArr.length+1, task : `${onelists}`, completed : false})
    this.writeDataSync()
    return `data has been sucsessfully added`
  }

  delete(id){

    for(var i=0; i<this.listArr.length ;i++){
      if(this.listArr[i].id == id){
        var index = i
        this.listArr.splice(i, 1)
      }
    }

    for(var i=index;i<this.listArr.length; i++){
      this.listArr[i].id--
    }

    this.writeDataSync()

    return `Data hasbeen sucsessfully removed...`
  }

  task(id){
    let temp = `list you are looking for: ${this.listArr[id].task}, complete : ${this.listArr[id].completed}`

    return temp
  }

  complete(id){
    this.listArr[id-1].completed = true
    this.writeDataSync()
  }

  uncomplete(id){
    this.listArr[id-1].completed = false
    this.writeDataSync()
  }

}

var myList = new ListToDo()
var input = process.argv[2]

    if(input == "list"){
      console.log(myList.list())
    }
    else if(input == "help"){
      console.log(myList.help())
    }
    else if(input == "add"){
      var listString = process.argv[3]
      console.log(myList.add(listString))
    }
    else if(input == "task"){
      var idTask = process.argv[3]
      console.log(myList.task(idTask))
    }
    else if(input == "delete"){
      var idTask = process.argv[3]
      console.log(myList.delete(idTask))
    }
    else if(input == "complete"){
      var idTask = process.argv[3]
      console.log(myList.delete(idTask))
    }
    else if(input == "uncomplete"){
      var idTask = process.argv[3]
      console.log(myList.delete(idTask))

    }
    else{
      console.log(`\nCommand is not found see help...\n ${myList.help()}`)
    }
