const fs = require('fs');
const path = require('path');
const http = require('http');

const port = 3000;
const DATA_FILE = path.join(__dirname, "notes.json");

function readNotes() {
    if(!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function writeNotes(notes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
}

const server = http.createServer((req, res) => {
    if(req.method === "GET" && req.url === "/"){
        res.writeHead(200, {"content-type": "text/html"});
        res.end(fs.readFileSync(path.join(__dirname, "index.html")));
    }
    else if(req.method === "GET" && req.url === "/style.css"){
        res.writeHead(200, {"content-type": "text/css"});
        res.end(fs.readFileSync(path.join(__dirname, "style.css")));
    }
    else if(req.method === "GET" && req.url === "/notes"){
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({title, content}));
    }
    else if(req.method === "POST" && req.url === "/notes"){
        let body = "";
        req.on("data", chunk => {  body += chunk; });
        req.on("end", () => {
            const {title, content} = JSON.parse(body);
            const notes = readNotes();
            notes.push( { title, content});
            writeNotes(notes);
            res.writeHead(201, {"content-type": "application/json"});
            res.end(JSON.stringify(readNotes()));
        })
    }
    else if(req.method === "DELETE" && req.url.startsWith === "/notes/"){
        const title = decodeURIComponent(req.url.split("/")[2]);
        let notes = readNotes();
        notes = notes.filter(note => note.title !== title);
        writeNotes(notes);
        res.writeHead(200);
        res.end();
    }
    else{
        res.writeHead(404);
        res.end("Not found");
    }
});

server.listen(port, () => {console.log(`Server running at http://localhost:${port}`);});


