let deckId

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            localStorage.setItem("deck", deckId)
        })
}

document.getElementById("new-deck").addEventListener("click", handleClick)

document.getElementById("draw-cards").addEventListener("click", () => {
    let deckId = localStorage.getItem("deck")
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(function(data){
            console.log(data)
            document.getElementById("container").innerHTML = `
            <h2 id="result" class="result">You won</h2>
            <h3 id="yourScore"></h3>
            <div class="card" id="myCard">
                <img src=${data.cards[0].image}>
            </div>
            <h3 id="opponentScore"></h3>
            <div class="card" id="computerCard">
                <img src=${data.cards[1].image}>
            </div>`
    })
})