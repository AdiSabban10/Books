'use strict'

var gBooks 
_createBooks()

function getBooks() {
    return gBooks
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

