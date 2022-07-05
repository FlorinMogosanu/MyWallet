const logOutBtn = document.querySelector('.logout-button')
const selectCurr = document.getElementById('currency')
const token = localStorage.getItem('token')
const dmToggle = document.querySelector('#switch')
let darkMode = localStorage.getItem('darkMode')
loadCurr()
loadName()

function enableDarkMode(){
  document.body.classList.add('darkMode')

  localStorage.setItem('darkMode', 'enabled')
}

function disableDarkMode(){
  document.body.classList.remove('darkMode')

  localStorage.setItem('darkMode', null)
}

if(darkMode === 'enabled'){
  document.body.classList.add('darkMode')
  dmToggle.checked = true
}

dmToggle.addEventListener('change', function(){
  if(this.checked){
    enableDarkMode()
  }else{
    disableDarkMode()
  }
})


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

async function loadName(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  const firstName = document.querySelector('.profile-first-name-txt')
  const lastName = document.querySelector('.profile-last-name-txt')

  firstName.innerHTML = `${user.firstName}&nbsp`
  lastName.innerHTML = user.lastName
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