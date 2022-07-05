const token = localStorage.getItem('token')
const darkMode = localStorage.getItem('darkMode')
const submit = document.querySelector('.save-button')

if(darkMode === 'enabled') {
  document.body.classList.add('darkMode')
}

submit.addEventListener('click', sumbitClickHandler)

async function sumbitClickHandler(){
  const firstName = document.querySelector('#first-name')
  const lastName = document.querySelector('#last-name')
  const password = document.querySelector('#password')

  const result = await fetch(`/api/update/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      password:password.value
    })
  })
  .then((res)=> res.json())
  .catch((err)=> alert(err.message))

  if(result.status === 'ok'){
    location.replace('/static/pages/settings.html')
  }
  else{
    alert(result.error)
  }
}

