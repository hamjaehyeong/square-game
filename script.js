// const square1 = document.querySelector('.square-1')
// const square2 = document.querySelector('.square-2')
// const square3 = document.querySelector('.square-3')
// const square4 = document.querySelector('.square-4')
// const square5 = document.querySelector('.square-5')
// const square6 = document.querySelector('.square-6')
// const square7 = document.querySelector('.square-7')
// const square8 = document.querySelector('.square-8')
// const square9 = document.querySelector('.square-9')

const squares = [1,2,3,4,5,6,7,8,9]
let squareNum = []

function generateRandomNum(max) {
    if(squareNum.length === max) {
        return;
    }
    let randomNum = Math.floor(Math.random()*max)+1;
    if(!squareNum.includes(randomNum)){
        console.log(randomNum)
        squareNum.push(randomNum)
        return randomNum;
    }
    else{
        return generateRandomNum(max);
    }
}

function blueSquare(){
    let generatedNum = generateRandomNum(9);
    if(generatedNum === undefined) {
        return; 
    }
    let blueSquare = document.querySelectorAll(".square")[generatedNum - 1]; 
    blueSquare.classList.add('blue');

    setTimeout(function() {
        blueSquare.classList.remove('blue');
    }, 1000);
}

let counter = 0;

const interVal = setInterval(function(){
    blueSquare();
    counter++;
    if(counter === 9){
        console.log(squareNum)
        counter = 0;
        clearInterval(interVal)
    }
},1000);
