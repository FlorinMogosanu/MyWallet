const logOutBtn = document.querySelector('.logout-button')
const selectCurr = document.getElementById('currency')
const token = localStorage.getItem('token')

loadCurr()
logOutBtn.addEventListener('click', logOutBtnHandler);
selectCurr.addEventListener('change', selectCurrHandler);

function logOutBtnHandler(){
  localStorage.removeItem('token')
  location.replace('/static/index.html')
}

async function loadCurr(){
  const result = await fetch(`/api/currency/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  selectCurr.value = result.currency
}

async function selectCurrHandler(){
  const result = await fetch(`/api/currency/${token}`,{
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: this.value
      })
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))
}