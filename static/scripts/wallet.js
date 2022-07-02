const token = localStorage.getItem('token');
const sumTxt = document.querySelector('.sum-txt'); 
const curTxt = document.querySelector('.sum-cur'); 


let dataExpense = [];
let labelExpense = [];
let colorExpense = [];
let imageExpense = [];




let dataIncome = []
let labelIncome = []
let colorIncome = []
let imageIncome = []





async function getUser(){
    const {user} = await fetch(`/api/user/${token}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res)=> res.json())
    .catch((err)=> console.log(err.message))
  
    changeBalance(user.balance, user.currency)
    createDataForChart(user.incomeCategories, user.outcomeCategories)
    generateChart(user.currency)
}

  function changeBalance(balance, currency){
    sumTxt.innerHTML = balance
    curTxt.innerHTML = currency
  }

  function createDataForChart(categoriesIncome, categoriesOutcome){
    let aux = {}
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

    for(let i=0;i<4;i++)
    {
        for(let j=i+1;j<5;j++)
        {
            if(categoriesIncome[i].value<categoriesIncome[j].value)
            {
                aux=categoriesIncome[i];
                categoriesIncome[i]=categoriesIncome[j];
                categoriesIncome[j]=aux;
            }
        }
    }
    
    for(let i=0; i<5; i++){
        dataIncome[i] = categoriesIncome[i].value;
        labelIncome[i] = categoriesIncome[i].name;
        colorIncome[i] = categoriesIncome[i].color;
        imageIncome[i] = categoriesIncome[i].image;
    }

    for(let i=0; i<9; i++){
        dataExpense[i] = categoriesOutcome[i].value;
        labelExpense[i] = categoriesOutcome[i].name;
        colorExpense[i] = categoriesOutcome[i].color;
        imageExpense[i] = categoriesOutcome[i].imageUrl;
    }

    console.log(dataExpense, labelExpense)

  }

  function generateChart(currency){
    const data = {
        labels: labelExpense,
        datasets: [{
          label: 'Label',
          data: dataExpense,
          backgroundColor: colorExpense,
          borderColor: colorExpense,
          borderWidth: 1,
          cutout: '80%',
          
        }]
      };

      const counterWallet = {
        id: 'counter',
        afterDatasetsDraw(chart, args, options) {
            const { ctx, data, chartArea: {top, bottom, right, left, width, height} } = chart;  
            ctx.save();
            ctx.font = options.fontSize + 'px ' + options.fontFamily;
            ctx.textAlign = 'center';
            ctx.fillStyle = options.fontColor;
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


      const walletCategoryChart = new Chart(
        document.getElementById('chart-wallet'),
        configWallet
      );
  }

  getUser()