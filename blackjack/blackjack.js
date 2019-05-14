console.log("Welcome to ClayCards!");

var suit = ["diamonds", "spades", "hearts", "clubs"];
var face = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
var cards = [];
var yourHand = [];
var houseHand = [];
var dealed = false;
var under = true;
var blackjack = false;
var bust = false;
var playerTotal = 0;
var houseTotal = 0;
done = false;
var imgBack = document.createElement("img");
var dealerOne = document.createElement("img");

//Method calls used to setup the game
setCards(suit, face, cards);
shuffle(cards);

//function will create card objects by using the arrays of suits, face
//it will then add each card object to a cards stack
function setCards(suit, face, cards){
    var i;
    var j;
    var x=0;
    var y=0;
    console.log("Setting up the deck...");
    for(i = 0; i < suit.length; i++){ 
        x=0;
        for(j = 0; j < face.length; j++){
            var tempSuit = suit[y];
            var tempFace = face[x];
            var tempCard = {face:tempFace, suit:tempSuit};
            cards.push(tempCard);
            x++;
        }
        y++;
    }
}//end of setCards()

//function will take the cards stack and will mix the cards in 
//a random order. 
function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}//end of shuffle()

//run function by clicking the "deal hand" button
function dealCards(){
    if(!dealed){
        yourHand.push(cards.pop());
        houseHand.push(cards.pop());
        yourHand.push(cards.pop());
        houseHand.push(cards.pop());
        displayCards(yourHand);
        dealed = true;
    }
    check(yourHand);
    displayDealer(houseHand);
}//end of dealCards

//run function by clicking the "hit me" button
function hitMe(){
    if(dealed && under){
        var deal = cards.pop();
        yourHand.push(deal);
        tempArr = [deal];
        displayCards(tempArr);
    }
    check(yourHand);
}//end of hitMe()

//run function by clicking the "done" button
function allDone(){
    under = false;
    done = true;
    displayDealer(houseHand);
    dealerLogic(houseHand);
}//end of allDone()

function check(arr){
    var x = 0;
    var total = 0;
    for(var i = 0; i < arr.length; i++){
        if(arr[x].face == 'jack' || arr[x].face == 'queen' || arr[x].face == 'king') {
            total += 10;
        }
        
        else if(arr[x].face == 'ace' && total+11 <= 21){
            total += 11;
        } 
        else if(arr[x].face == 'ace' && total+11 > 21) {
            total += 1;
        }
        
        else {
            total += parseInt(arr[x].face);
        }
        x++; 
        
    }
    playerTotal = total;
    document.getElementById("hand").innerHTML = "Your hand:"+playerTotal;
    console.log("Current total is: "+playerTotal);
    if(total == 21){
        under = false;
        blackjack = true;
        var h = document.createElement("H1")                // Create a <h1> element
        var t = document.createTextNode("Blackjack!");     // Create a text node
        h.appendChild(t);
        document.body.appendChild(h);
    }
    if(total > 21){
        bust = true;
        under = false;
        var h = document.createElement("H1")                // Create a <h1> element
        var t = document.createTextNode("Busted");     // Create a text node
        h.appendChild(t);
        document.body.appendChild(h);
    }
}





function displayCards(arr){
    x = 0;
    for(i = 0; i < arr.length; i++){
        var img = document.createElement("img");
        img.src = 'PNG-cards-1.3/'+arr[x].face+"_of_"+arr[x].suit+'.png';
        img.width = 75;
        document.body.appendChild(img);
        x++;
    }
    
}

function dealerLogic(arr){
    console.log(arr);
    var x = 0;
    var total = 0;
    for(var i = 0; i < arr.length; i++){
        if(arr[x].face == 'jack' || arr[x].face == 'queen' || arr[x].face == 'king') {
            total += 10;
        }
        
        else if(arr[x].face == 'ace' && total+11 <= 21){
            total += 11;
        } 
        else if(arr[x].face == 'ace' && total+11 > 21) {
            total += 1;
        }
        
        else{
            total += parseInt(arr[x].face);
        }
        x++; 
        
    }
    houseTotal = total;
    console.log("Dealer total is: "+houseTotal);
    document.getElementById("dealer").innerHTML = "Dealer hand:"+houseTotal;
    if(houseTotal < 17 && houseTotal < playerTotal){
        setTimeout(dealerHit, 1500)
    }
    
}

function dealerHit(){
    var deal = cards.pop();
    houseHand.push(deal);
    tempArr = [deal];
    displayDealer(tempArr);
}

function displayDealer(arr){
    if(done){
        x = 0;
        try{
            document.body.removeChild(imgBack);
            document.body.removeChild(dealerOne);
        }catch(err){
            console.log(err.message);
        }
        for(i = 0; i < arr.length; i++){
            var img = document.createElement("img");
            img.src = 'PNG-cards-1.3/'+arr[x].face+"_of_"+arr[x].suit+'.png';
            img.width = 75;
            document.body.prepend(img);
            x++;
        }
    }else{
        dealerOne.src = 'PNG-cards-1.3/'+arr[0].face+"_of_"+arr[0].suit+'.png';
        dealerOne.width = 75;
        document.body.prepend(dealerOne);
        imgBack.src = 'PNG-cards-1.3/card_back.png';
        imgBack.width = 75;
        document.body.prepend(imgBack);
    }
}