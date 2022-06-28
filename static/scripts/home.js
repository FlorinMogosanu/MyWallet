const nameHome = document.querySelector('.hello-name')
const token = localStorage.getItem('token')


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
