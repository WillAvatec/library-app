let library = [
    {
        name:"Hobbit", author:"Tolkien", pages: "600", read: false
    }
    ,{
        name:"MahBook", author:"Me", pages: "100", read:false
    }
]

/* console.table(library) */

// Using classes

class Book {
    constructor(name,author,pages,read){
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

// Convertir valores de formulario a Book

const formButton = document.querySelector("#submit");

formButton.addEventListener("click",(event)=>{
    event.preventDefault()
    let name = document.querySelector("#name").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#page").value;
    let read = document.querySelector("#read").checked;

    let book = new Book(name,author,pages,read);
    library.push(book);

    renderLibrary()
});

renderLibrary();


// Borrar Book de tanto la library y de la tabla


function restartListener(){

    const remove = document.querySelectorAll(".remove");

    remove.forEach((node)=>{
        node.addEventListener("click",()=>{   
            let value = node.parentElement.getAttribute("data-index")
            deleteBook(value)}
        )
    })
}

function deleteBook(i){
    library.splice(i, 1);
    renderLibrary();
}


// Funcion que se encarga de asignar los datos de la libreria en td's
// y tambien se encarga de los appendChild hacia la fila

function setBookValues(row,index, name, author, pages, isRead) {
    const rowFixed = row
    const bName = document.createElement("td");
    const bAuthor = document.createElement("td");
    const bPages = document.createElement("td");
    const read = document.createElement("td");
    const erase = document.createElement("td");
    erase.setAttribute("class","remove");

    bName.textContent = name;
    bAuthor.textContent = author;
    bPages.textContent = pages;
    isRead===true ? read.textContent = "SI": read.textContent = "NO";
    erase.innerHTML = "&times;"

    
    rowFixed.setAttribute("data-index",index)
    rowFixed.appendChild(bName);
    rowFixed.appendChild(bAuthor);
    rowFixed.appendChild(bPages);
    rowFixed.appendChild(read);
    rowFixed.appendChild(erase);

    return rowFixed;
}


// Añadir libro creado a la tabla

function addBookToTable(index,bName,bAuthor,bPages,IsRead){
    const tr = document.createElement("tr");
    setBookValues(
        tr,
        index,
        bName,
        bAuthor,
        bPages,
        IsRead);
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

// Limpiar tabla and por cada elemento del array. se añade a la libreria

function renderLibrary(){
    cleanTable();
    library.forEach((item,index)=>addBookToTable(
        index,
        item.name,
        item.author,
        item.pages,
        item.read)
        );
    restartListener();
}



// Modal javascript

// Referencias a los  elementos del DOM

const openBtn = document.querySelector("#open");
const modal = document.querySelector(".modal");
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


