// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  Notes Data (DATA)
/*  GET REQUEST */
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function(err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});


/*  POST REQUEST */
app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json',(err, data) => {
    // Check for error
    if (err) throw err;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv1()
    }
    // Add data to existing json array
    json.push(note);

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      // Check for error
      if (err) throw err;
      res.send('200');
    });
  });
});


/* DELETE REQUEST */
app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('db/db.json',(err, data) => {
    // Check for error
    if (err) throw err;
    let deleteId = req.params.id;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    json.forEach((item, i) =>{
      if (item.id.includes(deleteId)){ 
        json.splice(i, 1);       
      }
    });

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      // Check for error
      if (err) throw err;
      res.send('200');
    });
  });

})



// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, '/notes.html')));

// Displays all characters
app.get('/api/notes', (req, res) => res.json(notes));

// Displays a single character, or returns false
app.get('/api/notes/:notes', (req, res) => {
  const note = req.params.notes;

  console.log(note);

    /* Check each character routeName and see if the same as "chosen"
   If the statement is true, send the character back as JSON,
   otherwise tell the user no character was found */

   for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post('/api/noteTitle', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNoteTitle = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNoteTitle.routeName = newNoteTitle.name.replace(/\s+/g, '').toLowerCase();
    console.log(newNoteTitle);
  
    noteTitle.push(newNoteTitle);
    res.json(newNoteTitle);
  });

  
app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));
  