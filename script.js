// Cheat variables for testing
let cheats = false;

// HTML element based variables
let countValue = document.getElementById('count-value');
let mainButton = document.getElementById('main-button');


// Stats Variables
let statsButton = document.querySelector('.stats-button');
let statsMenu = document.getElementById('stats-menu');
let closeStatsButton = document.getElementById('close-stats');
let statsClickCount = 0;
let statsUpgradeCount = 0;
let overlay = document.querySelector('.overlay');

// Normal variables
let count = 0;
let countMultiplier = 1;

// Main count increment function
mainButton.addEventListener('click', () => {
    count += (1 * countMultiplier);
    updateCount();
    statsClickCount++;
    clickSound.cloneNode().play()
});

// Main count update function
let updateCount = () => {
    countValue.innerHTML = count;

    // Update the color of upgrade costs
    let upgradeCosts = document.querySelectorAll('.upgrade-cost');
    upgradeCosts.forEach((costElement, index) => {
        let upgradeCost = parseInt(costElement.innerText); // Assuming cost is displayed as text
        if (count >= upgradeCost) {
            costElement.style.color = 'green'; // Set color to green if affordable
        } else {
            costElement.style.color = 'red'; // Set color to red if not affordable
        }
    });
}

// Upgrade class definition
class Upgrade {
    constructor(buttonId, wrapperId, cost, upgradeCallback) {
        this.button = document.getElementById(buttonId);
        this.wrapper = document.getElementsByClassName('upgrade-wrapper')[wrapperId - 1];
        this.cost = cost;
        this.upgradeCallback = upgradeCallback;

        this.button.addEventListener('click', () => {
            if (count < this.cost) return;

            this.upgradeCallback();
            count -= this.cost;
            countValue.innerHTML = count;
            this.wrapper.style.display = 'none';
            statsUpgradeCount++;
            upgradePurchased.cloneNode().play()

            // Show the next upgrade
            this.nextWrapperId = wrapperId;
            this.showNextUpgrade();

        });
    }

    showNextUpgrade() {
        const nextWrapperId = this.nextWrapperId;
        if (nextWrapperId < document.getElementsByClassName('upgrade-wrapper').length) {
            const nextUpgradeWrapper = document.getElementsByClassName('upgrade-wrapper')[nextWrapperId];
            nextUpgradeWrapper.style.display = 'block';
        }
    }
}

//NOTE - To create an upgrade, put the 'upgrade(num)' class from the html, along with the number beside it(for now), the cost and the effect

new Upgrade('upgrade1', 1, 100, () => { countMultiplier++; });
new Upgrade('upgrade2', 2, 500, () => { countMultiplier++; });

// Stats functions
// TODO - create function modularity, like the upgrade class but for stats
statsButton.addEventListener('click', () => {
    if (statsMenu.style.display === 'block') {
        statsMenu.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        statsMenu.style.display = 'block';
        overlay.style.display = 'block';
        document.getElementById('total-clicks').innerHTML = "Total Clicks: " + statsClickCount;
        document.getElementById('total-upgrades').innerHTML = "Total Upgrades: " + statsUpgradeCount;
    }
});

closeStatsButton.addEventListener('click', () => {
    statsMenu.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    statsMenu.style.display = 'none';
    overlay.style.display = 'none';
});

// Audio Control
const clickSound = document.getElementById('click-sound');
const upgradePurchased = document.getElementById('upgrade-purchased');

// Cheat menu
if (cheats) {
    document.getElementById('cheats-display').style.display = "block";
    count = 99999;
    countMultiplier = 100;
    countValue.innerHTML = count;  // Ensure the displayed value is updated
    console.log("Cheat code activated: count set to " + count);  // Debugging line
}

//!SECTION- This happens on page load
    document.addEventListener('DOMContentLoaded', updateCount);