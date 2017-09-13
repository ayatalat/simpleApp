
var fs = require('fs');

var cardStore = {};
cardStore.cards = {};
cardStore.initialize = () => {
    cardStore.cards = loadCards();
}

function loadCards() {
    let file = fs.readFileSync('./cards.json');
    return JSON.parse(file.toString());
}

module.exports=cardStore;