let balance = 100000; // Initial balance
const symbols = ['🍒', '🍋', '🍊', '🍉', '⭐', '💰'];
const payouts = {
    '🍒': 2,
    '🍋': 3,
    '🍊': 4,
    '🍉': 5,
    '⭐': 10,
    '💰': 20
};

document.getElementById('spinButton').addEventListener('click', spin);
document.getElementById('resetButton').addEventListener('click', resetGame);

function spin() {
    const betAmount = parseInt(document.getElementById('betAmount').value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        alert('Please enter a valid bet amount.');
        return;
    }

    // Deduct bet amount from balance
    balance -= betAmount;
    document.getElementById('balance').innerText = balance;
    document.getElementById('message').innerText = '';

    // Play spin sound
    document.getElementById('spinSound').play();

    // Spin the slots with animation
    const slot1 = document.getElementById('slot1');
    const slot2 = document.getElementById('slot2');
    const slot3 = document.getElementById('slot3');

    // Randomly select symbols for each slot
    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    // Display spinning animation
    slot1.innerText = '🔄';
    slot2.innerText = '🔄';
    slot3.innerText = '🔄';

    setTimeout(() => {
        slot1.innerText = result1;
        slot2.innerText = result2;
        slot3.innerText = result3;

        // Check for winnings
        checkWin(result1, result2, result3, betAmount);
    }, 1000); // Delay for 1 second to simulate spinning
}

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkWin(result1, result2, result3, betAmount) {
    if (result1 === result2 && result2 === result3) {
        const winAmount = betAmount * payouts[result1];
        balance += winAmount;
        document.getElementById('balance').innerText = balance;
        document.getElementById('message').innerText = `You win $${winAmount}! 🎉`;
        document.getElementById('winSound').play();
    } else {
        document.getElementById('message').innerText = 'You lose! Try again! 😢';
    }

    // Check for game over condition
    if (balance <= 0) {
        document.getElementById('message').innerText = 'Game Over! Please reset to play again.';
        document.getElementById('spinButton').disabled = true; // Disable spin button
    } else {
        document.getElementById('spinButton').disabled = false; // Enable spin button
    }
}

function resetGame() {
    balance = 100000; // Reset balance to initial value
    document.getElementById('balance').innerText = balance;
    document.getElementById('betAmount').value = ''; // Clear bet input
    document.getElementById('message').innerText = ''; // Clear message
    document.getElementById('spinButton').disabled = false; // Enable spin button
}