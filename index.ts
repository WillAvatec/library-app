import { firebaseConfig } from "./firebase.js"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, DocumentData, deleteDoc, doc, Firestore } from 'firebase/firestore/lite';


// Connect with FireBase
const app = initializeApp(firebaseConfig);

// Get reference to database
const db = getFirestore(app);

// Get books from db


async function getBooksCollection(db: Firestore): Promise<DocumentData[]> {
    const booksCol = collection(db, 'books');
    const bookSnapshot = await getDocs(booksCol);
    const bookList = bookSnapshot.docs.map(doc => {
        return {data:doc.data(), id: doc.id}
    });
    return bookList;
}

// Using classes

interface Book {
    name: string,
    author: string,
    pages: number,
    read: boolean
}

class Book {
    name:string;
    author:string;
    pages: number;
    read: boolean;
    
    constructor({name,author,pages,read}:Book){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


/* function Book(bName, bAuthor, bPages, read=false){
    this.bName = bName;
    this.bAuthor = bAuthor;
    this.bPages = bPages;
    this.read = read;
} */

// Referencia a la tabla (global variable)
const table = document.querySelector(".styled-table tbody");



// Añadir libro a la base de datos
async function addBookToLibrary (bookObject : Book){
    const docRef = await addDoc(collection(db, "books"), bookObject);
    renderLibrary()
}
  
const submitFormButton = document.querySelector<HTMLButtonElement>("#submit");

function createNewBook():Book {
    const name = document.querySelector<HTMLInputElement>('#name').value;
    const pages = +document.querySelector<HTMLInputElement>('#page').value;
    const read = !!document.querySelector<HTMLInputElement>('#read').value;
    const author = document.querySelector<HTMLInputElement>('#author').value;

    return {
        name,
        pages,
        read,
        author
    }
}

submitFormButton.addEventListener("click",(e)=>{
    e.preventDefault();
    const newBook = createNewBook()
    addBookToLibrary(newBook);
});

// Borrar Book de la libreria

function restartListener(){

    const remove = document.querySelectorAll(".remove");

    remove.forEach((node)=>{
        node.addEventListener("click",()=>{   
            let bookID = node.parentElement.getAttribute("data-id")
            deleteBookFromLibrary(bookID)}
        )
    })
}

async function deleteBookFromLibrary(bookID: string){
    await deleteDoc(doc(db,'books',bookID))
    await renderLibrary();
}


// Funcion que se encarga de asignar los datos de la libreria en td's
// y tambien se encarga de los appendChild hacia la fila

function setBookValues(
    row: HTMLTableRowElement,
    id:string, 
    name:string,
    author:string,
    pages:number,
    isRead:boolean
    ) {
    const rowFixed = row
    const bName = document.createElement("td");
    const bAuthor = document.createElement("td");
    const bPages = document.createElement("td");
    const read = document.createElement("td");
    const erase = document.createElement("td");
    erase.setAttribute("class","remove");

    bName.textContent = name;
    bAuthor.textContent = author;
    bPages.textContent = String(pages);
    isRead===true ? read.textContent = "SI": read.textContent = "NO";
    erase.innerHTML = "&times;"

    
    rowFixed.setAttribute("data-id",id)
    rowFixed.appendChild(bName);
    rowFixed.appendChild(bAuthor);
    rowFixed.appendChild(bPages);
    rowFixed.appendChild(read);
    rowFixed.appendChild(erase);

    return rowFixed;
}


//  Añadir row a la tabla

function addBookToTable(id:string,{name, author, pages, read}:Book){
    const tr = document.createElement("tr");
    setBookValues(
        tr,
        id,
        name,
        author,
        pages,
        read);
    table.appendChild(tr);
}

// Elimina los child elements de la tabla [WHILE(there is at least one child elemnt)]

function cleanTable(){
    let children = table.lastElementChild;
    while(children){
        table.removeChild(children);
        children = table.lastElementChild;
    }

}

// Limpiar tabla and por cada elemento del array se añade a la libreria

async function renderLibrary(){
    const library = await getBooksCollection(db)

    cleanTable();
    library.forEach((item)=>addBookToTable(
        item.id,
        item.data as Book
        ));
    restartListener();
}



// Modal javascript

// Referencias a los  elementos del DOM

const openBtn = document.querySelector("#open");
const modal = document.querySelector(".modal") as HTMLElement;
const span = document.getElementsByClassName("close")[0];

// Botones del Modal

openBtn.addEventListener("click", ()=>{
    modal.style.display = "block"
});

span.addEventListener("click", ()=>{
    modal.style.display = "none"
})

window.addEventListener("click", (e)=>{
    if(e.target == modal){
        modal.style.display = "none"
    }
})


renderLibrary()