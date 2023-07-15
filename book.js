const bookAdder = document.querySelector('#book-adder');
const tableBody = document.querySelector('tbody');

const formContainer = document.querySelector('.form-container');
const form = document.querySelector('form');
const formExit = document.querySelector('form button#exit');
const formSubmit = document.querySelector('form button[type="submit"]');

function Book(title, author, pages, read) {
    this.title = title; 
    this.author = author;
    this.pages = pages; 
    this.read = read; 
}

Book.prototype.info = function(){
    return [this.title, this.author, this.pages, this.read]; 
}

const books = [];


bookAdder.addEventListener('click', toggleFormContainer);

formExit.addEventListener('click', toggleFormContainer)

formSubmit.addEventListener('click', (event) => {
    if (!form.checkValidity()){
        console.log('Invalid inputs!');
        return;
    }
    const authorInput = document.querySelector('#author');
    const titleInput = document.querySelector('#title');
    const pagesInput = document.querySelector('#pages');
    const readInput = document.querySelector('#read');

    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
    books.push(newBook);

    tableBody.textContent = ''; //Clears table body
    for (let i = 0; i < books.length; i++){
        const currBook = books[i];
        addRowEntry(currBook, i);
    } 
    
    event.preventDefault(); 
    form.reset(); 
    toggleFormContainer();
})

function addRowEntry(book, index){
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-index', index);
    for (thing of book.info()){
        const newData = document.createElement('td');
        newData.textContent = thing;
        newRow.appendChild(newData);
    }
    
    const firstRowChild = newRow.querySelector('td');
    const removalButton = document.createElement('button');
    removalButton.setAttribute('type', 'button');
    removalButton.classList.add('remove');
    removalButton.textContent = '-';
    firstRowChild.prepend(removalButton);
    
    tableBody.appendChild(newRow); 
}

function toggleFormContainer(){
    formContainer.style.cssText = (formContainer.style.cssText != 'display: flex;') ? 'display: flex' : 'display:none';
}
