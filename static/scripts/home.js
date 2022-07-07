const nameHome = document.querySelector('.hello-name')
const token = localStorage.getItem('token')
const darkMode = localStorage.getItem('darkMode')
let currency
let walletCategoryChart

let dataOutcome = [];
let labelOutcome = [];
let colorOutcome = [];

let dataLine = []
let labelLine = []

if(darkMode === 'enabled') {
  const accountImg = document.querySelector('.profile-img')
  const walletImg = document.querySelector('.wallet-img')
  const savingImg = document.querySelector('.savings-img')
  const historyImg = document.querySelector('.history-img')
  const logoImg = document.querySelector('.logo-img')
  document.body.classList.add('darkMode')
  accountImg.src = '/static/images/accountwhite.png'
  walletImg.src = '/static/images/walletwhite.png'
  savingImg.src = '/static/images/savingswhite.png'
  historyImg.src = '/static/images/historywhite.png'
  logoImg.src = '/static/images/logowhite.png'
}

getUser()

async function getUser(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))
  
  currency = user.currency
  nameHome.innerHTML = user.firstName
  updateBalance(user.balance)
  updateIncome(user.incomeValue)
  updateExpense(user.expenseValue)
  generateSavingsOne(user.savingItems[0])
  generateSavingsTwo(user.savingItems[1])
  createDataForChart(user.outcomeCategories)
  generateChart()
  createDataForLineChart(user.balancePerMonth)
  generateLineChart()
}

function updateBalance(balance){
  const balanceValue = document.querySelector('.sum-txt')
  const balanceCurrency = document.querySelector('.sum-cur')
  balanceValue.innerHTML = balance
  balanceCurrency.innerHTML = currency
}

function updateIncome(balance){
  const incomeValue = document.querySelector('.incomes-sum-txt')
  const incomeCurrency = document.querySelector('.incomes-sum-cur')
  incomeValue.innerHTML = balance
  incomeCurrency.innerHTML = currency
}

function updateExpense(balance){
  const expenseValue = document.querySelector('.expenses-sum-txt')
  const expenseCurrency = document.querySelector('.expenses-sum-cur')
  expenseValue.innerHTML = balance
  expenseCurrency.innerHTML = currency
}

function generateSavingsOne(item){
  if(!item) return
  const savingCon = document.querySelector('.saving1-con')
  const percentage = Math.floor(item.savedValue / item.value * 100)

  const catNameCon = document.createElement('div')
  catNameCon.setAttribute('class', 'cat-name-con')
  const catName = document.createElement('p')
  catName.setAttribute('class', 'cat-name')
  catName.innerHTML = item.name
  catNameCon.appendChild(catName)

  const chartCon = document.createElement('div')
  chartCon.setAttribute('class', 'chart-con')
  const chartCanvas = document.createElement('canvas')
  chartCanvas.setAttribute('id', 'chart')
  chartCon.appendChild(chartCanvas)

  const data = {
    labels: ['Saved Amount', 'Not saved Amount'],
    datasets: [{
      label: 'Label',
      data: [percentage, 100-percentage],
      backgroundColor: [item.color, '#ccc'],
      borderColor: [item.color, '#ccc'],
      borderWidth: 1,
      cutout: '88%',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
          tooltip:{
            enabled: false,
          },
          legend:{
              display:false,
          },
          counter: {
              fontColor: 'black',
              fontSize: 50,
              fontFamily: 'sans-serif'
          }
      }
    },
  };

  const chart = new Chart(
    chartCanvas,
    config
  );

  const percentageCon = document.createElement('div')
    percentageCon.setAttribute('class', 'percentage-con')
    const percentageTxt = document.createElement('p')
    percentageTxt.setAttribute('class', 'percentage-txt')
    
    percentageTxt.innerHTML = `${percentage}%`
    percentageCon.appendChild(percentageTxt)

    savingCon.appendChild(catNameCon)
    savingCon.appendChild(chartCon)
    savingCon.appendChild(percentageCon)
}

function generateSavingsTwo(item){
  if(!item) return
  const savingCon = document.querySelector('.saving2-con')
  const percentage = Math.floor(item.savedValue / item.value * 100)

  const catNameCon = document.createElement('div')
  catNameCon.setAttribute('class', 'cat-name-con')
  const catName = document.createElement('p')
  catName.setAttribute('class', 'cat-name')
  catName.innerHTML = item.name
  catNameCon.appendChild(catName)

  const chartCon = document.createElement('div')
  chartCon.setAttribute('class', 'chart-con')
  const chartCanvas = document.createElement('canvas')
  chartCanvas.setAttribute('id', 'chart')
  chartCon.appendChild(chartCanvas)

  const data = {
    labels: ['Saved Amount', 'Not saved Amount'],
    datasets: [{
      label: 'Label',
      data: [percentage, 100-percentage],
      backgroundColor: [item.color, '#ccc'],
      borderColor: [item.color, '#ccc'],
      borderWidth: 1,
      cutout: '88%',
    }]
  };

  const config = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
          tooltip:{
            enabled: false,
          },
          legend:{
              display:false,
          },
          counter: {
              fontColor: 'black',
              fontSize: 50,
              fontFamily: 'sans-serif'
          }
      }
    },
  };

  const chart = new Chart(
    chartCanvas,
    config
  );

  const percentageCon = document.createElement('div')
    percentageCon.setAttribute('class', 'percentage-con')
    const percentageTxt = document.createElement('p')
    percentageTxt.setAttribute('class', 'percentage-txt')
    
    percentageTxt.innerHTML = `${percentage}%`
    percentageCon.appendChild(percentageTxt)

    savingCon.appendChild(catNameCon)
    savingCon.appendChild(chartCon)
    savingCon.appendChild(percentageCon)
}

