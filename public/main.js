// Focus div based on nav button click
function focusDiv(div) {
    var actives = Array.from(document.getElementsByClassName('active'))
    actives.forEach(function (curr) {
        curr.setAttribute('class','hidden')
    })
    document.getElementById(div).setAttribute('class', 'active')
}   
// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch('http://localhost:5000/app/flip/').then(function (response) {
        return response.json()
    }).then(function(result) {
        document.getElementById('flipResult').innerHTML = result.flip
        document.getElementById('quarter').setAttribute('src','assets/img/' + result.flip + '.png')
    })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipCoins() {

}
// Guess a flip by clicking either heads or tails button
function guessCoin(guess) {

}