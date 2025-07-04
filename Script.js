// Initialisation de l'argent et des bus débloqués
let money = parseInt(localStorage.getItem("money")) || 0;
let unlockedBuses = JSON.parse(localStorage.getItem("unlockedBuses")) || [];

// Sélection des éléments HTML
const moneyDisplay = document.getElementById("money");
const unlockedList = document.getElementById("unlocked-buses");
const storeDiv = document.getElementById("bus-store");

// Liste des bus disponibles à l'achat
const buses = [
  { name: "Mini Bus", cost: 300 },
  { name: "Bus Standard", cost: 600 },
  { name: "Bus Articulé", cost: 1200 },
  { name: "Bus Électrique", cost: 2000 }
];

// Met à jour l'affichage du solde
function updateMoneyDisplay() {
  moneyDisplay.textContent = money.toLocaleString() + " €";
  localStorage.setItem("money", money);
}

// Met à jour la liste des bus débloqués
function updateUnlockedBuses() {
  unlockedList.innerHTML = "";
  unlockedBuses.forEach(bus => {
    const li = document.createElement("li");
    li.textContent = bus;
    unlockedList.appendChild(li);
  });
  localStorage.setItem("unlockedBuses", JSON.stringify(unlockedBuses));
}

// Crée les boutons d'achat pour les bus
function createBusStore() {
  storeDiv.innerHTML = "";
  buses.forEach(bus => {
    const btn = document.createElement("button");
    btn.textContent = `Débloquer ${bus.name} - ${bus.cost} €`;
    btn.disabled = money < bus.cost || unlockedBuses.includes(bus.name);
    btn.onclick = () => {
      if (money >= bus.cost && !unlockedBuses.includes(bus.name)) {
        money -= bus.cost;
        unlockedBuses.push(bus.name);
        updateMoneyDisplay();
        updateUnlockedBuses();
        createBusStore();
      }
    };
    storeDiv.appendChild(btn);
  });
}

// Clique sur le bouton pour faire une ligne de bus
document.getElementById("run-line").addEventListener("click", () => {
  money += 10000;
  updateMoneyDisplay();
  createBusStore();
});

// Démarrage
updateMoneyDisplay();
updateUnlockedBuses();
createBusStore();