function createDataForChart(categoriesOutcome){
  let aux = {}
  let s=0
  for(let i=0;i<8;i++)
  {
    for(let j=i+1;j<9;j++)
    {
      if(categoriesOutcome[i].value<categoriesOutcome[j].value)
        {
          aux=categoriesOutcome[i];
          categoriesOutcome[i]=categoriesOutcome[j];
          categoriesOutcome[j]=aux;
        }
    }
  }
    for( let i=2; i<9; i++){
      s = categoriesOutcome[i].value + s
    }

    dataOutcome[0] = categoriesOutcome[0].value;
    labelOutcome[0] = categoriesOutcome[0].name;
    colorOutcome[0] = categoriesOutcome[0].color;

    dataOutcome[1] = categoriesOutcome[1].value;
    labelOutcome[1] = categoriesOutcome[1].name;
    colorOutcome[1] = categoriesOutcome[1].color;

    dataOutcome[2] = s
    labelOutcome[2] = 'Other'
    colorOutcome[2] = '#EA7878';

    console.log(dataOutcome, labelOutcome, colorOutcome);
}

function generateChart(){
  const data = {
    labels: labelOutcome,
    datasets: [{
      label: 'Label',
      data: dataOutcome,
      backgroundColor: colorOutcome,
      borderColor: colorOutcome,
      borderWidth: 1,
      cutout: '80%',
    }]
  };

  const counterWallet = {
    id: 'counter',
    afterDatasetsDraw(chart, args, options) {
        const { ctx, data, chartArea: {top, bottom, right, left, width, height} } = chart;  
        ctx.save();
        ctx.font =40 + 'px ' + options.fontFamily;
        ctx.textAlign = 'center';
        if(darkMode === 'enabled') ctx.fillStyle = 'white';
        else ctx.fillStyle = 'black';
        
        ctx.fillText(currency + data.datasets[0].data[0], width / 2, top + (height / 2)+ (options.fontSize * 0.34)-25);
        ctx.restore();

        ctx.font = options.fontSize + 'px ' + options.fontFamily;
        ctx.textAlign = 'center';
        ctx.fillStyle = 'gray';
        ctx.fillText(data.labels[0], width / 2, top + (height / 2)+ (30 * 0.34)+32.5);
        
    }
  }

  const configWallet = {
    type: 'doughnut',
    data: data,
    options: {
      plugins: {
          tooltip:{
            enabled: false,
          },
          legend:{
              display:false,
          },
          counter: {
              fontColor: 'black',
              fontSize: 50,
              fontFamily: 'sans-serif'
          }
      }
    },
    plugins: [counterWallet],
  };

  walletCategoryChart = new Chart(
    document.getElementById('cat-chart'),
    configWallet
  );

  generateLegend()
}

function generateLegend() {
  const catsCon = document.querySelector('.cat-info-con')
  catsCon.innerHTML = ''

  walletCategoryChart.legend.legendItems.forEach((dataset,index)=>{
    const catCon = document.createElement('div')
    catCon.setAttribute('class', 'cat-con')

    const catName = document.createElement('p')
    catName.setAttribute('class', 'cat-txt')
    catName.innerHTML= dataset.text

    const rightCon = document.createElement('div')
    rightCon.setAttribute('class', 'cat-sum-con')

    const price = document.createElement('p')
    price.setAttribute('class','price')
    price.innerHTML= walletCategoryChart.data.datasets[0].data[index]

    const curr = document.createElement('p')
    curr.setAttribute('class', 'cur')
    curr.innerHTML = currency

    rightCon.appendChild(price)
    rightCon.appendChild(curr)

    catCon.appendChild(catName)
    catCon.appendChild(rightCon)

    catsCon.appendChild(catCon)

  })
}

function createDataForLineChart(balancePerMonth){
  for(let i = 0; i< 7; i++){
    dataLine[i] = balancePerMonth[i].value;
    labelLine[i] = balancePerMonth[i].month; 
  }
}

function generateLineChart(){
  const data = {
    labels: labelLine,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: '#5143cc',
      borderColor: '#5143cc',
      data: dataLine,
    }]
  };

  const configLine = {
    type: 'line',
    data: data,
    options: {
      pointRadius:0,
      maintainAspectRatio: false,
      borderWidth: 5,
      tension: 0.5,
      scales:{
        y:{
          beginAtZero: true,
          ticks:{
            display: false,
          },
          gird:{
            display: false,
            drawTicks:false,
            drawOnChartArea: false,
          }
        },
      },
      
      plugins: {
        tooltip:{
          enabled: true,
        },
        legend:{
            display:false,
        },
        
      },
        
      
    }
  };

  const lineChart = new Chart(
    document.getElementById('line-chart'),
    configLine,
  )
}