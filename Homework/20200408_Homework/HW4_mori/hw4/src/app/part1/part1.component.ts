import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-part1',
  templateUrl: './part1.component.html',
  styleUrls: ['./part1.component.css']
})
export class Part1Component implements OnInit {

  // declare the type for my variables
  bookList: Array<any>;
  lsBooks: String;

  // inside the constructor, call loadBooks() to check local storage
  constructor() { 
    this.bookList = this.loadBooks()
  }

  loadBooks() {
    // grab the key mori_cart from localstorage
    let lsBooks = window.localStorage.getItem("mori_cart")
    // check to see if the key was defined; if so, return the localStorage list
    if(lsBooks){
      return JSON.parse(lsBooks);
    // if it was not defined; return the default list
    } else {
      return [
        {title: 'Absolute Java',    
          qty: 1, price: 114.95},
        {title: 'Pro HTML5',        
          qty: 2, price: 27.95},
        {title: 'Head First HTML5', 
          qty: 1, price: 27.89}
      ];
    }
  }

  // when button is clicked, take the index parameter and filter the list; setting the implicitly returned list to the variable
  removeBook(elemIndex) {
    this.bookList = this.bookList.filter((book, index) => index !== elemIndex)
  }

  // when button is clicked, push this default book to the variable
  newBook() {
    this.bookList.push({
      title: 'New Book',
      qty: 1,
      price: 10.99
    })
  }

  // when the button is clicked, set the key mori_cart to localstorage
  saveBooks() {
    window.localStorage.setItem("mori_cart", JSON.stringify(this.bookList))
  }

  // when called (in the <th>), mapreduce the variable to determine the total
  getTotal() {
    return this.bookList.length > 0 ? this.bookList.map(book => (book.price * book.qty)).reduce((acc, cur) => acc + cur) : 0;
  }

  // when called (in <thead>), determine if there are books in the variable and whether to show the header
  showHeader() {
    return this.bookList.length <= 0;
  }

  ngOnInit(): void {
  }

}
