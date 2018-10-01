//use es5 syntax (語法) adn es6 class
//book constructor //book object
function Book(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}
// }//practice
// const BookPrototype={
//   book1: function(){
//     return `Hello there ${this.firstName} ${this.lastName}`;
//   }
// }
// const john =Object.create(BookPrototype);
//   john.firstName='John';
//   john.lastName='Doe';
// console.log(john.book1());


//UI constructor //prototype methods
function UI(){}

//create prototype(原型) Add booktolist
//pass book into prototype method 
UI.prototype.addBookToList=function(book){
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
//show Alert
UI.prototype.showAlert=function(message,className){
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
    },3000
  );
}

//delete book
UI.prototype.deleteBook=function(target){
  if(target.className==='delete'){
    target.parentElement.parentElement.remove();

  }
}

//Clear Fields
UI.prototype.clearFields=function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';

}


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
  

  //Validate
  if(title===''||author===''||isbn===''){
  //Error alert
  ui.showAlert('Please fill in all fields','error');
  }else{
  //  console.log(ui);
  //add book to list down list
  ui.addBookToList(book);

  //show success
  ui.showAlert('Book Added!','success');

  //Clear fields  
  ui.clearFields();
}
  e.preventDefault();
});


//event listener for delete
document.getElementById('book-list').addEventListener('click',function(e){
  //instantiate UI
  const ui =new UI();

  //Delete book
  ui.deleteBook(e.target);

  //show message
  ui.showAlert('Book Removed','success');
  e.preventDefault();
});