
var favBooks = JSON.parse(localStorage.getItem('favs'))



class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('favs') === null){
            books=[]
        }
        else{
            books = JSON.parse(localStorage.getItem('favs'))
        }
        return books;

    }

    static addBook(book)
    {
        const books = Store.getBooks()
        books.push(book)
        localStorage.setItem('favs', JSON.stringify(books));
    }
    static removeBook(book){
        const books = Store.getBooks()

        books.forEach((favBook, index)=> {
            if(book.name === favBook.name){
                books.splice(index, 1);
            }
            
        });

        localStorage.setItem('favs', JSON.stringify(books))

    }
}

document.addEventListener('DOMContentLoaded', () =>{
    setTimeout( () => {
        if(favBooks.length === 0){
           const bookSection = document.querySelector('.books-section')
           bookSection.classList.add('empty')
           bookSection.innerHTML = '<h2> Nothing to show here... </h2>'
        }
        else{
    const bookSection = document.querySelector('.books-section')
    favBooks.forEach( (book)=>{
        const div = document.createElement('div')
        div.className = 'book'
        const divBookName = document.createElement('div');
        divBookName.className = 'book-name';
        divBookName.innerHTML = book.name;
        div.setAttribute('tabindex', '0');
        const divEditionCount = document.createElement('div');
        divEditionCount.className = 'edition-count';
        divEditionCount.innerHTML = `Edition Count: ${book.editioncount}`
        const button = document.createElement('button')
        button.className = 'btn';
       // check if it is in local storage
        const favs = JSON.parse(localStorage.getItem('favs'))
        const isPresent = favs.some((item) => (item.name === book.name )) 
        if(isPresent) { 
            button.innerHTML = 'Remove from Favourites'
        }
        else
        {
            button.innerHTML = 'Add to Favourites'
        }
        
        
        div.appendChild(divBookName)
        div.appendChild(divEditionCount)
        div.appendChild(button)

        bookSection.appendChild(div);
        // console.log(element);
        


    })
}
}, 2000)
})

// add event listener on search box

const input1 = document.querySelector('#input1')

input1.addEventListener('focus', () =>{
    const form = document.querySelector('.form');
    form.classList.add('focus')
    const icon = document.querySelector('i');
    icon.classList.add('focus')

})

input1.addEventListener('blur', () =>{
    const form = document.querySelector('.form');
    form.classList.remove('focus')
    const icon = document.querySelector('i');
    icon.classList.remove('focus')
})

const bookSection = document.querySelector('.books-section')

bookSection.addEventListener('focusin', (e) =>{
    if(e.target.classList.contains('book')){
        e.target.classList.add('focus');
        const name = e.target.querySelector('.book-name');
        name.classList.add('focus')
        const count = e.target.querySelector('.edition-count');
        count.classList.add('focus')
        
    }
   
})

bookSection.addEventListener('focusout', (e) =>{
    if(e.target.classList.contains('book')){
        e.target.classList.remove('focus')
        const name = e.target.querySelector('.book-name');
        name.classList.remove('focus')
        const count = e.target.querySelector('.edition-count');
        count.classList.remove('focus')
    }

})


// filter books

let input = document.querySelector('#input1')

input.addEventListener('keyup', (e) => {
    e.preventDefault();
    const value = input.value.toLowerCase()
    const bookdivs = document.querySelectorAll('.book');
    bookdivs.forEach((book) => {
       const bookName = book.querySelector('.book-name')
       if(bookName.innerHTML.toLowerCase().indexOf(value) != -1){
        book.style.display = 'flex';
       }
       else{
        book.style.display = 'none'

       }
    // console.log(bookName.innerHTML.toLowerCase());

       
    })
})





// add evenr listener on menu-bar

const menuBar = document.querySelector('.menu-bar')

menuBar.addEventListener('click', () =>{
    menuBar.classList.toggle('active')
    document.querySelector('.menu').classList.toggle('active');
})

// add event listener on btn

setTimeout(() =>{
    var arr= Array.from(document.getElementsByClassName('btn'))
    arr.forEach((button) => {
        button.addEventListener('click',(e) =>{
        
            if(e.target.innerHTML === 'Add to Favourites'){
                e.target.innerHTML = 'Remove from Favourites'
                const parent= e.target.parentNode;
                parent.querySelector('.book-name').classList.add('focus')
                parent.querySelector('.edition-count').classList.add('focus')
                parent.classList.add('focus')
                e.target.classList.add('focus')

                // add to local storage 
                const book = { name: parent.querySelector('.book-name').innerHTML,
                               editioncount: parent.querySelector('.edition-count').innerHTML
                 }
                 Store.addBook(book)
                 
                
    
             
                
            }
            else if(e.target.innerHTML ==='Remove from Favourites'){
                e.target.innerHTML= 'Add to Favourites';
                const parent= e.target.parentNode;
                parent.querySelector('.book-name').classList.add('focus')
                parent.querySelector('.edition-count').classList.add('focus')
                parent.classList.add('focus');
                e.target.classList.add('focus');

                // Remove from local storage
                const book = { name: parent.querySelector('.book-name').innerHTML,
                    editioncount: parent.querySelector('.edition-count').innerHTML
                 }
                Store.removeBook(book)
            }
        })
        button.addEventListener('focusout', (e) =>{
            const parent= e.target.parentNode;
                parent.querySelector('.book-name').classList.remove('focus')
                parent.querySelector('.edition-count').classList.remove('focus')
                parent.classList.remove('focus');
                e.target.classList.remove('focus')

        })
    })
}, 4000)