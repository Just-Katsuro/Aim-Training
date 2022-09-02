const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeBtn = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      againBtn =document.querySelector('.again-btn'),
      exitBtn =document.querySelector('.exit-btn'),
      colors = ['#ff5c5c', '#ff5cd4', '#c95cff', '#5c61ff', '#5cbbff', '#5cf1ff', '#5cff7c', '#baff5c', '#f6ff5c', '#ff9b5c'];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeBtn.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
} 

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(20, 100)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color1 = randomCircleColor()
    const color2 = randomCircleColor()
    const color3 = randomCircleColor()
    circle.classList.add('circle')
    circle.style.background = `linear-gradient(90deg, ${color1} 20%, ${color2} 47%, ${color3} 100%)`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomCircleColor(){
    return colors[Math.floor(Math.random() * colors.length)]
}