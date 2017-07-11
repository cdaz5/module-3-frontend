
function apiCall() {fetch('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20160101&date.lt=20170710&ticker=MSFT,FB,APPL,GOOGL,AMZN&api_key=-uF_NbkA7_3nmTJLmr4t', {
  method: 'GET',
})
.then(response => response.json())
.then(json => bug(json))
}
function bug(json) {
  debugger
}
apiCall()
