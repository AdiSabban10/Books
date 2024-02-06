'use strict'

function onInit() {
    render() 
}

function render() {
    const elTbody = document.querySelector('tbody')
    const books = getBooks()

    const strHtmls = books.map(book => `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="onReadBook('${book.id}')" class="btn read">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class="btn update">Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="btn delete">Delete</button>
            </td>
        </tr>`)
    elTbody.innerHTML = strHtmls.join('')
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt("Enter the new price:")
    if(!newPrice) return

    updatePrice(bookId, newPrice)
    render()
}

function onAddBook() {
    const title = prompt("Enter the title of the book:")
    const price = +prompt("Enter the price of the book:")
    
    if (title && price) {
        addBook(title, price)
    } else {
        alert("Please provide both title and price.")
        return
    }

    render()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTitle = elModal.querySelector('h2 span')
    const elPrice = elModal.querySelector('h3 span')
    // const elPre = elMod?al.querySelector('pre')
    const elImg = elModal.querySelector('div img')

    const book = readBook(bookId)
    // const bookStr = JSON.stringify(book, null, 4)
    
    elTitle.innerText = book.title
    elPrice.innerText = book.price
    // elPre.innerText = bookStr
    elImg.src = `img/${book.imgUrl}`

    elModal.showModal()
}