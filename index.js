

let deckId
let myPoints = 0
let opponentPoints = 0
let remainingCards
const container = document.getElementById("container")
const cardsCount = document.getElementById("cardsLeft")

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            localStorage.setItem("deck", deckId)
            cardsCount.textContent = `Cards left: ${data.remaining}`
            myPoints = 0
            opponentPoints = 0
            container.innerHTML = `<h3>Your score: 0</h3>
            <div class="card" id="myCard">  
            </div>
            <div class="card" id="computerCard">   
            </div>
            <h3>Opponent score: 0</h3>`
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    let deckId = localStorage.getItem("deck")
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(function(data){
            console.log(data.cards)
            let message = ''
            remainingCards = data.remaining
            if(data.cards[0].value > data.cards[1].value){
                message = "You won"
                myPoints++
            } else if ((data.cards[1].value > data.cards[0].value)){
                message = "You lost"
                opponentPoints++
            } else {
                message = "Draw"
            }
            container.innerHTML = `
            <h2>${message}</h2>
            <h3>Your score: ${myPoints}</h3>
            <div class="card" id="myCard">
                <img src=${data.cards[0].image}>
            </div>
            <div class="card" id="computerCard">
                <img src=${data.cards[1].image}>
            </div>
            <h3>Opponent score: ${opponentPoints}</h3>`

            cardsCount.textContent = `Cards left: ${remainingCards}`

            let winningMessage 

            if(myPoints > opponentPoints ){
                winningMessage = "You won"
            } else if (myPoints < opponentPoints ){
                winningMessage = "You lost"
            } else {
                winningMessage = "Draw"
            }

            if(remainingCards == 0){
                setTimeout(function(){
                    document.body.innerHTML = `
                    <div class="endGame">
                    <h1 class="result">${winningMessage}</h1>
                    <button class="NG" onclick="location.reload()">New game</button>
                    </div>`  
                }, 1500)
            }
    })
})

