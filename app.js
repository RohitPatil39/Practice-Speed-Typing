const TextToDisplay = 'https://api.quotable.io/random'
const DisplayText = document.getElementById('TextToShow')
const InputTxt = document.getElementById('InputText')
const TimerCount = document.getElementById('Timer')
const feedback = document.getElementById('Feedback')
const wpm = document.getElementById('WPM')
const container = document.getElementById('Container')
const refreshpage = document.getElementById('TryAgain')

TimerCount.innerText="Start typing ..."

InputText.value = null

let started = true
let correctWords = 0
let temp = 0
let charArray
let typedArray

InputTxt.addEventListener('input', () => {
    charArray = DisplayText.querySelectorAll('span')
    typedArray = InputTxt.value.split('')

    charArray.forEach((char, index) => {

        const InputChar = typedArray[index]

        if(InputChar == null){
            char.classList.remove('correct')
            char.classList.remove('incorrect')
            correct = false
        }
        else{
            if(started) startTimer()
            started = false
            if(InputChar === char.innerText){
                char.classList.add('correct')
                char.classList.remove('incorrect')
            }
            else{
                char.classList.remove('correct')
                char.classList.add('incorrect')
                correct = false
            }
        } 
    })
   
    if(charArray.length == typedArray.length)
    getNextLine()
  
    
})


function findwpm(){
    let flag=true
    charArray = DisplayText.querySelectorAll('span')
    typedArray = InputTxt.value.split('')
    typedArray.forEach((char, index) => {

        const InputChar = charArray[index]

            if(InputChar.innerText != char){
                flag =false
            }
            else if((InputChar.innerText == ' ' || InputChar.innerText == '.') && flag == true ){
                correctWords ++
            }
            else
            flag = true
    })
}
function getText() {
    return fetch(TextToDisplay)
    .then(response => response.json())
    .then(data => data.content)
}

async function getNextLine(){
    const FetchedLine =  await getText()
    FetchedLine.split('').forEach(element => {
        const char = document.createElement('span')
        char.innerText = element
        DisplayText.appendChild(char)
    });
}

let startTime
function startTimer() {
  TimerCount.innerText = 0
  startTime = new Date()
  setInterval(() => {
    TimerCount.innerText = getTimerTime()
  }, 1000)
}
let f=0

function getTimerTime() {
    if(TimerCount.innerText < 60)
  return Math.floor((new Date() - startTime) / 1000)
  else{
    
    findwpm()
    DisplayText.style.visibility = "hidden"; 
    InputTxt.style.visibility = "hidden"; 
    container.style.visibility = "hidden"; 
    TimerCount.style.visibility = "hidden"; 
    refreshpage.style.visibility = "visible"
    document.getElementById('Result').style.visibility = "visible"

    if(correctWords > 25){
        feedback.innerText = "You are Fast!"
        feedback.style.visibility = "visible"
        wpm.style.visibility = "visible"
        wpm.innerText = "\n Your Speed : "+correctWords +" wpm"
    }
    else{
        feedback.innerText = "\n You need to Improve! \n"
        feedback.style.visibility = "visible"
        wpm.style.visibility = "visible"
        wpm.innerText = "\n Your Speed : "+correctWords +" wpm"
        
        
    }
 
    return "Time is Up !"
}
}
getNextLine()