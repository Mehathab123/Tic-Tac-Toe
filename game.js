let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGame = document.querySelector('#newbtn');
let msgcontainer = document.querySelector('.msgcontainer');
let message = document.querySelector('#message');

let turnO = true;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        box.innerText = turnO ? "O" : "X";
        box.disabled = true;

        turnO = !turnO;
        checkWinner();
    });
});

const showWinner = (Winner) => {
    message.innerText = `Congratulations, Winner is ${Winner}`;
    msgcontainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); 
                gameOver = true; 
                return;
            }
        }
    }

   
    if ([...boxes].every(box => box.innerText !== "")) {
        message.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hide");
        gameOver = true;
    }
};

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    gameOver = false;
    msgcontainer.classList.add("hide");
    message.innerText = "";
    turnO = true;
});

newGame.addEventListener("click", () => {
    resetBtn.click(); 
});