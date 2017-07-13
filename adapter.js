// window.onload = function() {
//   // getData()
//   createUser()

// }

$(document).ready(function(){
  createUser()
  $('.ui.mini.modal')
  .modal('show')
  ;
  $('#chart').toggle()
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
  $('#signup').submit(function(event) {
  event.preventDefault();
  let values = $(this).serialize()
  let posting = $.post('http://localhost:3000/users', values)
      posting.done(function(data) {
        $('#signup').toggle()
        $('#username').text(`Hi, ${data.name}`)
        let portfolioForm = new MyForm()
        $('#portfolioForm').append(portfolioForm.render())
        ourAPI()
        grabPortfolio()
      })
  })
}

function startPlaybackGunit() {
  return document.querySelector('#gunit').play();
}

function startPlaybackSweedish() {
  return document.querySelector('#sweedish').play();
}


function grabPortfolio() {
  $('#chart').show()
  $('#portfolioForm').on('click', '#buttn', function(event) {
    event.preventDefault();
    startPlaybackGunit().then(function() {
      console.log('The play() Promise fulfilled! Rock on!');
    }).catch(function(error) {
      console.log('The play() Promise rejected!');
      console.log('Use the Play button instead.');
      console.log(error);
    })
    if (!!event.target.dataset.clear) {
      let clearForm = new MyForm()
      $('#portfolioForm').empty()
      $('#portfolioForm').append(clearForm.render())
      chart.unload()
      startPlaybackSweedish().then(function() {
        console.log('The play() Promise fulfilled! Rock on!');
      }).catch(function(error) {
        console.log('The play() Promise rejected!');
        console.log('Use the Play button instead.');
        console.log(error);
      })
    }
    let selections = document.querySelectorAll('#portfolio')
    let chosen = []
    selections.forEach((company) => {
      if (company.checked) {
        chosen.push(company.value)
      }
    })

    let userPortfolio=[];
     for (let i=0; i<chartArray.length; i++) {
       for (let j=0; j<chosen.length; j++) {
         if (chartArray[i][0][0].includes(chosen[j])) {
           userPortfolio.push(chartArray[i])
         }
       }
     }
     for(let k=0; k<userPortfolio.length; k++){
        chart.load({
        columns:[
            userPortfolio[k][0],
            userPortfolio[k][1]
        ],
    });
     }


  })
}

class MyForm {
  constructor() {}
  render() {
    return (
    `<form class="ui form">
      <div class="ui center aligned segment">
        <audio id="gunit" src="./sounds/50_5.mp3" type="audio/mp3"></audio>
        <audio id="sweedish" src="./sounds/dontworry.mp3" type="audio/mp3"></audio>
        <button class="ui button" id="buttn" type="submit" data-create="create">Invest</button>
        <button class="ui button" id="buttn" type="submit" data-clear="clear">Clear</button>
      </div>
      <div class="ui centered cards">
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="http://www.logodesignlove.com/images/classic/apple-logo-rob-janoff-01.jpg">
            <div class="header">
              Apple
            </div>
            <div class="meta">
              Ticker: APPL
            </div>
            <div class="description">
              Apple Inc. is an American multinational technology company headquartered in Cupertino, California that designs, develops, and sells consumer electronics, computer software, and online services.
            </div>
          </div>
          <div class="extra content">
            <div class="ui toggle checkbox">
              <input type="checkbox" name="public" id="portfolio" value="Apple">
              <label>Invest?</label>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="https://s3.amazonaws.com/BURC_Pages/downloads/a-smile_color_btn.png">
            <div class="header">
              Amazon
            </div>
            <div class="meta">
              Ticker: AMZN
            </div>
            <div class="description">
              Amazon.com, Inc., commonly referred to as simply Amazon, is an American electronic commerce and cloud computing company that was founded on July 5, 1994, by Jeff Bezos and is based in Seattle, Washington.</b>
            </div>
          </div>
          <div class="extra content">
              <div class="ui toggle checkbox">
                <input type="checkbox" name="public" id="portfolio" value="Amazon">
                <label>Invest?</label>
              </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/150px-Google-favicon-2015.png">
            <div class="header">
              Google
            </div>
            <div class="meta">
              Ticker: GOOGL
            </div>
            <div class="description">
              Alphabet Inc. is an American multinational conglomerate created in a corporate restructuring on October 2, 2015. It is the parent company of Google and several former Google subsidiaries.</b>
            </div>
          </div>
          <div class="extra content">
              <div class="ui toggle checkbox">
                <input type="checkbox" name="public" id="portfolio" value="Google">
                <label>Invest?</label>
              </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png">
            <div class="header">
              Facebook
            </div>
            <div class="meta">
              Ticker: FB
            </div>
            <div class="description">
              Facebook is an American for-profit corporation and an online social media and social networking service based in Menlo Park, California.</b>
            </div>
          </div>
          <div class="extra content">
              <div class="ui toggle checkbox">
                <input type="checkbox" name="public" id="portfolio" value="Facebook">
                <label>Invest?</label>
              </div>
          </div>
        </div>
        <div class="card">
          <div class="content">
            <img class="right floated mini ui image" src="https://betanews.com/wp-content/uploads/2022/08/Microsoft-Logo1.jpg">
            <div class="header">
              Microsoft
            </div>
            <div class="meta">
              Ticker: MSFT
            </div>
            <div class="description">
              Microsoft Corporation is an American multinational technology company headquartered in Redmond, Washington. It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and services.</b>
            </div>
          </div>
          <div class="extra content">
              <div class="ui toggle checkbox">
                <input type="checkbox" name="public" id="portfolio" value="Microsoft">
                <label>Invest?</label>
              </div>
          </div>
        </div>
      </div>
    </form>`)
    // `<form id="portForm">
    //   <div>
    //     <input type="checkbox" class="portfolio" name="subscribe" value="Apple">
    //     <label for="subscribeNews">Apple</label>
    //      <input type="checkbox" class="portfolio" name="subscribe" value="Amazon">
    //     <label for="subscribeNews">Amazon</label>
    //       <input type="checkbox" class="portfolio" name="subscribe" value="Google">
    //     <label for="subscribeNews">Google</label>
    //      <input type="checkbox" class="portfolio" name="subscribe" value="Facebook">
    //     <label for="subscribeNews">Facebook</label>
    //     <input type="checkbox" class="portfolio" name="subscribe" value="Microsoft">
    //     <label for="subscribeNews">Microsoft</label>
    //   </div>
    //   <div>
    //     <button type="submit" id="buttn" data-create="create">Create Portfolio</button>
    //     <button type="submit" id="buttn" data-clear="clear">Clear</button>
    //   </div>
    // </form>`)
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
$.get('http://localhost:3000/stocks',function(data){
  let amazon = filterData(data, 'Amazon')
  let google = filterData(data, 'Google')
  let microsoft = filterData(data, 'Microsoft')
  let facebook = filterData(data, 'Facebook')
  let apple = filterData(data, 'Apple')

  // chart(chartArray)
  })

}

// function chart(dataPoint){

  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [

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

// }
