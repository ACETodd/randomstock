Chart.defaults.scale.ticks.display = false;
const key = 'cc4a88ac61dd1d442873c8472837f9fa2974c0f2cd1f4562fe1dddc3fd580da8'

const get_crypto = document.getElementById('get-crypto');
const crypto_ticker = document.getElementById('crypto-ticker');
const crypto_price = document.getElementById('crypto-price');
const crypto_change = document.getElementById('cypto-change');






randomInt = Math.floor(Math.random() * 100) + 1
//load stock tickers from nyse json
var random_stock;
var random_graph;
function getRandomTicker() {
    fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD&api_key=${key}`).then(res => res.json()).then(data =>  {
      random_crypto = data['Data'][JSON.stringify(randomInt)]['CoinInfo']['Name']
      crypto_ticker.innerHTML = `${random_crypto}`
      random_graph = random_crypto

    })
}







function onreload() {
    getRandomTicker()
    crypto_ticker.innerHTML = 'BTC'

    setTimeout(function getRandomStock(){
        var url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${random_crypto}&tsym=USD&limit=119&api_key=${key}`
        fetch(url).then(res => res.json()).then(data => {
            random_price = data['Data']['Data']['0']['close'];


            crypto_price.innerHTML = `$ ${random_price}`
            //crypto_change.innerHTML = `${random_changePercent}`

        })

    }, 200)




    const btcData = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 200)
      })   
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histominute?fsym=${random_graph}&tsym=USD&limit=100&api_key=${key}`);
        const json = await response.json();
        const data = json.Data.Data
        const times = data.map(obj => obj.time)
        const prices = data.map(obj => obj.high)
        return {
          times,
          prices
        }
      }

    async function printBtcChart() {
  
        let { times, prices } = await btcData()
      
          
        let btcChart = document.getElementById('cryptoChart').getContext('2d');
        let gradient = btcChart.createLinearGradient(0, 0, 0, 400);
      
        gradient.addColorStop(0, 'rgba(247,147,26,.5)');
        gradient.addColorStop(.425, 'rgba(255,193,119,0)');
      
        //Chart.defaults.global.defaultFontFamily = 'Red Hat Text';
        //Chart.defaults.global.defaultFontSize = 12;
      
        createBtcChart = new Chart(btcChart, {
          type: 'line',
          data: {
            labels: times,
            datasets: [{
              label: '$',
              data: prices,
              backgroundColor: 'rgb(255,255,255)',
              borderColor: '#F45B69',
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

get_crypto.addEventListener('click', () => {
    reloadSite()
})


onreload()
