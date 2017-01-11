const fs = require('fs'); // untuk kebutuhan READ / WRITE file

//untuk kebutuhan mendapatkan nilai MAX dalam array
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

var input = process.argv

switch (input[2]) {

  case "add":

  let arr = []

  for(let i = 3; i < input.length; i++)
  {
    arr.push(input[i]);
  }

  value = arr.join(" ");

  addList(value)
  console.log("TASK : "+input[3]+" ADDED !");

  break;


  case "list":  showList()
  break;

  case "task":

  let id_task = input[3]

  Task(id_task)

  break;

  case "delete":

    let id_del = input[3]
    Dlete(id_del)

  break;

  case "complete":

    let id_com = input[3]

    Complete(id_com)

  break;

  case "uncomplete":

    let id_un = input[3]

    unComplete(id_un)
  break;

  default:
    Help()

}


// fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf8');

function Help(){
    let arr = ['help', 'list', 'add <task_content>', 'task <task_id>', 'delete <task_id>', 'complete <task_id>', 'uncomplete <task_id>']


    for(let i = 0; i < arr.length; i++){
      console.log("node todo.js "+arr[i]);
    }

}

function showList(){

    let data = connect();

    console.log("CURRENT TASK !");
    for(let i = 0; i < data.length; i++){

        console.log((i+1)+". "+data[i].Complete+" "+data[i].Task);
    }

}

function addList(value){

  let json = connect();
  let id = getincrement() + 1;

  json.push({

          "id" : id,
          "Task" : value,
          "Complete" : "[ ]"
  })

 fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')

}

function Task(id){

  let json = connect();

  for(let i = 0; i < json.length; i++)
  {
      if(json[i].id == id)
      {
        console.log("TASK : "+json[i].Task);
      }
  }



}

function Dlete(id){

  let json = connect()

  for(let i = 0; i < json.length; i++){

        if(json[i].id == id){

            let key = json.indexOf(json[i]);

            console.log("TASK : "+json[i].Task+" [DELETED]");
            json.splice(key,1)

        }
  }

    fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')

}

function Complete(id){

    let json = connect()

    for(let i = 0; i < json.length; i++){

          if(json[i].id == id){

            console.log("TASK : "+json[i].Task+" [COMPLETED]");

              json[i].Complete = "[X]"
          }
    }

      fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')
}

function unComplete(id){

  let json = connect()

  for(let i = 0; i < json.length; i++){

        if(json[i].id == id){

            console.log("TASK : "+json[i].Task+" [UNCOMPLETED]");
            json[i].Complete = "[ ]"
        }
  }
    fs.writeFileSync('data.json',JSON.stringify(json,null,3),'utf-8')
}


function getincrement(){

  let json = connect();
  let penampungID = [];
  for(let i = 0; i < json.length;i++)
  {
    penampungID.push(json[i].id)
  }
  return penampungID.max();
}

function connect(){

  let data = fs.readFileSync('data.json', 'utf-8')
  let json = JSON.parse(data);

  return json
}
