var jsonfile = require('jsonfile')
var file = 'data.json'

var database = jsonfile.readFileSync(file)

process.argv.forEach((pilihan) => {
    if (pilihan == "list") {
        console.log(database);
    } else if (pilihan == "help") {
        console.log(`\n node todo.js list \n node todo.js add <task_content> \n node todo.js task <task_id> \n node todo.js delete <task_id> \n node todo.js complete <task_id> \n node todo.js uncomplete <task_id>`);
    } else if (pilihan == "add") {
        var tmp = ''
        for (var i = 3; i < process.argv.length; i++) {
            tmp += process.argv[i] + " "
        }
        var tambah = {
            id: database[database.length - 1].id + 1,
            task: tmp,
            status: "[ ]"
        }
        database.push(tambah)
        jsonfile.writeFileSync(file, database)
        console.log(`Add "${tmp}" ke Todo List`);
        console.log(database);
    } else if (pilihan == "task") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if(index == database[i].id){
              console.log(database[i]);
            }
        }
    } else if (pilihan == "delete") {
        var index = process.argv[3]
        for (var i = 0; i < database.length; i++) {
            if(index == database[i].id){
              console.log("Hapus Data");
              console.log(database[i]);
              database.splice([i], 1)
            }
        }
        console.log(database);
        jsonfile.writeFileSync(file, database)
    } else if (pilihan == "complete") {
        var index = process.argv[3]
        for(var i = 0 ; i < database.length ; i++){
          if(index == database[i].id){
            database[i].status = "[X]"
            console.log(database);
            jsonfile.writeFileSync(file, database)
            break;
          }
        }
    } else if (pilihan == "uncomplete") {
        var index = process.argv[3]
        for(var i = 0 ; i < database.length ; i++){
          if(index == database[i].id){
            database[i].status = "[ ]"
            console.log(database);
            jsonfile.writeFileSync(file, database)
            break;
          }
        }
    }
})
