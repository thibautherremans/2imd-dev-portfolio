class Note {
    constructor(title) {
      this.title = title;
      this.element = this.createElement(title);
      // HINT🤩 this.element = this.createElement(title);
    }
  
    createElement() {
      let newNote = document.createElement("li");
      newNote.addEventListener('click', this.remove.bind(newNote));
      return newNote;
      
      // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
    }
  
    add(title) {
        let ul = document.getElementById("taskList");
        let textNode = document.createTextNode(title);


        ul.appendChild(this.element);
        this.element.appendChild(textNode);
      // HINT🤩
      // this function should append the note to the screen somehow
    }
  
    saveToStorage() {
        let notes = localStorage.getItem("notes");
        notes = JSON.parse(notes) || [];

        notes.push(this.title);
        localStorage.setItem("notes", JSON.stringify(notes));

      // HINT🤩
      // localStorage only supports strings, not arrays
      // if you want to store arrays, look at JSON.parse and JSON.stringify
    }
  
    remove() {
        document.getElementById("taskList").removeChild(this);

        const storage = window.localStorage;
        let notes = JSON.parse(storage.getItem("notes"));
        const index = notes.indexOf(this.innerHTML);

        notes.splice(index, 1);

        storage.setItem("notes", JSON.stringify(notes));


      // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
      // in this function, 'this' will refer to the current note element
      // .removeChild(this)
      // remove the item from screen and from localstorage
    }
  }
  
  class App {
    constructor() {
        console.log("👊🏼 The Constructor!");
        this.txtTodo = document.querySelector("#taskInput");
        this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
        this.loadNotesFromStorage();
      // HINT🤩
      // pressing the enter key in the text field triggers the createNote function
      // this.txtTodo = ???
      // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
      // read up on .bind() -> we need to pass the current meaning of this to the eventListener
      // when the app loads, we can show previously saved noted from localstorage
      // this.loadNotesFromStorage();
    }
  
    loadNotesFromStorage() {

        let note = localStorage.getItem("notes");
        note = JSON.parse(note) || [];

        if(note != null){
          console.log("ddd");
          for(let i = 0; i < note.length; i++) {

            let newNote = new Note(note[i]);
            newNote.add();
          }
        }
        
      // HINT🤩
      // load all notes from storage here and add them to the screen
    }
  
    createNote(e) {
        
        if(e.key === "Enter"){
            e.preventDefault();

            let note = new Note(this.txtTodo.value);
            note.add(note.title);
            note.saveToStorage();
            
            this.reset();
            

        }
        
      // this function should create a new note by using the Note() class
      // HINT🤩
      // note.add();
      // note.saveToStorage();
      // clear the text field with .reset in this class
      // if (e.key === "Enter")
    }
  
    reset() {
      // this function should reset the form / clear the text field
      this.txtTodo.value = "";
    }
  }
  
  let app = new App();
  