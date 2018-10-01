//use es5 syntax (語法) adn es6 class

class Book{
  constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }
}

class UI{
  //method
  addBookToList(book){
  const list =document.getElementById('book-list');
  //create tr element list row
  const row = document.createElement('tr');
  //insert cols
  row.innerHTML =`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>`;
  list.appendChild(row);

  console.log(row);
  }

  showAlert(message,className){
      //create div
    const div = document.createElement('div');
    //add classes
    div.className =`alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const container=document.querySelector('.container');
    //get form
    const form =document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div,form);

    //timeout  after 3 sec
    setTimeout(function(){
    document.querySelector('.alert').remove();
    },3000);
  }

  deleteBook(target){

    if(target.className==='delete'){
      target.parentElement.parentElement.remove();
  
    }
  }

  clearFields(){

    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';

  }

}
//local storage Class
class Store{
  static getBooks(){
    let books;
        if(localStorage.getItem('books')===null){
      books=[];
    }else{
      books=JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }
  static displayBooks(){
    const books= Store.getBooks();
    
    books.forEach(function(book){
      const ui =new UI;

      //add book to UI
      ui.addBookToList(book);
    });
  }
  static addBook(book){
    const books= Store.getBooks();
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));

  }
  static removeBook(isbn){
    const books =Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn===isbn){
        books.splice(index,1);
      }
    });
    //set local storage
    localStorage.setItem('books',JSON.stringify(books));

  }
}
//DOM load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);


//Event lsiteners for add book //Submit
document.getElementById('book-form').addEventListener('submit',function(e){
  //get form value
  //console.log('test');
  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value

        
  //instantiate(例示) book
  const book =new Book(title,author,isbn);
 
  //instantiate UI
  const ui =new UI();
  
  console.log(ui);
  //Validate
  if(title===''||author===''||isbn===''){
  //Error alert
  ui.showAlert('Please fill in all fields','error');
  }else{
  //  console.log(ui);
  //add book to list down list
  ui.addBookToList(book);

  //add to Ls
  Store.addBook(book);

  //show success
  ui.showAlert('Book Added!','success');

  //Clear fields  
  ui.clearFields();
}
  e.preventDefault();
});
//DOM Load Event
document.addEventListener('DOMContentLoaded',Store.displayBooks);

//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
  //instantiate UI
  const ui =new UI();

  //Delete book
  ui.deleteBook(e.target);

  //Remove from Ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  //show message
  ui.showAlert('Book Removed','success');
  e.preventDefault();
});
//try to do on es5