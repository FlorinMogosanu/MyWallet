const nextOne = document.getElementById('next-one')
const nextTwo = document.getElementById('next-two')
const backTwo = document.getElementById('back-two')
const backThree = document.getElementById('back-three')
const doneBtn = document.getElementById('done')
const transactionOne = document.querySelector('.transaction-one')
const transactionTwo = document.querySelector('.transaction-two')
const transactionThree = document.querySelector('.transaction-three')
const token = localStorage.getItem('token')

const expenseCategory = [
    {
      name: 'food',
      value: 0,
      color: '#95D8AF',
      image: '/static/images/expenses/food.png',
    },
    {
      name: 'transport',
      value: 0,
      color: '#E9C6FF',
      image: '/static/images/expenses/transport.png',
    },
    {
      name: 'utility',
      value: 0,
      color: '#FFEDAB',
      image: '/static/images/expenses/utility.png',
    },
    {
      name: 'medication',
      value: 0,
      color: '#D4F986',
      image: '/static/images/expenses/medication.png',
    },
    {
      name: 'travel',
      value: 0,
      color: '#92E5FF',
      image: '/static/images/expenses/travel.png',
    },
    {
      name: 'clothes',
      value: 0,
      color: '#B3FFE4',
      image: '/static/images/expenses/clothes.png',
    },
]

const transaction = {
  type: '',
  category: '',
  description: '',
  amount: 0,
  date: '',
}


nextOne.addEventListener('click', nextOneClickHandler);
backTwo.addEventListener('click', backTwoClickHandler);
nextTwo.addEventListener('click', nextTwoClickHandler);
backThree.addEventListener('click', backThreeClickHandler);
doneBtn.addEventListener('click', doneClickHandler);


function nextOneClickHandler(e){
  const checkOption = document.querySelector('input[name="option"]:checked')

  if(!checkOption) return alert('Please select an option')

  if(checkOption.value === 'expense') {
    const form = document.getElementById('category-form')
    form.innerHTML = ''

    expenseCategory.forEach((cat)=>{
      const input =  document.createElement('input')
      input.setAttribute('class', 'selection')
      input.setAttribute('type', 'radio')
      input.setAttribute('id', cat.name)
      input.setAttribute('name', 'category')
      input.setAttribute('value', cat.name)

      const label = document.createElement('label')
      label.setAttribute('class', `show ${cat.name}`)
      label.setAttribute('for', cat.name)

      const img = document.createElement('img')
      img.src = cat.image

      const br = document.createElement('br')
      
      label.appendChild(img)
      form.appendChild(input)
      form.appendChild(label)
      form.appendChild(br)

      transaction.type = 'expense'
    })
  }
  transactionOne.setAttribute('id', 'dnone')
  transactionTwo.removeAttribute('id')
}

function backTwoClickHandler(e){
  transactionOne.removeAttribute('id')
  transactionTwo.setAttribute('id', 'dnone')
}

function nextTwoClickHandler(e){
  const checkOption = document.querySelector('input[name="category"]:checked')
  if(!checkOption) return alert('Please select an option')
  console.log(checkOption)
  transaction.category = checkOption.value
  transactionThree.removeAttribute('id')
  transactionTwo.setAttribute('id', 'dnone')
}

function backThreeClickHandler(e){
  transactionTwo.removeAttribute('id')
  transactionThree.setAttribute('id', 'dnone')
}

async function doneClickHandler(e){
  const dateInput = document.getElementById('date')
  const descriptionInput = document.getElementById('description')
  const amountInput = document.getElementById('amount')

  

  if(!dateInput.value || !descriptionInput.value || !amountInput.value) return alert('All fields are required')

  transaction.amount = amountInput.value
  transaction.date = dateInput.value
  transaction.description = descriptionInput.value
  console.log(doneBtn)

  const result = await fetch(`/api/transaction/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: transaction.type,
      category: transaction.category,
      description: transaction.description,
      amount: parseInt(transaction.amount),
      date: transaction.date,
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
}