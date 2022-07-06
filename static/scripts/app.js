const darkMode = localStorage.getItem('darkMode')

if(darkMode === 'enabled') {
  document.body.classList.add('darkMode')
}

function checkIfLoggedIn() {
  const token = localStorage.getItem('token');
  if(token) location.replace('/static/pages/home.html')
}

checkIfLoggedIn();