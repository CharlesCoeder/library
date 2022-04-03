let myLibrary = [];
const bookshelf = document.querySelector('.bookshelf');

// Book object constructor
function Book(title, author, pages, finished){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
}

// Prints information of book
Book.prototype.info = function info() {
    let read = ""
    if (this.finished == false){
     read = "not yet read";
    }
    else {
     read = "already read";
    }
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
}

// Creates new book object from form inputs
function createBook(form){
    let finished;
    if (form.finished.checked){
        finished = true;
    }
    else {
        finished = false;
    }

    const temp = new Book(form.title.value, form.author.value, form.pages.value, finished);
    return temp;
}

// Displays book object as HTML
function displayBook(book){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    
    const bookTitle = document.createElement('div');
    bookTitle.classList.add('title');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('div');
    bookPages.classList.add('pages');
    bookPages.textContent = book.pages;

    const bookFinished = document.createElement('div');
    bookFinished.classList.add('finished');
    bookFinished.textContent = book.finished;

    bookRemove = 

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookFinished);
    bookshelf.appendChild(bookDiv);

}

// Function that creates a new book object, adds it to myLibrary array, and displays it as HTML
function addBookToLibrary(form){
    const newBook = createBook(form);
    myLibrary.push(newBook);
    displayBook(newBook);
}

// Functions for buttons that show/hide the form
const addBookForm = document.querySelector('.addBookForm');
const darken = document.querySelector('.darken');
function showForm(){
    addBookForm.setAttribute('style', 'display:flex');
    darken.setAttribute('style', 'display: block');

}
function hideForm(){
    addBookForm.setAttribute('style', 'display:none');
    darken.setAttribute('style', 'display: none');
}

document.addEventListener('mouseup', function(e){
    if (!addBookForm.contains(e.target)){
        hideForm();
    }
})

// Temporary hard-coded Books
let x = new Book("hobbit", "tolkien", 400, false);
x.info();
let y = new Book("the last wish", "andrej sapkowski", 300, true);
let z = new Book("arthur", "some guy", 50, false);
myLibrary.push(x, y, z);
for (const book of myLibrary){
    displayBook(book);
}




// TO DO
//
// Form validation
// Add buttons to the books to toggle if finished and to remove book