let myLibrary = [];
const bookshelf = document.querySelector('.bookshelf');

class Book {
    constructor(title, author, pages, finished){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.finished = finished;
    }

    getFinished() {
        let temp = "";
        if (this.finished == true){
            temp = "Finished!";
        }
        else {
            temp = "Not yet finished...";
        }
        return temp;
    }
}

// Creates new Book object from form inputs
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

function removeBook(index){
    const books = document.querySelectorAll('.book');

    // Update index data attributes
    const bookArray = Array.from(books).filter(bk => bk.dataset.index > index);
    for (const book of bookArray){
        book.dataset.index -= 1;
    }

    // Remove book's elements from DOM
    const removedBook = document.querySelector('[data-index=' + CSS.escape(index) + "]");
    removedBook.remove();

    // Remove Book object from myLibrary array
    myLibrary.splice(index, 1);

}

// Displays Book object as HTML
function displayBook(book){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.dataset.index = myLibrary.length - 1;
    
    const bookTitle = document.createElement('div');
    bookTitle.classList.add('title');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('div');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement('div');
    bookPages.classList.add('pages');
    bookPages.textContent = book.pages;

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const bookFinished = document.createElement('div');
    bookFinished.classList.add('finished');
    bookFinished.textContent = book.finished;

    const finishedToggleBtn = document.createElement('button');
    finishedToggleBtn.classList.add('finishedToggle');
    if (!(book.getFinished() == "Finished!")){
        finishedToggleBtn.classList.add('grey');
    }
    finishedToggleBtn.textContent = book.getFinished();
    finishedToggleBtn.addEventListener('click', () => {
        if (book.finished == true){
            book.finished = false;
        }   
        else {
            book.finished = true;
        }

        const temp = book.getFinished();
        finishedToggleBtn.textContent = temp;

        if (temp == "Finished!"){
            finishedToggleBtn.classList.remove('grey');
        }
        else {
            finishedToggleBtn.classList.add('grey');
        }
    });

    buttons.appendChild(finishedToggleBtn);

    const bookRemoveBtn = document.createElement('button');
    bookRemoveBtn.classList.add('remove');
    bookRemoveBtn.textContent = "X";
    bookRemoveBtn.onclick = function(){removeBook(bookDiv.dataset.index); }
    buttons.appendChild(bookRemoveBtn);

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(buttons);
    
    bookshelf.appendChild(bookDiv);
}


// Function that creates a new Book object, adds it to myLibrary array, and displays it as HTML
function addBookToLibrary(form){
    const newBook = createBook(form);
    myLibrary.push(newBook);
    displayBook(newBook);
    clearForm();
    hideForm();
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

function clearForm(){
    const inputs = addBookForm.querySelectorAll('.clear');
    inputs.forEach((input) => {
        input.value = "";

    const finishedFormButton = document.getElementById('finished');
    finishedFormButton.checked = false;
    })
}

document.addEventListener('mouseup', function(e){
    if (!addBookForm.contains(e.target)){
        hideForm();
    }
})

// Temporary hard-coded Books
let x = new Book("hobbit", "tolkien", 400, true);
let y = new Book("the last wish", "andrzej sapkowski", 300, true);
let z = new Book("arthur", "some guy", 50, false);

const arry = [x,y,z];
for (const book of arry){
    myLibrary.push(book);
    displayBook(book);
}

// TO DO
//
// Form validation