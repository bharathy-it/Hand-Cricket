let player1Name, player2Name;
let tossWinner = '';
let currentBatter = ''; // To track who is currently batting
let totalRunsPlayer1 = 0; // Player 1 total score
let totalRunsPlayer2 = 0; // Player 2 total score
let isPlayer1Batting = true; // Flag to track which player is batting
let targetRuns = 0; // Target for the second player

// Field page button
document.getElementById('first_btn').addEventListener('click', function() {
    player1Name = document.getElementById('player_1').value;
    player2Name = document.getElementById('player_2').value;

    if (player1Name && player2Name) {
        document.getElementById('main_page').style.display = 'none';
        document.getElementById('target_section').style.display = 'block';
    } else {
        alert("The Players' names were not included");
    }
});

// Toss page
document.getElementById('toss_btn').addEventListener('click', function() {
    tossWinner = Math.random() < 0.5 ? player1Name : player2Name;
    currentBatter = tossWinner; // Set the toss winner as the current batter
    document.getElementById('toss_result').textContent = `${tossWinner} won the toss and will bat first.`;
});

// Game start button
document.getElementById('game_btn').addEventListener('click', function() {
    document.getElementById('target_section').style.display = 'none';
    document.getElementById('game_page').style.display = 'block';

    // Display who is batting
    document.getElementById('batting_player').textContent = `${tossWinner} is batting now.`;

    // Display both players' names
    document.getElementById('player1_display').textContent = `${player1Name}: `;
    document.getElementById('player2_display').textContent = `${player2Name}: `;

    // Set the initial total runs to 0
    document.getElementById('batting_player_name').textContent = tossWinner;
    document.getElementById('batting_player_total').textContent = 0;
});

// Function to set the image based on the random number
function setImageForNumber(number) {
    switch (number) {
        case 0: return 'images/zero.png';
        case 1: return 'images/one.png';
        case 2: return 'images/two.png';
        case 3: return 'images/three.png';
        case 4: return 'images/four.png';
        case 5: return 'images/five.png';
        case 6: return 'images/six.png';
        default: return 'default.png'; // fallback image if necessary
    }
}

// Play button (Generate random images)
document.getElementById('play_btn').addEventListener('click', function() {
    // Generate random numbers between 0 and 6 for both players
    let player1Number = Math.floor(Math.random() * 7);
    let player2Number = Math.floor(Math.random() * 7);

    // Get the image path for each player
    let player1Image = setImageForNumber(player1Number);
    let player2Image = setImageForNumber(player2Number);

    // Display the images instead of numbers
    document.getElementById('player1_img').src = player1Image;
    document.getElementById('player2_img').src = player2Image;

    // Check if both numbers are the same (batsman is out)
    if (player1Number === player2Number) {
        if (isPlayer1Batting) {
            document.getElementById('batting_player_total').textContent = totalRunsPlayer1;
            document.getElementById('out_message').textContent = `${currentBatter} is OUT for ${totalRunsPlayer1} runs!`;

            // Switch to the second player's batting
            isPlayer1Batting = false;
            currentBatter = (tossWinner === player1Name) ? player2Name : player1Name;
            targetRuns = totalRunsPlayer1 + 1; // Set the target runs for the second player

            // Update the display to show Player 2's batting details
            document.getElementById('batting_player').textContent = `${currentBatter} is batting now, needs ${targetRuns} to win.`;
            document.getElementById('batting_player_name').textContent = currentBatter;
            document.getElementById('batting_player_total').textContent = 0; // Reset display for Player 2’s runs
        } else {
            document.getElementById('batting_player_total').textContent = totalRunsPlayer2;
            document.getElementById('out_message').textContent = `${currentBatter} is OUT for ${totalRunsPlayer2} runs!`;

            // End the game and check who won
            if (totalRunsPlayer2 >= targetRuns) {
                document.getElementById('out_message').textContent = `${currentBatter} scored ${totalRunsPlayer2} and wins the match!`;
            } else {
                document.getElementById('out_message').textContent = `${currentBatter} is OUT for ${totalRunsPlayer2}. Failed to reach the target of ${targetRuns}.`;
            }

            // Disable the play button once the game is over
            document.getElementById('play_btn').disabled = true;
        }

        return; // Exit the function here to stop further run additions
    }

    // If Player 1 is batting
    if (isPlayer1Batting) {
        if (player1Number === 0) {
            totalRunsPlayer1 += player2Number; // Add player 2's score if player 1 gets 0
        } else {
            totalRunsPlayer1 += player1Number; // Add player 1's score otherwise
        }
        // Update the total runs display for Player 1
        document.getElementById('batting_player_total').textContent = totalRunsPlayer1;
    } 
    // If Player 2 is batting
    else {
        if (player2Number === 0) {
            totalRunsPlayer2 += player1Number; // Add player 1's score if player 2 gets 0
        } else {
            totalRunsPlayer2 += player2Number; // Add player 2's score otherwise
        }
        // Update the total runs display for Player 2
        document.getElementById('batting_player_total').textContent = totalRunsPlayer2;

        // Check if Player 2 has reached the target
        if (totalRunsPlayer2 >= targetRuns) {
            document.getElementById('out_message').textContent = `${currentBatter} scored ${totalRunsPlayer2} and wins the match!`;
            document.getElementById('play_btn').disabled = true; // Disable the play button after Player 2 wins
        }
    }
});

