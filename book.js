const bookAdder = document.querySelector('#book-adder');
const table = document.querySelector('table');
const tableBody = document.querySelector('tbody');
const bookTracker = document.querySelector('.book-tracker')

const formContainer = document.querySelector('.form-container');
const form = document.querySelector('form');
const formExit = document.querySelector('form button#exit');
const formSubmit = document.querySelector('form button[type="submit"]');

// function Book(title, author, pages, read) {
//     this.title = title; 
//     this.author = author;
//     this.pages = pages; 
//     this.read = read; 
// }

// Book.prototype.info = function(){
//     return [this.title, this.author, this.pages, this.read]; 
// }

class Book {
    title; 
    author; 
    pages;
    read;
    
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info(){
        return [this.title, this.author, this.pages, this.read]; 
    }
}

const books = [];


bookAdder.addEventListener('click', toggleFormContainer);

formExit.addEventListener('click', toggleFormContainer)

formSubmit.addEventListener('click', 
    (function displayTable(){
        if (!form.checkValidity()){
            return;
        }
        table.style.display = 'table';
        formSubmit.removeEventListener('click', displayTable); 
    })
);

formSubmit.addEventListener('click', (event) => {
    if (!form.checkValidity()){
        return;
    }
    const authorInput = document.querySelector('#author');
    const titleInput = document.querySelector('#title');
    const pagesInput = document.querySelector('#pages');
    const readInput = document.querySelector('#read');

    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    books.push(newBook);

    resetTableRows(); 
    updateBookTracker();
    
    event.preventDefault(); 
    form.reset(); 
    toggleFormContainer();
})

function addRowEntry(book, index){
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-index', index);
    for (thing of book.info()){
        const newData = document.createElement('td');
        const dataText = document.createElement('span');
        newData.append(dataText);
        dataText.textContent = thing;
        newRow.appendChild(newData);
    }
    
    const firstRowChild = newRow.querySelector('td');
    const removalButton = document.createElement('button');
    removalButton.setAttribute('type', 'button');
    removalButton.classList.add('remove');
    removalButton.textContent = '-';
    removalButton.addEventListener('click', ()=>{
        const thisRowInd = newRow.dataset.index;
        books.splice(thisRowInd, 1);
        resetTableRows(); 
        updateBookTracker();
    });
    firstRowChild.prepend(removalButton);
    //for making remove button disappear and reappear
    newRow.addEventListener('mouseover', () => removalButton.style.display = 'grid');
    newRow.addEventListener('mouseleave', () => removalButton.style.display = 'none');
    //...

    const lastRowChild = newRow.querySelector('td:last-of-type');
    const readCheck = document.createElement('input');
    readCheck.setAttribute('type', 'checkbox');
    readCheck.classList.add('read-check');
    readCheck.checked = book.read; 
    readCheck.addEventListener('click', ()=>{
        book.read = readCheck.checked;
        lastRowChild.querySelector('span').textContent = book.read;
    });
    lastRowChild.append(readCheck);
    //for making read check disappear and reappear
    lastRowChild.addEventListener('mouseover', () => readCheck.style.opacity = 1);
    lastRowChild.addEventListener('mouseleave', () => readCheck.style.opacity = 0);
    //...

    
    tableBody.appendChild(newRow); 
}

function toggleFormContainer(){
    formContainer.style.display = (formContainer.style.display != 'flex') ? 'flex' : 'none';
}

function resetTableRows(){
    tableBody.textContent = ''; //Clears table body
    for (let i = 0; i < books.length; i++){
        const currBook = books[i];
        addRowEntry(currBook, i);
    } 
}

function updateBookTracker(){
    bookTracker.textContent = books.length; 
}