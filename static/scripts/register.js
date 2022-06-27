const form = document.getElementById('register-form');

form.addEventListener('submit', registerUser)

async function registerUser(event){
  event.preventDefault();
  const user = document.getElementById('username')
  const email = document.getElementById('email')
  const plainTextPassword = document.getElementById('password')

  const result = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password:password.value
    })
  })
  .then((res)=> res.json())
  .catch((err)=> alert(err.message))

  if(result.status === 'ok'){
    location.replace('/static/pages/home.html')
  }
  else{
    alert(result.error)
  }

  console.log(result)
}