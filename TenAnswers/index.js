let normalMode = true
let answer = 0
let remain = 10
let minimal = 0
let maximal = 99

const initGame = () => {
    genAnswer()
    document.getElementById('result').style.visibility = 'hidden'
    updateMode()
    updateHint()
    remain = 10
    updateRemain();
    document.getElementById('input').value = ''
    document.getElementById('input').focus()
}

const genAnswer = () => {
    answer = Math.round(Math.random() * 99)
    console.log(`Ans: ${answer}`)
}

const updateMode = () => {
    if (normalMode) {
        document.getElementById('easy').classList.remove('push')
        document.getElementById('normal').classList.add('push')
        document.getElementById('hint').style.visibility = 'hidden'
    }
    else {
        document.getElementById('normal').classList.remove('push')
        document.getElementById('easy').classList.add('push')
        document.getElementById('hint').style.visibility = 'visible'
    }
}

const updateHint = () => {
    document.getElementById("min").innerText = minimal
    document.getElementById("max").innerText = maximal
}

const updateRemain = () => {
    document.getElementById('summary').innerText = 'เหลือจำนวนการทาย ' + remain + ' ครั้ง'
    if (remain <= 3)
        document.getElementById('summary').style.color = '#ff0000'
    else
        document.getElementById('summary').style.color = '#000000'
}

const easyClicked = () => {
    normalMode = false;
    updateMode();
    document.getElementById('input').focus()
}

const normalClicked = () => {
    normalMode = true
    updateMode()
    document.getElementById('input').focus()
}

const sendClicked = () => {
    let input = document.getElementById('input')
    if (input.value == "") {
        alert('Error: no answer found')
        return;
    }
    input = document.getElementById('input')
    result = document.getElementById('result')

    remain--
    updateRemain() // ***

    if (Number(input.value) < answer) {
        result.style.color = '#0000ff'
        result.innerText = input.value + " น้อยเกินไป"
        min = document.getElementById('min')
        min.innerText = Number(input.value) + 1
        min.style.color = '#0000ff'
    }
    else if (Number(input.value) > answer) {
        result.style.color = '#ff0000'
        result.innerText = input.value + " มากเกินไป"
        max = document.getElementById('max')
        max.innerText = Number(input.value) - 1
        max.style.color = '#ff0000'
    }
    else {
        alert('YOU WIN')
        initGame()
        return
    }

    if (remain <= 0) {
        alert('YOU LOSE')
        initGame()
        return
    }

    result.style.visibility = 'visible'
    input.value = ''
    input.focus()
}

const inputKeyDown = (event) => {
    if (event.key == 'Enter') {
        sendClicked()
    }
    else {
        document.getElementById('result').style.visibility = 'hidden'
        document.getElementById('min').style.color = '#000000'
        document.getElementById('max').style.color = '#000000'
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initGame()
})
