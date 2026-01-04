// Sample data (matching backend mock)
const inventoryData = [
  { item: "Paracetamol", location: "Clinic A", stock: 35, days_left: 4 },
  { item: "Rice", location: "Warehouse 1", stock: 120, days_left: 10 },
  { item: "Oxygen Cylinder", location: "Hospital B", stock: 5, days_left: 2 },
  { item: "Milk", location: "Store C", stock: 50, days_left: 7 },
];

// Populate inventory table
const tableBody = document.querySelector("#inventory-table tbody");
inventoryData.forEach(row => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${row.item}</td>
    <td>${row.location}</td>
    <td>${row.stock}</td>
    <td>${row.days_left}</td>
  `;
  tableBody.appendChild(tr);
});

// Populate alerts
const alertsList = document.getElementById("alerts-list");
inventoryData.forEach(row => {
  if(row.days_left <= 5){
    const li = document.createElement("li");
    li.textContent = `⚠️ ${row.item} at ${row.location} running low (${row.days_left} days left)`;
    alertsList.appendChild(li);
  }
});
