
$(document).ready(function(){
  // getData();
  createUser();
  $('.ui.mini.modal')
  .modal('show')
  ;
  $('#chart').toggle();
});


let apple = [];
let amazon = [];
let google = [];
let microsoft = [];
let facebook = [];
let nvidia = [];
let ibm = [];
let ebay = [];

function getData() {
    fetch('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20160101&date.lt=20170710&ticker=MSFT,FB,AAPL,GOOGL,AMZN,NVDA,IBM,EBAY&api_key=-uF_NbkA7_3nmTJLmr4t', {
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
        } else if (arr[0] === 'NVDA') {
            nvidia.push( {stock: {name: 'NVIDIA', ticker: arr[0], date: arr[1], price: arr[5]} })
        } else if (arr[0] === 'IBM') {
            ibm.push( {stock: {name: 'IBM', ticker: arr[0], date: arr[1], price: arr[5]} })
        } else if (arr[0] === 'EBAY') {
            ebay.push( {stock: {name: 'eBay', ticker: arr[0], date: arr[1], price: arr[5]} })
        }
    })
    callback(apple)
    callback(amazon)
    callback(google)
    callback(facebook)
    callback(microsoft)
    callback(nvidia)
    callback(ibm)
    callback(ebay)
}

function postData(data) {
  //
  console.log(data)
    fetch('http://localhost:3000/stocks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    })
  }
function form(){
  let portfolioForm = new MyForm()

  let apple = new Card("http://www.logodesignlove.com/images/classic/apple-logo-rob-janoff-01.jpg", 'Apple','APPL', 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California that designs, develops, and sells consumer electronics, computer software, and online services.')

  let amazon = new Card("https://s3.amazonaws.com/BURC_Pages/downloads/a-smile_color_btn.png", 'Amazon', 'AMZN', 'Amazon.com, Inc., commonly referred to as simply Amazon, is an American electronic commerce and cloud computing company that was founded on July 5, 1994, by Jeff Bezos and is based in Seattle, Washington.')

  let google = new Card ("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Google-favicon-2015.png/150px-Google-favicon-2015.png", 'Google', 'GOOGL', ' Alphabet Inc. is an American multinational conglomerate created in a corporate restructuring on October 2, 2015. It is the parent company of Google and several former Google subsidiaries.')

  let facebook = new Card ("https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png", 'Facebook', 'FB', 'Facebook is an American for-profit corporation and an online social media and social networking service based in Menlo Park, California.')

  let microsoft = new Card ("https://betanews.com/wp-content/uploads/2022/08/Microsoft-Logo1.jpg", 'Microsoft', 'MFST', 'Microsoft Corporation is an American multinational technology company headquartered in Redmond, Washington. It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and services.');

  let nvidia = new Card("http://logodatabases.com/wp-content/uploads/2012/03/nvidia-logo-black-1024x772.jpg", 'NVIDIA', 'NVDA', 'Nvidia Corporation is an American technology company based in Santa Clara, California. It designs graphics processing units for the gaming and professional markets, as well as system on a chip units for the mobile computing and automotive market.');

  let ibm = new Card("https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2000px-IBM_logo.svg.png",'IBM', 'IBM', 'IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.')

  let ebay = new Card("http://logos-download.com/wp-content/uploads/2016/03/EBay_logo.png", 'eBay', 'EBAY', ' eBay Inc. is a multinational e-commerce corporation, facilitating online consumer-to-consumer and business-to-consumer sales. It is headquartered in San Jose, California.')

  portfolioForm.addCard(apple)
  portfolioForm.addCard(amazon)
  portfolioForm.addCard(google)
  portfolioForm.addCard(facebook)
  portfolioForm.addCard(microsoft)
  portfolioForm.addCard(nvidia)
  portfolioForm.addCard(ibm)
  portfolioForm.addCard(ebay)

  $('#portfolioForm').append(portfolioForm.render())
  portfolioForm.renderCard()

}

function createUser() {
  $('#signup').submit(function(event) {
  event.preventDefault();
  let values = $(this).serialize()
  let posting = $.post('http://localhost:3000/users', values)
      posting.done(function(data) {
        $('#signup').toggle()
        $('#username').text(`Hi, ${data.name}`)
        form()
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
       $('#portfolioForm').empty()
       form()
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
  let nvidia = filterData(data, 'NVIDIA')
  let ebay = filterData(data, 'eBay')
  let ibm = filterData(data, 'IBM')

  // chart(chartArray)
  })

}

  var chart = c3.generate({
    bindto: '#chart',
    padding: {
        top: 20,
        right: 100,
        bottom: 20,
        left: 100,
    },
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
