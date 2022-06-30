const nextOne = document.getElementById('next-one')
const nextTwo = document.getElementById('next-two')
const backTwo = document.getElementById('back-two')
const backThree = document.getElementById('back-three')
const doneBtn = document.getElementById('done')
const transactionOne = document.querySelector('.transaction-one')
const transactionTwo = document.querySelector('.transaction-two')
const transactionThree = document.querySelector('.transaction-three')
const incomeRadio = document.getElementById('income-label')
const expenseRadio = document.getElementById('expense-label')
const savingRadio = document.getElementById('saving-label')
const token = localStorage.getItem('token')
const imgIncome = document.querySelector('#income-label img')
const imgExpense = document.querySelector('#expense-label img')
const imgSaving = document.querySelector('#saving-label img')

const expenseCategory = [
    {
      name: 'Food',
      value: 0,
      color: '#95D8AF',
      image: '/static/images/expenses/food.png',
    },
    {
      name: 'Transport',
      value: 0,
      color: '#E9C6FF',
      image: '/static/images/expenses/transport.png',
    },
    {
      name: 'Utility',
      value: 0,
      color: '#FFEDAB',
      image: '/static/images/expenses/utility.png',
    },
    {
      name: 'Medication',
      value: 0,
      color: '#D4F986',
      image: '/static/images/expenses/medication.png',
    },
    {
      name: 'Travel',
      value: 0,
      color: '#92E5FF',
      image: '/static/images/expenses/travel.png',
    },
    {
      name: 'Clothes',
      value: 0,
      color: '#B3FFE4',
      image: '/static/images/expenses/clothes.png',
    },
    {
      name: 'Insurance',
      value: 0,
      color: '#EA78BE',
      image: '/static/images/expenses/insurance.png',
    },
    {
      name: 'Education',
      value: 0,
      color: '#7888EA',
      image: '/static/images/expenses/education.png',
    },
    {
      name: 'Other',
      value: 0,
      color: '#EA7878',
      image: '/static/images/expenses/other.png',
    }
]

const incomeCategory = [
  {
    name: 'Salary',
    value: 0,
    color: '#95D8AF',
    image: '/static/images/income/salary.png',
  },
  {
    name: 'Dividend',
    value: 0,
    color: '#95D8AF',
    image: '/static/images/income/dividend.png',
  },
  {
    name: 'Business',
    value: 0,
    color: '#95D8AF',
    image: '/static/images/income/business.png',
  },
  {
    name: 'Rental',
    value: 0,
    color: '#95D8AF',
    image: '/static/images/income/rental.png',
  },
  {
    name: 'Other',
    value: 0,
    color: '#95D8AF',
    image: '/static/images/income/other.png',
  },
]

const savingsCategory =[
  {
    name: 'Car',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/car.png',
  },
  {
    name: 'Debt',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/debt.png',
  },
  {
    name: 'Emergency',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/emergency.png',
  },
  {
    name: 'Gadgets',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/gadgets.png',
  },
  {
    name: 'House',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/house.png',
  },
  {
    name: 'Retirement',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/retirement.png',
  },
  {
    name: 'Vacation',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/vacation.png',
  },
  {
    name: 'Other',
    value: 0,
    savedValue: 0,
    percentage: 0,
    color: '#EA7878',
    image: '/static/images/savings/other.png',
  }
]

const transaction = {
  type: '',
  category: '',
  description: '',
  amount: 0,
  date: '',
}

const saving = {
  name: '',
  value: 0,
  savedValue: 0,
  percentage: 0,
  color: '',
  image: '',
}


nextOne.addEventListener('click', nextOneClickHandler);
backTwo.addEventListener('click', backTwoClickHandler);
nextTwo.addEventListener('click', nextTwoClickHandler);
backThree.addEventListener('click', backThreeClickHandler);
doneBtn.addEventListener('click', doneClickHandler);
incomeRadio.addEventListener('click', incomeRadioClickHandler);
expenseRadio.addEventListener('click', expenseRadioClickHandler);
savingRadio.addEventListener('click', savingRadioClickHandler);


