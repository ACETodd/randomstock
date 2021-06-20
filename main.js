Chart.defaults.scale.ticks.display = false;

const get_stock = document.getElementById('get-stock');
const stock_ticker = document.getElementById('ticker');
const stock_price = document.getElementById('price');
const stock_change = document.getElementById('change');
const API_Key = 'D4X1F5TW8KCFR67I';

stockChartXValuesFunction = []
stockChartYValuesFunction = []







randomInt = Math.floor(Math.random() * 500) + 1
//load stock tickers from nyse json
var random_stock;
var random_graph;
function getRandomTicker() {
    fetch('sp500_json.json').then(res => res.json()).then(data => random_stock = data).then(() => {
        random_stock = random_stock[JSON.stringify(randomInt)]['Symbol']
        random_graph = random_stock

    }) 
}









function onreload() {

    getRandomTicker()
    setTimeout(function() {
        console.log(random_stock)
        stock_ticker.innerHTML = `${random_stock}`
    }, 100)

    setTimeout(function getRandomStock(){
            var url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${random_stock}&apikey=${API_Key}`
            fetch(url).then(res => res.json()).then(data => {
                random_price = Number(data['Global Quote']['05. price']);
                random_change = data['Global Quote']['09. change']
                random_changePercent = data['Global Quote']['10. change percent'];
                stock_price.innerHTML = `$ ${random_price}`
                stock_change.innerHTML = `${random_changePercent}`
    
            })
    
        }, 50)

  
    const btcData = async () => {
        //setTimeout(function getRandomGraph() {
            await new Promise(resolve => {
                setTimeout(resolve, 200)
              })          
            await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${random_graph}&interval=5min&apikey=D4X1F5TW8KCFR67I`).then(res => res.json()).then(data => {
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key)
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open'])
                }
                //console.log(stockChartXValuesFunction)
              
            })
        //}, 100)
       
           
        return {
            stockChartYValuesFunction,
            stockChartXValuesFunction
              
        }
    }
          



//create chart
async function printBtcChart() {
  
  let { stockChartXValuesFunction, stockChartYValuesFunction } = await btcData()

    
  let btcChart = document.getElementById('btcChart').getContext('2d');
  let gradient = btcChart.createLinearGradient(0, 0, 0, 400);

  gradient.addColorStop(0, 'rgba(247,147,26,.5)');
  gradient.addColorStop(.425, 'rgba(255,193,119,0)');

  //Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
  //Chart.defaults.global.defaultFontSize = 12;

  createBtcChart = new Chart(btcChart, {
    type: 'line',
    data: {
      labels: stockChartXValuesFunction,
      datasets: [{
        label: '$',
        data: stockChartYValuesFunction,
        backgroundColor: 'rgb(255,255,255)',
        borderColor: '#63326E',
        borderJoinStyle: 'round',
        borderCapStyle: 'round',
        borderWidth: 3,
        pointRadius: 0,
        pointHitRadius: 10,
        lineTension: .1,
      }]
    },

    options: {

      title: {
        display: false,
        text: 'Heckin Chart!',
        fontSize: 35
      },

      legend: {
        display: false
      },

      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },

      scales: {
      
        x: {
          reverse: true,
          grid: {
              drawBorder: false,
              display: false
          }
      },
      y: {
          grid: {
              drawBorder: false,
              display: false
          }
      }
      },
      plugins: {

        legend: {
          display: false
        },
        tooltip: {
          titleFontSize: 0,
          displayColors: false,
          callbacks: {
            //This removes the tooltip title
            title: function() {}
         },
          //this removes legend color
          displayColors: false,
          yPadding: 10,
          xPadding: 10,
          position: 'nearest',
          caretSize: 10,
          backgroundColor: '#303030',
          bodyFontSize: 15,
          bodyFontColor: '#303030' 
        }
      },
     
    }
  });
}


  
printBtcChart()


}











function reloadSite() {
    location.reload();
}

get_stock.addEventListener('click', () => {
    reloadSite()
})


onreload()



