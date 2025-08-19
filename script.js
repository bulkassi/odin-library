const showBtn = document.getElementById("show-dialog");
const dialog = document.getElementById("dialog");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const isRead = document.getElementById("is-read");
const addBookBtn = document.getElementById("close-add");
const libraryBox = document.getElementById("library-content");

const myLibrary = [];

function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      isRead ? "already read" : "not read yet"
    }`;
  };
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  return newBook.id;
}

function displayLibraryBooks() {
  return myLibrary.reduce((output, book, index) => {
    output += `${index + 1}. ${book.info()}\n`;
    return output;
  }, "");
}

/* Return the index of the found book */
function findBookInLibrary(bookId) {
  return myLibrary.findIndex((book) => book.id === bookId);
}

/*
addBookToLibrary("The Hobbit", "J.J.R. Tolkien", 295, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, true);
*/

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

dialog.addEventListener("close", () => {
  if (dialog.returnValue === "Add the book") {
    const newBookId = addBookToLibrary(
      title.value,
      author.value,
      +pages.value,
      isRead.checked
    );

    const bookEl = document.createElement("div");
    bookEl.classList.add("book");
    bookEl.dataset.id = newBookId;

    const bookInfo = document.createElement("p");
    bookInfo.textContent = myLibrary[myLibrary.length - 1].info();
    bookInfo.classList.add("book-info");

    /* Add the read checkbox */
    const isReadDiv = document.createElement("div");
    const isReadCheckbox = document.createElement("input");
    const isReadLabel = document.createElement("label");

    isReadDiv.classList.add("book-read");

    isReadCheckbox.type = "checkbox";
    isReadCheckbox.checked = myLibrary[myLibrary.length - 1].isRead;

    isReadLabel.textContent = "Is read?";

    isReadDiv.appendChild(isReadCheckbox);
    isReadDiv.appendChild(isReadLabel);

    bookEl.appendChild(bookInfo);
    bookEl.appendChild(isReadDiv);

    libraryBox.appendChild(bookEl);
    console.log(myLibrary);
  }
});
