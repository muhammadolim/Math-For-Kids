var num1 = document.querySelector('#num1');
var num2 = document.querySelector('#num2');
var oper = document.querySelector('#oper');
var ans = document.querySelector('#answer');
var res = document.querySelector('#result');

var problemBox = document.querySelector('.problemBox');
var resultBox = document.querySelector('.resultBox');

var correctAudio = document.querySelector('#correctAudio');
var resultAudio = document.querySelector('#resultAudio');

var n1, n2, op, check, mark,
    count = 0, countRow = 0, correctAnswers = 0;

var operators = ['+', '-'],
    highMarks = ['Браво', 'Невероятно', 'Фантастика', 'Вот это да', 'Здорово', 'Красота', 'Супер', 'Отлично', 'Молодец', 'Великолепный', 'Идеальный'],
    mediumMarks = ['Хорошо', 'Прохладный', 'Так держать', 'Хорошая работа', 'Хорошо справляешься', 'Впечатляющий'];

ans.focus();
ans.value = '';

function makeProblem() {
    op = `${operators[Math.floor(Math.random() * 2)]}`;
    n1 = `${rand()}`;
    n2 = `${rand()}`;

    if (op == '-' && n1 < n2) {
        [n1, n2] = [n2, n1];
    }

    num1.innerHTML = n1;
    num2.innerHTML = n2;
    oper.innerHTML = op;
};

makeProblem();

function rand() {
    return 10 + Math.floor(Math.random() * 40);
};

function writeAns() {
    if (eval(`${n1} ${op} ${n2}`) == parseInt(ans.value)) {
        check = '✔';
        correctAnswers++;
        correctAudio.play();
    } else {
        check = '❌';
    }

    var tag = document.createElement("p");
    var text = document.createTextNode(`${n1} ${op} ${n2} = ${ans.value} ${check}`);
    tag.appendChild(text);

    if (count % 7 == 0) {
        countRow++;
        var div = document.createElement("div");
        div.className = 'col-4';
        document.getElementById("new").appendChild(div);
    }
    count++;

    var element = document.getElementById("new").children[countRow - 1];
    element.appendChild(tag);
}

window.addEventListener('keydown', (event) => {
    if (event.which == 13 && count < 21) {
        if (count < 20) {
            writeAns();
            makeProblem();
            ans.value = '';
        } else {
            clearTimeout(t);
            time.style.color = 'gold';

            writeAns();
            
            setTimeout(() => {
                resultAudio.play();

                problemBox.style.display = 'none';
                resultBox.style.display = 'flex';

                if (correctAnswers > 18) {
                    mark = highMarks[Math.floor(Math.random() * highMarks.length)];
                } else if (correctAnswers > 11) {
                    mark = mediumMarks[Math.floor(Math.random() * mediumMarks.length)];
                } else {
                    mark = 'Не так';
                }

                res.innerHTML = `${correctAnswers}/21 ${mark}!`;
            }, 500);
        }
    } else if (event.which == 32) {
        location.reload();
    }
});

// ----------------------------------------------- time ------

var time = document.querySelector('time'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    time.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();