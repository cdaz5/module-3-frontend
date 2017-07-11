let apple = []
let amazon = []
let google = []
let microsoft = []
let facebook = []

function getData() {
    fetch('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20160101&date.lt=20170710&ticker=MSFT,FB,APPL,GOOGL,AMZN&api_key=-uF_NbkA7_3nmTJLmr4t', {
    method: 'GET',
})
.then(response => response.json())
.then(json => separateData(json))
}

function separateData(json) {
    json.datatable.data.forEach(arr => {
        if (arr[0] === 'AMZN') {
            amazon.push( {name: 'Amazon', ticker: arr[0], date: arr[1], price: arr[5]} )
        } else if (arr[0] === 'MSFT') {
            microsoft.push( {name: 'Microsoft', ticker: arr[0], date: arr[1], price: arr[5]} )
        } else if (arr[0] === 'APPL') {
            apple.push( {name: 'Apple', ticker: arr[0], date: arr[1], price: arr[5]} )
        } else if (arr[0] === 'GOOGL') {
            google.push( {name: 'Google', ticker: arr[0], date: arr[1], price: arr[5]} )
        } else if (arr[0] === 'FB') {
            facebook.push( {name: 'Facebook', ticker: arr[0], date: arr[1], price: arr[5]} )
        } 
    }) 
}
getData()

function postData(data) {
    fetch('http://localhost:3000/stocks', {
        method: 'POST', 
        body: JSON.stringify(data),
    })
    .catch(error => console.log("Error: " + error) )
}











