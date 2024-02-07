'use strict'

var gFilterBy = ''

function onInit() {
    render() 
}

function render() {
    const elTbody = document.querySelector('tbody')
    const books = getBooks(gFilterBy)
    const emptyTable = `<tr><td colspan="3">No matching books were found</td></tr>`

    const strHtmls = books.map(book => `<tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="onReadBook('${book.id}')" class="btn read">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class="btn update">Update</button>
                <button onclick="onRemoveBook('${book.id}')" class="btn delete">Delete</button>
            </td>
        </tr>`)
    if (books.length === 0) elTbody.innerHTML = emptyTable
    else elTbody.innerHTML = strHtmls.join('')

    renderStats()
}


function onRemoveBook(bookId) {
    removeBook(bookId)
    userMsg('The book has been removed')
    render()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt("Enter the new price:")
    if(!newPrice) return

    updatePrice(bookId, newPrice)
    userMsg('The book has been updated')
    render()
}

function onAddBook() {
    const title = prompt("Enter the title of the book:")
    const price = +prompt("Enter the price of the book:")
    
    if (title && price) {
        addBook(title, price)
        userMsg('The book has been successfully added')
        render()
    } else {
        alert("Please provide both title and price.")
        return
    }

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

function onBookFilter() {
    const input = document.querySelector('input')
    gFilterBy = input.value

    render()
}

function userMsg(msg) {
    const elMsg = document.querySelector('.alert-msg')
    
    elMsg.innerText = msg
    elMsg.classList.remove('hidden')

    setTimeout(() => elMsg.classList.add('hidden'), 2000)
}


function renderStats() {
    const elTotal = document.querySelector('.total-books')
    const elExpens = document.querySelector('.expensive-books')
    const elCheap = document.querySelector('.cheap-books')
    const elAvg = document.querySelector('.avg-books')

    const stats = getStats()

    elTotal.innerText = stats.total
    elExpens.innerText = stats.expensive
    elCheap.innerText = stats.cheap
    elAvg.innerText = stats.avg
}