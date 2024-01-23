let points = 0;
    let originalValue = 1; // Original value before upgrades
    let upgrades = [
      { name: "Grandma", cost: 10, addedPoints: 1, count: 0 },
      { name: "Oven", cost: 100, addedPoints: 10, count: 0 },
      { name: "Factory", cost: 1000, addedPoints: 100, count: 0 },
      { name: "Mine", cost: 10000, addedPoints: 1000, count: 0 },
      { name: "Bank", cost: 100000, addedPoints: 10000, count: 0 }
    ];

    // Load points and upgrades from localStorage on page load
    window.onload = function() {
      if (localStorage.getItem("cookieClickerPoints")) {
        points = parseInt(localStorage.getItem("cookieClickerPoints"));
        updatePoints();
      }
      if (localStorage.getItem("cookieClickerUpgrades")) {
        upgrades = JSON.parse(localStorage.getItem("cookieClickerUpgrades"));
        updateUpgradeButtons();
      }
    };

    function clickCookie() {
      points += originalValue;
      updatePoints();
    }

    function updatePoints() {
      document.getElementById("points").innerText = "Points: " + points;
      // Update localStorage
      localStorage.setItem("cookieClickerPoints", points);
    }

    function buyUpgrade(upgradeIndex) {
      if (points >= upgrades[upgradeIndex].cost) {
        points -= upgrades[upgradeIndex].cost;
        originalValue += upgrades[upgradeIndex].addedPoints; // Add points to original value
        upgrades[upgradeIndex].count++; // Increment the upgrade count
        updatePoints();
        updateUpgradeButtons(); // Update the upgrade buttons after purchase
        // Update localStorage
        localStorage.setItem("cookieClickerUpgrades", JSON.stringify(upgrades));
      } else {
        alert("Not enough points to buy the upgrade!");
      }
    }

    function updateUpgradeButtons() {
      const upgradeButtonsDiv = document.getElementById("upgradeButtons");
      upgradeButtonsDiv.innerHTML = ""; // Clear existing buttons

      for (let i = 0; i < upgrades.length; i++) {
        const upgradeButton = document.createElement("button");
        upgradeButton.textContent = `${upgrades[i].name} (Cost: ${upgrades[i].cost} points, Adds: ${upgrades[i].addedPoints} to original value) - Bought: ${upgrades[i].count}`;
        upgradeButton.onclick = function() {
          buyUpgrade(i);
        };
        upgradeButtonsDiv.appendChild(upgradeButton);
      }
    }

    function resetGame() {
      // Reset points, original value, and upgrades
      points = 0;
      originalValue = 1;
      upgrades.forEach(upgrade => {
        upgrade.count = 0; // Reset upgrade counts
      });
      updatePoints();
      updateUpgradeButtons();
      // Clear localStorage
      localStorage.removeItem("cookieClickerPoints");
      localStorage.removeItem("cookieClickerUpgrades");
    }

    // Initialize the upgrade buttons
    updateUpgradeButtons();

    // Add a timer to increase points automatically every second
    setInterval(function() {
      points += originalValue;
      updatePoints();
    }, 1000);