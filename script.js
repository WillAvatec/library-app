let library = [
    {
        bName:"Hobbit", bAuthor:"Tolkien", bPages: "600", read: true
    }
    ,{
        bName:"MahBook", bAuthor:"Me", bPages: "100", read:false
    }
]

// Referencia a la tabla 
const table = document.querySelector(".styled-table tbody");

// Funcion que se encarga de asignar los datos de la forma en td's
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


function addBook(){
    const tr = document.createElement("tr");
    setBookValues(tr,"mi libro", "yo", "20 pages", true);
    table.appendChild(tr);
}

function renderLibrary(){
    addBook();
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