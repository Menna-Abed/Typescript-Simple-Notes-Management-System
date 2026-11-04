// 1. Base Class – User
class User {
    constructor(
        public id: number,
        public name: string,
        public email: string,
        protected password: string,
        public phone: string,
        public age: number,
        public notebooks: NoteBook[] = []
    ) {

        if (age < 18 || age > 60) {
            throw new Error("Validation Error: Age must be between 18 and 60.");
        }
    }

    public displayInfo(): void {
        console.log(`User Info -> ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this.age}`);
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
}

// 2. Inheritance – Admin User
class Admin extends User {
    // Method that allows the admin to manage notes
    public manageNotes(): void {
        console.log(`Admin [${this.name}] is successfully managing system notes.`);
    }
}

// 3. Class - Note
class Note {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public userId: number
    ) {}

    public preview(): string {
        return this.content.length > 30
            ? this.content.substring(0, 30) + "..."
            : this.content;
    }
}

// 4. Composition – NoteBook and Notes
class NoteBook {
    private notes: Note[] = [];

    constructor(public id: number, public title: string) {}

    public addNote(id: number, title: string, content: string, userId: number): void {
        const newNote = new Note(id, title, content, userId);
        this.notes.push(newNote);
    }

    public removeNote(noteId: number): void {
        this.notes = this.notes.filter(note => note.id !== noteId);
    }

    public getAllNotes(): Note[] {
        return this.notes;
    }
}

// 7. Generics – Data Storage
class StorageBox<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): void {
        const index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    public getAllItems(): T[] {
        return this.items;
    }
}

// For Example  
try {
    //===> Creating a User
    const user1 = new User(1, "Ahmed Hassan", "ahmed@mail.com", "secretPass123", "01012345678", 25);
    user1.displayInfo();

    //===> Creating a NoteBook
    const myNotebook = new NoteBook(101, "University Lectures");

    //===> Aggregation: Assigning notebook to user
    user1.addNotebook(myNotebook);

    //===> Composition: Adding notes inside the notebook
    myNotebook.addNote(1, "TypeScript", "TypeScript is a strongly typed programming language...", user1.id);
    myNotebook.addNote(2, "OOP Concepts", "Object-oriented programming includes inheritance, polymorphism...", user1.id);

    //===> Testing Note preview
    const notesList = myNotebook.getAllNotes();
    console.log("Note Preview:", notesList[0].preview());

    //===> Admin testing (Inheritance)
    const adminUser = new Admin(2, "Super Admin", "admin@mail.com", "adminPass99", "01198765432", 35);
    adminUser.manageNotes();

    //===> Generics Storage testing
    const stringStorage = new StorageBox<string>();
    stringStorage.addItem("Item A");
    stringStorage.addItem("Item B");
    console.log("Storage Items:", stringStorage.getAllItems());

} catch (error: any) {
    console.error(error.message);
}