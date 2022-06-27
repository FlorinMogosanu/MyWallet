

function checkIfLoggedIn() {
  const token = localStorage.getItem('token');
  if(token) location.replace('/static/pages/home.html')
}

// checkIfLoggedIn();