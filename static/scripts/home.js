const nameHome = document.querySelector('.hello-name')
const token = localStorage.getItem('token')
const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  const accountImg = document.querySelector('.profile-img')
  const walletImg = document.querySelector('.wallet-img')
  const savingImg = document.querySelector('.savings-img')
  const historyImg = document.querySelector('.history-img')
  document.body.classList.add('darkMode')
  accountImg.src = '/static/images/accountwhite.png'
  walletImg.src = '/static/images/walletwhite.png'
  savingImg.src = '/static/images/savingswhite.png'
  historyImg.src = '/static/images/historywhite.png'
}

async function getUser(){
  const result = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  nameHome.innerHTML = result.user.firstName


}

getUser()
