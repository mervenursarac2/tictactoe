const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector("button");
const statusText = document.querySelector("#statusText");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    // forEach =her bir cells nodu için fonksiyonu çalıştırır
    statusText.textContent = "3 in a row wins";
    restartBtn.addEventListener("click", restartGame);
    document.getElementById("playerX").classList.add("active");
    document.getElementById("playerO").classList.remove("active");
    running = true;
}

function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex"); 
    // html içinde tanımladığımız özelliği aldık
    if(options[cellIndex] != "" || !running){
        return; // hücreye daha önce tıklandıysa tekrar tıklanamaz
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell,index){
    // hücreyi güncelledik ve içine x ya da o koyduk
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    document.getElementById("playerX").classList.toggle("active");
    document.getElementById("playerO").classList.toggle("active");
}

function checkWinner(){
    let roundWon = false;

    for( let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]; // condition şuan 3 uzunluğunda bir array
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == "" ){
            continue; // hücrelerden biri boş ise kontrol etmeye gerek yok
        }
        if(cellA == cellB && cellB == cellC){
            roundWon =true;
            break;
        }
    }

    if(roundWon == true){
        running = false;
        statusText.textContent = `${currentPlayer} wins!!`;
    }
    else if(!options.includes("")){
        statusText.textContent = `draw!!`;
        running = false;
        document.getElementById("playerX").classList.remove("active");
        document.getElementById("playerO").classList.remove("active");
    }
    else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = "3 in a row wins";
    cells.forEach( cell => cell.textContent = "");

    document.getElementById("playerX").classList.add("active");
    document.getElementById("playerO").classList.remove("active");
    running = true;

}