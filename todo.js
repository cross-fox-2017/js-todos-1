"use strict"
const fs     = require('fs');//inisialisasi untuk fs(file system)
var formFile = fs.readFileSync('data.json','utf-8');//membuka file data.json dan mengconvert kedalam bentuk string
var listData = JSON.parse(formFile);// JSON.parse adalah mengconvert yang berbentuk string kedalam bentuk object

class TodoList {
  constructor(valInput) {
    this.listData = valInput;
  }

//untuk menampilkan data yang ada di file data.json
  list(){
    let list = [];
    for (let i = 0; i < this.listData.length; i++){
      list.push(this.listData[i])
    }
    return list;
  }

  //write to File data.json
  writeToFile (){
    fs.writeFileSync("data.json",JSON.stringify(this.listData),"utf-8")
  }

// untuk mengisi data ke file data.json
  inputToList(value){
    this.listData.push({"id":this.listData.length + 1, "task" : value, "status": false})
    console.log(value)
    console.log(this.listData);
  }

//untuk mengolah data yang di inputkan
  controller(){
    let listMenu = ["# will call help","node todo.js help","node todo.js list",
                    "node todo.js add <task_content>","node todo.js task <task_id>",
                    "node todo.js delete <task_id>", "node todo.js complete <task_id>",
                    "node todo.js uncomplete <task_id>"];
    let argv     = process.argv

    if(argv[2] == undefined || argv[2] == "help"){
      for (let i = 0; i < listMenu.length; i++) {
        console.log(listMenu[i]);
      }
    }

    if(argv[2] == "list"){
      for (var i = 0; i < listData.length; i++) {
        if(listData[i]['status'] == false){
          console.log(`${this.listData[i]['id']}. [ ] ${this.listData[i]['task']}`);
        }else {
          console.log(`${this.listData[i]['id']}. [x] ${this.listData[i]['task']}`);
        }
      }
    }

    if(argv[2] == "add"){
      if(argv[3] == undefined){
        console.log('write something!');
      }
      else {
        this.inputToList(argv.splice(3, argv.length).join(' '));
        this.writeToFile();
      }
    }

    if(argv[2] == "task"){
      if(argv[3] == undefined || argv[3] > this.listData.length){
        console.log(`id not defined!! \n tak saat ini : ${this.listData.length}`);
      }
      else {
      console.log(`task ${argv[3]} : ${this.listData[argv[3]-1]['task']}`)
      }
    }

    if(argv[2] == "delete"){
      if(argv[3] == undefined || argv[3] > this.listData.length){
        console.log(`id not defined!! \n tak saat ini : ${this.listData.length}`);
      }
      else {
      console.log(`task ${this.listData[argv[3]-1]['task']} deleted`)
      this.listData.splice(argv[3]-1,1)

      for (let i = 0; i < this.listData.length; i++) {
        this.listData[i]['id'] += 1;
      }
    }
    this.writeToFile()
  }

    if(argv[2] == "complete"){
      if(argv[3] == undefined || argv[3] > this.listData.length){
        console.log(`id not defined!! \n tak saat ini : ${this.listData.length}`);
      }
      else {
        this.listData[argv[3]-1]['status'] = true
        console.log(`task ${this.listData[argv[3]-1]['task']} is completed!!`)
      }
      this.writeToFile();
    }

    if(argv[2] == "uncomplete"){
      if(argv[3] == undefined || argv[3] > this.listData.length){
        console.log(`id not defined!! \n tak saat ini : ${this.listData.length}`);
      }
      else {
        this.listData[argv[3]-1]['status'] = false
        console.log(`task ${this.listData[argv[3]-1]['task']} is uncomplete !!`)
      }
      this.writeToFile()
    }
  }
}

let result = new TodoList(listData);
    result.controller()
