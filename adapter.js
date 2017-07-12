// window.onload = function() {
//   // getData()
//   createUser()
// }

$(document).ready(function(){
  createUser()

})
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

function createUser() {
  debugger
  $('#signup').submit(function(event) {
  event.preventDefault();
  let values = $(this).serialize()
  let posting = $.post('http://localhost:3000/users', values)
      posting.done(function(data) {
        $('#signup').toggle()
        $('#username').text(`Hi ${data.name}`)
        let portfolioForm = new MyForm()
        $('#portfolioForm').append(portfolioForm.render())
        ourAPI()
        grabPortfolio()
      })
  })
}

function grabPortfolio() {
  debugger
  $('#portfolioForm').on('submit', '#portForm', function(event) {
    event.preventDefault();
    let selections = document.querySelectorAll('.portfolio')
    let chosen = []
    selections.forEach((company) => {
      if (company.checked) {
        chosen.push(company.value)
      }
    })
    debugger
  })
}

class MyForm {
  constructor() {}
  render() {
    return (
    `<form id="portForm">
      <div>
        <input type="checkbox" class="portfolio" name="subscribe" value="apple">
        <label for="subscribeNews">Apple</label>
         <input type="checkbox" class="portfolio" name="subscribe" value="amazon">
        <label for="subscribeNews">Amazon</label>
          <input type="checkbox" class="portfolio" name="subscribe" value="google">
        <label for="subscribeNews">Google</label>
         <input type="checkbox" class="portfolio" name="subscribe" value="facebook">
        <label for="subscribeNews">Facebook</label>
        <input type="checkbox" class="portfolio" name="subscribe" value="microsoft">
        <label for="subscribeNews">Microsoft</label>
      </div>
      <div>
        <button type="submit">Create Portfolio</button>
      </div>
    </form>`)
  }
}

let chartArray=[]
function filterData(data, companyName){
  let companyArray=[];

   let twentySixteen = data.filter((stock)=>{
    return stock.name ===companyName
  }).filter((stock)=>{
    return stock.date.substring(0,4) ==='2016'
  }).map((el)=>{
    return el.price
  }) 

  let twentySeventeen = data.filter((stock)=>{
    return stock.name ===companyName
  }).filter((stock)=>{
    return stock.date.substring(0,4) ==='2017'
  }).map((el)=>{
    return el.price
  }) 

  twentySixteen.unshift(companyName + ' 2016')
  twentySeventeen.unshift(companyName + ' 2017')
  companyArray.push(twentySixteen)
  companyArray.push(twentySeventeen)
  chartArray.push(companyArray)
}

function ourAPI(){
debugger
$.get('http://localhost:3000/stocks',function(data){
  console.log(data)
  let amazon = filterData(data, 'Amazon')
  let google = filterData(data, 'Google')
  let microsoft = filterData(data, 'Microsoft')
  let facebook = filterData(data, 'Facebook')
  let apple = filterData(data, 'Apple')
 
  // chart(chartArray)
  })
  
}

function chart(chartArray){
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        chartArray[0][0],
        chartArray[0][1],
        chartArray[1][0],
        chartArray[1][1],
        chartArray[2][0],
        chartArray[2][1],
        chartArray[3][0],
        chartArray[3][1], 
        chartArray[4][0],
        chartArray[4][1],        
      ]
    },
    axis: {
      x: {
        label: {
          text: 'Months',
          position: 'outer-center'
        }
      },
      y: {
        label: {
          text: 'Prices',
          position: 'outer-middle'
        }
      }

    }

});

}

   

