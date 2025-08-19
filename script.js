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
  myLibrary.push(new Book(title, author, pages, isRead));
}

function displayLibraryBooks() {
  myLibrary.forEach((book, index) =>
    console.log(`${index + 1}. ${book.info()}`)
  );
}

addBookToLibrary("The Hobbit", "J.J.R. Tolkien", 295, false);
addBookToLibrary("War and Peace", "Leo Tolstoy", 1225, true);

showBtn.addEventListener("click", () => {
  dialog.showModal();
});
