const squaresEl = document.querySelectorAll('.square');
const startButtonEl = document.querySelector('.startButton');
const countNumberEl = document.querySelector('.countNumber');
const messageEl = document.querySelector('.message');
const squaresdivEl = document.querySelector('.squares') //진동효과를 위해 영역도 가져옴

let squareNum = []; //순서가 담길것
let counter = 0;    //변화가 적용된 square를 카운트
let clickCount = 0; //선택된 square를 카운트

let count = 10;  //제한시간 카운트 조정가능

//1부터 max만큼 중복x 숫자 생성, 순서 배열에 추가
function generateRandomNum(max) {
    if (squareNum.length === max) {
        return;
    }
    let randomNum = Math.floor(Math.random() * max) + 1;
    if (!squareNum.includes(randomNum)) {
        console.log(randomNum);
        squareNum.push(randomNum);
        return randomNum;
    }
    else {
        return generateRandomNum(max);
    }
}

//순서에 따라 square에 효과 주기
function blueSquare() {
    let generatedNum = generateRandomNum(9);
    if (generatedNum === undefined) {
        return;
    }
    let blueSquare = document.querySelectorAll(".square")[generatedNum - 1];
    blueSquare.classList.add('blue');

    setTimeout(function () {
        blueSquare.classList.remove('blue');
    }, 500);
}

//각 square에 이벤트 추가
function checkClickOrder() {
    squaresEl.forEach((square) => {
        square.addEventListener('click', selectSquares);
    });
}

//박스 진동
const vibration = (target) => {
    target.classList.add("vibration");

    setTimeout(function () {
        target.classList.remove("vibration");
    }, 400);
}

//순서 맞추기, 이벤트 제거까지
function selectSquares(event) {
    let square = event.target;
    if (squareNum[clickCount] == square.dataset.number) {
        square.classList.add('blue');
        clickCount++;
        if (clickCount === 9) {
            messageEl.textContent = '오 다맞았넹~';
            clearInterval(countInterval);
            startButtonEl.textContent = '다시 시작';
            startButtonEl.disabled = false;
            squaresEl.forEach((square) => {
                square.removeEventListener('click', selectSquares);
            });
            squaresdivEl.classList.remove('cursor')
        }
    } else {
        square.classList.add('red');
        vibration(squaresdivEl);
        messageEl.textContent = '틀렸당ㅋ';
        clearInterval(countInterval);
        startButtonEl.textContent = '다시 시작';
        startButtonEl.disabled = false;
        squaresEl.forEach((square) => {
            square.removeEventListener('click', selectSquares);
        });
        squaresdivEl.classList.remove('cursor')
    }
}

//게임 리셋
function resetGame() {
    squaresEl.forEach((square) => {
        square.classList.remove('blue');
        square.classList.remove('red');
        square.removeEventListener('click', selectSquares);
    });
    messageEl.textContent = '순서 맞춰보세요';
    countNumberEl.textContent = '10';
    squareNum = [];
    clickCount = 0;
    counter = 0;
    count = 10;
}

let countInterval;

//순서 맞출때 카운트
function countDown() {
    countInterval = setInterval(function () {
        count--;
        countNumberEl.textContent = count;
        if (count === 0) {
            clearInterval(countInterval);
            messageEl.textContent = '시간 초과!';
            startButtonEl.textContent = '다시 시작';
            startButtonEl.disabled = false;
            squaresEl.forEach((square) => {
                square.removeEventListener('click', selectSquares);
            });
            squaresdivEl.classList.remove('cursor')

        }
    }, 1000);
};

//스타트 버튼, 게임리셋
startButtonEl.addEventListener('click', function () {
    startButtonEl.disabled = true;

    resetGame();

    const interVal = setInterval(function () {
        blueSquare();
        counter++;
        if (counter === 9) {
            console.log(squareNum);
            counter = 0;
            clearInterval(interVal);

            countNumberEl.textContent = count;

            delay(500, function () {
                count = 10;
                countDown()

                checkClickOrder();
                squaresdivEl.classList.add('cursor')
            });
        }
    }, 500);

    function delay(time, callback) {
        setTimeout(callback, time);
    }
});


////////////next step
//단계 추가
//승패 효과 추과