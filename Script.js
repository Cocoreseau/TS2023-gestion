let money = localStorage.getItem("money") ? parseInt(localStorage.getItem("money")) : 0;
let unlockedBuses = JSON.parse(localStorage.getItem("unlockedBuses") || "[]");

const moneyDisplay = document.getElementById("money");
const unlockedList = document.getElementById("unlocked-buses");
const storeDiv = document.getElementById("bus-store");

// Liste des bus à débloquer
const buses = [
  { name: "Mini Bus", cost: 300 },
  { name: "Bus Standard", cost: 600 },
  { name: "Bus Articulé", cost: 1200 },
  { name: "Bus Électrique", cost: 2000 }
];

function updateMoneyDisplay() {
  moneyDisplay.textContent = money + " €";
  localStorage.setItem("money", money);
}

function updateUnlockedBuses() {
  unlockedList.innerHTML = "";
  unlockedBuses.forEach(bus => {
    const li = document.createElement("li");
    li.textContent = bus;
    unlockedList.appendChild(li);
  });
  localStorage.setItem("unlockedBuses", JSON.stringify(unlockedBuses));
}

function createBusStore() {
  storeDiv.innerHTML = "";
  buses.forEach(bus => {
    const btn = document.createElement("button");
    btn.textContent = `Débloquer ${bus.name} - ${bus.cost} €`;
    btn.disabled = money < bus.cost || unlockedBuses.includes(bus.name);
    btn.onclick = () => {
      if (money >= bus.cost) {
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

document.getElementById("run-line").addEventListener("click", () => {
  money += 100;
  updateMoneyDisplay();
  createBusStore();
});

updateMoneyDisplay();
updateUnlockedBuses();
createBusStore();