function nextOneClickHandler(e){
  const checkOption = document.querySelector('input[name="option"]:checked')

  if(!checkOption) return alert('Please select an option')

  if(checkOption.value === 'expense') {
    const form = document.getElementById('category-form')
    form.innerHTML = ''

    expenseCategory.forEach((cat)=>{
      const input =  document.createElement('input')
      input.setAttribute('class', 'selection-ts2')
      input.setAttribute('type', 'radio')
      input.setAttribute('id', cat.name)
      input.setAttribute('name', 'category')
      input.setAttribute('value', cat.name)

      const label = document.createElement('label')
      label.setAttribute('class', `show-ts2 ${cat.name}`)
      label.setAttribute('for', cat.name)

      const img = document.createElement('img')
      img.src = cat.image
      
      label.appendChild(img)
      form.appendChild(input)
      form.appendChild(label)
      
    })
    transaction.type = 'expense'
  }
  else if(checkOption.value === 'income'){
    const form = document.getElementById('category-form')
    form.innerHTML = ''

    incomeCategory.forEach((cat)=>{
      const input =  document.createElement('input')
      input.setAttribute('class', 'selection-ts2')
      input.setAttribute('type', 'radio')
      input.setAttribute('id', cat.name)
      input.setAttribute('name', 'category')
      input.setAttribute('value', cat.name)

      const label = document.createElement('label')
      label.setAttribute('class', `show-ts2 ${cat.name}`)
      label.setAttribute('for', cat.name)

      const img = document.createElement('img')
      img.src = cat.image
      
      label.appendChild(img)
      form.appendChild(input)
      form.appendChild(label)
  })
  transaction.type = 'income'
}
  else if(checkOption.value === 'saving'){
    const form = document.getElementById('category-form')
    form.innerHTML = ''

    savingsCategory.forEach((cat)=>{
      const input =  document.createElement('input')
      input.setAttribute('class', 'selection-ts2')
      input.setAttribute('type', 'radio')
      input.setAttribute('id', cat.name)
      input.setAttribute('name', 'saving')
      input.setAttribute('value', cat.name)

      const label = document.createElement('label')
      label.setAttribute('class', `show-ts2 ${cat.name}`)
      label.setAttribute('for', cat.name)

      const img = document.createElement('img')
      img.src = cat.image
      
      label.appendChild(img)
      form.appendChild(input)
      form.appendChild(label)
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
  const tsContainer = document.getElementById('ts3-container')
  const checkOption = document.querySelector('input.selection-ts2:checked')
  if(!checkOption) return alert('Please select an option')

  if(checkOption.name === 'category') {
    transaction.category = checkOption.value
    tsContainer.dataset = {}
    tsContainer.dataset.cat = 'transaction'
    tsContainer.innerHTML = ''

    const formDate = document.createElement('form')
    formDate.setAttribute('class', 'datecon')
    const dateLabel = document.createElement('label')
    dateLabel.setAttribute('for', 'date')
    dateLabel.innerHTML = 'Date'
    const dateInput = document.createElement('input')
    dateInput.setAttribute('type', 'date')
    dateInput.setAttribute('id', 'date')
    dateInput.setAttribute('name', 'date')
    formDate.appendChild(dateLabel)
    formDate.appendChild(dateInput)

    const formDesc = document.createElement('form')
    formDesc.setAttribute('class', 'descon')
    const descLabel = document.createElement('label')
    descLabel.setAttribute('for', 'description')
    descLabel.innerHTML = 'Description'
    const descInput = document.createElement('input')
    descInput.setAttribute('type', 'text')
    descInput.setAttribute('id', 'description')
    descInput.setAttribute('name', 'description')
    formDesc.appendChild(descLabel)
    formDesc.appendChild(descInput)

    const formAmount = document.createElement('form')
    formAmount.setAttribute('class', 'amcon')
    const amountLabel = document.createElement('label')
    amountLabel.setAttribute('for', 'amount')
    amountLabel.innerHTML = 'Amount'
    const amountInput = document.createElement('input')
    amountInput.setAttribute('type', 'number')
    amountInput.setAttribute('id', 'amount')
    amountInput.setAttribute('name', 'amount')
    formAmount.appendChild(amountLabel)
    formAmount.appendChild(amountInput)


    tsContainer.appendChild(formDate)
    tsContainer.appendChild(formDesc)
    tsContainer.appendChild(formAmount)
  }
  else if(checkOption.name === 'saving'){
    tsContainer.dataset = {}
    tsContainer.dataset.cat = 'saving'
    tsContainer.innerHTML= ''

    const selectedCat = savingsCategory.find((cat)=> cat.name === checkOption.value)
    saving.name = selectedCat.name
    saving.color = selectedCat.color
    saving.image = selectedCat.image


    const formVal = document.createElement('form')
    formVal.setAttribute('class', 'valcon')
    const valLabel = document.createElement('label')
    valLabel.setAttribute('for', 'value')
    valLabel.innerHTML = 'Amount to save'
    const valInput = document.createElement('input')
    valInput.setAttribute('type', 'number')
    valInput.setAttribute('id', 'value')
    valInput.setAttribute('name', 'value')
    formVal.appendChild(valLabel)
    formVal.appendChild(valInput)

    const formPercentage = document.createElement('form')
    formPercentage.setAttribute('class', 'percentagecon')
    const percentageLabel = document.createElement('label')
    percentageLabel.setAttribute('for', 'percentage')
    percentageLabel.innerHTML = 'Percentage extracted from income'
    const percentageInput = document.createElement('input')
    percentageInput.setAttribute('type', 'number')
    percentageInput.setAttribute('id', 'percentage')
    percentageInput.setAttribute('name', 'percentage')
    formPercentage.appendChild(percentageLabel)
    formPercentage.appendChild(percentageInput)

    tsContainer.appendChild(formVal)
    tsContainer.appendChild(formPercentage)
  }
  

  transactionThree.removeAttribute('id')
  transactionTwo.setAttribute('id', 'dnone')
}

function backThreeClickHandler(e){
  transactionTwo.removeAttribute('id')
  transactionThree.setAttribute('id', 'dnone')
}

async function doneClickHandler(e){
  const tsContainer = document.getElementById('ts3-container')

  if(tsContainer.dataset.cat === 'transction'){

    const dateInput = document.getElementById('date')
    const descriptionInput = document.getElementById('description')
    const amountInput = document.getElementById('amount')

    

    if(!dateInput.value || !descriptionInput.value || !amountInput.value) return alert('All fields are required')

    
    transaction.amount = amountInput.value
    transaction.date = dateInput.value
    transaction.description = descriptionInput.value
    console.log(transaction)

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
  else if(tsContainer.dataset.cat === 'saving'){
    const valInput = document.getElementById('value')
    const percentageInput = document.getElementById('percentage')

    if(!valInput.value || !percentageInput.value) return alert('All fields are required')

    saving.value = parseInt(valInput.value)
    saving.percentage = parseInt(percentageInput.value)

    console.log(saving)

    const result = await fetch(`/api/saving/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: saving.name,
        value: saving.value,
        savedValue: 0,
        percentage: saving.percentage,
        color: saving.color,
        image: saving.image,
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
}

function incomeRadioClickHandler(e){
  
  imgIncome.src = '/static/images/pluswhite.png'
  imgExpense.src = '/static/images/plus.png'
  imgSaving.src = '/static/images/plus.png'
}

function expenseRadioClickHandler(e){
  
  imgIncome.src = '/static/images/plus.png'
  imgExpense.src = '/static/images/pluswhite.png'
  imgSaving.src = '/static/images/plus.png'
}

function savingRadioClickHandler(e){
  
  imgIncome.src = '/static/images/plus.png'
  imgExpense.src = '/static/images/plus.png'
  imgSaving.src = '/static/images/pluswhite.png'
}