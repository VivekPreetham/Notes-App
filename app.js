// const { log } = require('console');
const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

function addNotes(title, content){
    let notes = [];
    if(fs.existsSync("notes.json")){
        notes = JSON.parse(fs.readFileSync("notes.json"))
    }
    notes.push({title, content});
    fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
    console.log(`note - "${title}" is added!`);
}

function viewNotes(){
    if(!fs.existsSync("notes.json")){
        console.log("No notes found!");
        return;
    }
    const notes = JSON.parse(fs.readFileSync("notes.json"));
    notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title} - ${note.content}`);
    });
}

function deleteNote(title) {
    if(!fs.existsSync("notes.json")){
        console.log("No nodes to delete");
        return;
    }
    const notes = JSON.parse(fs.readFileSync("notes.json"));
    const filterednotes = notes.filter(note => note.title !== title);
    fs.writeFileSync("notes.json", JSON.stringify(filterednotes, null, 2));
    console.log(`Note titled "${title}" deleted!`);
}

if(command == "add"){
    if(!title || !content){
        console.log("Usage: node app.js add <title> <content>");
    }
    else {
        addNotes(title, content);
    }
}
else if(command == "view") {
    viewNotes();
}
else if(command == "delete"){
    if(!title){
        console.log("Usage: node app.js delete <title>");
    }
    else{
        deleteNote(title);
    }
}
else{
    console.log("Unknown command, Use one of add | view | delete");   
}