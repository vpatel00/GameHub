let deck, playerHand, dealerHand, playerScore, dealerScore;

function startGame() {
    deck = createDeck();
    shuffleDeck(deck);
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    renderHands();
    document.getElementById('message').textContent = '';
}

function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    return deck.pop();
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    hand.forEach(card => {
        if (card.value === 'A') {
            aces++;
            score += 11; // Initially count Ace as 11
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    });
    // Adjust for Aces if score exceeds 21
    while (score > 21 && aces) {
        score -= 10;
        aces--;
    }
    return score;
}

function renderHands() {
    const playerCardsDiv = document.getElementById('player-cards');
    const dealerCardsDiv = document.getElementById('dealer-cards');

    playerCardsDiv.innerHTML = '';
    dealerCardsDiv.innerHTML = '';

    // Render player's cards
    playerHand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.textContent = `${card.value}${card.suit}`;
        playerCardsDiv.appendChild(cardDiv);
    });

    // Render dealer's cards
    dealerHand.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        if (index === 0 && !gameOver) {
            // First card is face up only if the game is not over
            cardDiv.textContent = `${card.value}${card.suit}`;
        } else {
            // Second card is face down
            cardDiv.textContent = '🂠'; // You can use a back of card image here
        }
        dealerCardsDiv.appendChild(cardDiv);
    });

    // Update scores
    updateScoreDisplays();
}

function updateScoreDisplays() {
    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
    document.getElementById('dealer-score').textContent = `Dealer Score: ${dealerScore}`;
}

function hit() {
    if (playerScore < 21) {
        playerHand.push(drawCard());
        updateScores();
        renderHands();
        checkForEndGame();
    }
}

function stand() {
    // Reveal dealer's cards
    gameOver = true; // Set game over flag
    renderHands(); // Render hands to show dealer's first card
    while (dealerScore < 17) {
        dealerHand.push(drawCard());
        updateScores();
    }
    renderHands(); // Render hands again to show dealer's full hand
    checkForEndGame();
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
}

function checkForEndGame() {
    if (playerScore > 21) {
        document.getElementById('message').textContent = 'You bust! Dealer wins!';
    } else if (dealerScore > 21) {
        document.getElementById('message').textContent = 'Dealer busts! You win!';
    } else if (playerScore === 21) {
        document.getElementById('message').textContent = 'Blackjack! You win!';
    } else if (dealerScore >= 17) {
        if (playerScore > dealerScore) {
            document.getElementById('message').textContent = 'You win!';
        } else if (playerScore < dealerScore) {
            document.getElementById('message').textContent = 'Dealer wins!';
        } else {
            document.getElementById('message').textContent = 'It\'s a tie!';
        }
    }
}

// Event listeners for buttons
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('restart').addEventListener('click', startGame);

// Start the game when the page loads
let gameOver = false; // Flag to check if the game is over
startGame();