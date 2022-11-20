let library = [
    {
        bName:"Hobbit", bAuthor:"Tolkien", bPages: "600", read: false
    }
    ,{
        bName:"MahBook", bAuthor:"Me", bPages: "100", read:false
    }
]

function Book(id, bName, bAuthor, bPages, read=false){
    this.id = id;
    this.bName = bName;
    this.bAuthor = bAuthor;
    this.bPages = bPages;
    this.read = read;
}

// Referencia a la tabla (global variable)
const table = document.querySelector(".styled-table tbody");

// Funcion que se encarga de asignar los datos de la libreria en td's
// y tambien se encarga de los appendChild hacia la fila

function setBookValues(row, name, author, pages, isRead) {
    const rowFixed = row
    const bName = document.createElement("td");
    const bAuthor = document.createElement("td");
    const bPages = document.createElement("td");
    const read = document.createElement("td");
    const erase = document.createElement("td");

    bName.textContent = name;
    bAuthor.textContent = author;
    bPages.textContent = pages;
    isRead===true ? read.textContent = "SI": read.textContent = "NO";
    erase.innerHTML = "&times;"

    rowFixed.appendChild(bName);
    rowFixed.appendChild(bAuthor);
    rowFixed.appendChild(bPages);
    rowFixed.appendChild(read);
    rowFixed.appendChild(erase);

    return rowFixed;
}


// Añadir libro creado a la talba

function addBookToTable(bName,bAuthor,bPages,IsRead){
    const tr = document.createElement("tr");
    setBookValues(tr,bName,bAuthor,bPages,IsRead);
    table.appendChild(tr);
}

function renderLibrary(){
    library.forEach((item)=>addBook(item.bName,item.bAuthor,item.bPages,item.read));
}

renderLibrary();

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