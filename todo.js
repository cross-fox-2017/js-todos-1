"use strict"

let fs = require("fs");

// Models
function readData() {
  return JSON.parse(fs.readFileSync("data.json", "utf8"));
}

function writeData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 3));
}

function sortId(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].id = i+1;
  }
  return data;
}

function add(task) {
  let data = readData();
  let object = {
    "id": 0,
    "task": task,
    "completed": false,
    "created_at": new Date()
  };
  data.push(object);
  data = sortId(data)
  writeData(data);
  console.log(`Added ${object.task} to your TODO list...`);
}

function deleting(id) {
  let data = readData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data.splice(i, 1);
      break;
    }
  }
  data = sortId(data)
  writeData(data);
  console.log(`Deleted data with id: ${id} from your TODO list...`);
}

function complete(id) {
  let data = readData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data[i].completed = true;
      break;
    }
  }
  writeData(data);
}

function uncomplete(id) {
  let data = readData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data[i].completed = false;
      break;
    }
  }
  writeData(data);
}

// View

function help() {
  let showArr = ["$ node todo.js # will call help", "$ node todo.js help",
  "$ node todo.js list", "$ node todo.js add <task_content>",
  "$ node todo.js task <task_id>", "$ node todo.js delete <task_id>",
  "$ node todo.js complete <task_id>", "$ node todo.js uncomplete <task_id>"];
  console.log(showArr.join("\n"));
}

function list(data) {
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      console.log(`${data[i].id}. [${data[i].completed ? "X" : " "}] ${data[i].task}`);
      // ? true : or
    }
  }
  else {
    console.log("Empty tasks");
  }
}

// Controller

function run(param) {
  switch (param[0]) {
    case "help":
      help();
      break;
    case "list":
      list(readData());
      break;
    case "add":
      param.shift();
      add(param.join(" "));
      break;
    case "delete":
      deleting(param[1]);
      break;
    case "complete":
      complete(param[1]);
      break;
    case "uncomplete":
      uncomplete(param[1]);
      break;
    default:
      console.log("Please input correct command.");
      break;
  }
}

// Driver code
let arg = process.argv.slice(2, process.argv.length);
run(arg);
