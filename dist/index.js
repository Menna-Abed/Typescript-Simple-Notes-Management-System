"use strict";
class User {
    constructor(id, name, email, password, phone, age, notebooks = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.notebooks = notebooks;
        if (age < 18 || age > 60) {
            throw new Error("Validation Error: Age must be between 18 and 60.");
        }
    }
    displayInfo() {
        console.log(`User Info -> ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
}
class Admin extends User {
    manageNotes() {
        console.log(`Admin [${this.name}] is successfully managing system notes.`);
    }
}
class Note {
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        return this.content.length > 30
            ? this.content.substring(0, 30) + "..."
            : this.content;
    }
}
class NoteBook {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.notes = [];
    }
    addNote(id, title, content, userId) {
        const newNote = new Note(id, title, content, userId);
        this.notes.push(newNote);
    }
    removeNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }
    getAllNotes() {
        return this.notes;
    }
}
class StorageBox {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }
    getAllItems() {
        return this.items;
    }
}
try {
    const user1 = new User(1, "Ahmed Hassan", "ahmed@mail.com", "secretPass123", "01012345678", 25);
    user1.displayInfo();
    const myNotebook = new NoteBook(101, "University Lectures");
    user1.addNotebook(myNotebook);
    myNotebook.addNote(1, "TypeScript", "TypeScript is a strongly typed programming language...", user1.id);
    myNotebook.addNote(2, "OOP Concepts", "Object-oriented programming includes inheritance, polymorphism...", user1.id);
    const notesList = myNotebook.getAllNotes();
    console.log("Note Preview:", notesList[0].preview());
    const adminUser = new Admin(2, "Super Admin", "admin@mail.com", "adminPass99", "01198765432", 35);
    adminUser.manageNotes();
    const stringStorage = new StorageBox();
    stringStorage.addItem("Item A");
    stringStorage.addItem("Item B");
    console.log("Storage Items:", stringStorage.getAllItems());
}
catch (error) {
    console.error(error.message);
}
