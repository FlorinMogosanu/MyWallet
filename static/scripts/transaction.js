const nextOne = document.getElementById('next-one')
const nextTwo = document.getElementById('next-two')
const backTwo = document.getElementById('back-two')
const backThree = document.getElementById('back-three')
const doneBtn = document.getElementById('done')
const transactionOne = document.querySelector('.transaction-one')
const transactionTwo = document.querySelector('.transaction-two')
const transactionThree = document.querySelector('.transaction-three')

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


nextOne.addEventListener('click', nextOneClickHandler);
backTwo.addEventListener('click', backTwoClickHandler);
nextTwo.addEventListener('click', nextTwoClickHandler);
backThree.addEventListener('click', backThreeClickHandler);


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
  transactionThree.removeAttribute('id')
  transactionTwo.setAttribute('id', 'dnone')
}

function backThreeClickHandler(e){
  transactionTwo.removeAttribute('id')
  transactionThree.setAttribute('id', 'dnone')
}