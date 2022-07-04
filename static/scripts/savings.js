const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  loopFillGroupWithBlank: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
    },
  },
});

const token = localStorage.getItem('token');
const swiperWrapper = document.querySelector('.swiper-wrapper');
const sumTxt = document.querySelector('.sum-txt'); 
const curTxt = document.querySelector('.sum-cur');
let currency
getUser()

const editBtn = document.querySelector('.edit-button')
editBtn.addEventListener('click', editBtnHandler)

async function getUser(){
  const {user} = await fetch(`/api/user/${token}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .catch((err)=> console.log(err.message))

  currency = user.currency

  changeBalance(user.savedValue)
  generateSliderObjects(user.savingItems)
}

function changeBalance(balance){
  sumTxt.innerHTML = balance
  curTxt.innerHTML = currency
}

function generateSliderObjects(savingItems){
  savingItems.forEach((item)=>{
    const percentage = item.savedValue / item.value * 100
    const index = savingItems.indexOf(item)
    const catCon = document.createElement('div')
    catCon.setAttribute('class','cat-con swiper-slide')

    const trashCon = document.createElement('div')
    trashCon.setAttribute('class', 'cat-trash-con')
    const catName = document.createElement('p')
    catName.setAttribute('class', 'cat-name')
    catName.innerHTML = item.name

    const thrashImg = document.createElement('img')
    thrashImg.setAttribute('class', 'trash-img dnone')
    thrashImg.src = '/static/images/trash.png'

    thrashImg.addEventListener('click', async () =>{
      const result = await fetch(`/api/saving/${token}/${index}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res)=> res.json())
      .catch((err)=> console.log(err.message))

      if(result.status === 'ok'){
        location.reload()
      }
      else{
        alert('Error: ' + result.error)
      }
    })

    
    trashCon.appendChild(catName)
    trashCon.appendChild(thrashImg)

    const chartCon = document.createElement('div')
    chartCon.setAttribute('class', 'chart-con')
    const chartCanvas = document.createElement('canvas')
    chartCanvas.setAttribute('id', 'chart')
    chartCon.appendChild(chartCanvas)

    const data = {
      labels: ['Saved Amount', 'Not saved Amount'],
      datasets: [{
        label: 'Label',
        data: [percentage, 100-percentage],
        backgroundColor: [item.color, '#ccc'],
        borderColor: [item.color, '#ccc'],
        borderWidth: 1,
        cutout: '88%',
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
            tooltip:{
              enabled: false,
            },
            legend:{
                display:false,
            },
            counter: {
                fontColor: 'black',
                fontSize: 50,
                fontFamily: 'sans-serif'
            }
        }
      },
    };

    chart = new Chart(
      chartCanvas,
      config
    );

    const percentageCon = document.createElement('div')
    percentageCon.setAttribute('class', 'percentage-con')
    const percentageTxt = document.createElement('p')
    percentageTxt.setAttribute('class', 'percentage-txt')
    
    percentageTxt.innerHTML = `${percentage}%`
    percentageCon.appendChild(percentageTxt)

    catCon.appendChild(trashCon)
    catCon.appendChild(chartCon)
    catCon.appendChild(percentageCon)

    swiperWrapper.appendChild(catCon)
  })

}

async function editBtnHandler(){
  const trashBtns = document.querySelectorAll('.trash-img')
  editBtn.classList.toggle('selected')
  trashBtns.forEach((btn)=>{
    btn.classList.toggle('dnone')
  })
}