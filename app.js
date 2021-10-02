class Book {
    constructor(title, author, iban){
        this.title = title;
        this.author = author;
        this.iban = iban;
    }

    isEqualTo(book){
        return book.title === this.title 
                 && book.author === this.author 
                 && book.iban === this.iban;
     }
 
}

class Ui {

    addBook(book){
        let tr = document.createElement("tr");
        tr.innerHTML = 
        `<td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.iban}</td>
         <td><a href="#" class="delete">X</a></td>`;
        document.querySelector("#book-list").appendChild(tr);
    }

    addBookToLocalStorage(book){
        let books = JSON.parse(localStorage.getItem("books"));
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    showAlert(msg, type){
        let form = document.querySelector("#form");
        let div = document.createElement("div");


        let p = document.createElement("p");
        p.appendChild(document.createTextNode(`${msg}`));

        if (type === "success") {
            div.className = "css-alert alert-success";
            div.style.color = "green";
        } else {
            div.className = "css-alert alert-danger";
            div.style.color = "red";
        }
        div.appendChild(p);

        document.querySelector(".card").insertBefore(div, form);

        setTimeout(function(){
            document.querySelector(".css-alert").remove();
        }, 3000)
    }

    removeBook(target){
       if (target.className == "delete") {
        let tr = target.parentNode.parentNode;
        let title = tr.getElementsByTagName("td")[0];
        let author = tr.getElementsByTagName("td")[1];
        let iban = tr.getElementsByTagName("td")[2];
        tr.remove();  

        let bookToRemove = new Book(title.innerText, author.innerText, iban.innerText);

        let books = JSON.parse(localStorage.getItem("books"));
        books = books.filter(book => !bookToRemove.isEqualTo(book));
        localStorage.setItem("books", JSON.stringify(books));
       } 
    }

    initialize(){
        let books = JSON.parse(localStorage.getItem("books"));
        if (books === null) {
                localStorage.setItem("books", JSON.stringify([]));
        } else {
            books.forEach(book => this.addBook(book));
        }
    }   

}

document.querySelector("#form").addEventListener("submit", function(e){
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let iban = document.querySelector("#iban").value;

    let book = new Book(title, author, iban);

    let ui = new Ui();

    if (title === '' || author === '' || iban === '') {
        ui.showAlert("inputs can not be empty", "error");
    } else {
        ui.addBook(book);
        ui.addBookToLocalStorage(book);
        ui.showAlert("Book added successfuly ", "success");
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#iban").value = '';
    }
        
    e.preventDefault();
})

document.querySelector("#book-list").addEventListener("click", function(e){
    let ui = new Ui();
    ui.removeBook(e.target);
})

document.addEventListener("DOMContentLoaded", function(e){
    let ui = new Ui();
    ui.initialize();
})