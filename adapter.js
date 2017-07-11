window.onload = function() {
  // getData()
}
let apple = []
let amazon = []
let google = []
let microsoft = []
let facebook = []

function getData() {
    fetch('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20160101&date.lt=20170710&ticker=MSFT,FB,AAPL,GOOGL,AMZN&api_key=-uF_NbkA7_3nmTJLmr4t', {
    method: 'GET',
})
.then(response => response.json())
.then(json => separateData(json, postData))
// .then(postData(amazon))
// .then(postData(apple))
// .then(postData(facebook))
// .then(postData(microsoft))
// .then(postData(google))

}

function separateData(json, callback) {
    json.datatable.data.forEach(arr => {
        if (arr[0] === 'AMZN') {
            amazon.push( {stock: {name: 'Amazon', ticker: arr[0], date: arr[1], price: arr[5]} })
        } else if (arr[0] === 'MSFT') {
            microsoft.push( {stock: {name: 'Microsoft', ticker: arr[0], date: arr[1], price: arr[5]} })
        } else if (arr[0] === 'AAPL') {
            apple.push( {stock: {name: 'Apple', ticker: arr[0], date: arr[1], price: arr[5]} })
        } else if (arr[0] === 'GOOGL') {
            google.push( {stock: {name: 'Google', ticker: arr[0], date: arr[1], price: arr[5]}} )
        } else if (arr[0] === 'FB') {
            facebook.push( {stock: {name: 'Facebook', ticker: arr[0], date: arr[1], price: arr[5]} })
        }
    })
    callback(apple)
    callback(amazon)
    callback(google)
    callback(facebook)
    callback(microsoft)
}

function postData(data) {
    fetch('http://localhost:3000/stocks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })

}
//
