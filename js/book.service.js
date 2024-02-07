'use strict'

var gBooks 
_createBooks()

function getBooks(filterBy) {
    if (!filterBy) return gBooks
    var filterdBooks = gBooks.filter(book => book.title.toLowerCase().includes(filterBy.toLowerCase()))
    return filterdBooks
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)

    _saveBooks()
}

function updatePrice(bookId, price) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = price
    
    _saveBooks()
}

function addBook(title, price) {
    const book = _createBook(title, price, 'not-available.jpg')
    gBooks.unshift(book)
    
    _saveBooks()
	return book
}

function readBook(bookId) {
    const book = gBooks.find(book => book.id === bookId)
	return book
}

function getStats() {
    const stats = gBooks.reduce((acc, book) => {
        acc.total++
        if(book.price >= 200) acc.expensive++
        if(book.price <= 80) acc.cheap++
        if(book.price > 80 && book.price < 200) acc.avg++

        return acc
    }, {total: 0, expensive: 0, cheap: 0, avg: 0})

    return stats
}

// Private functions

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if(!gBooks || gBooks.length === 0){
        gBooks = [
            _createBook('Harry Potter and the sorcerers stone', 120, 'harry-potter1.jpg'), 
            _createBook('World Atlas', 300, 'world-atlas.jpg'), 
            _createBook('Zorba the Greek', 87, 'zorba.jpg')
        ]
        _saveBooks()
    }
}

function _createBook(title, price, imgUrl) {
	return {
		id: makeId(),
		title,
		price,
        imgUrl,
	}
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}

