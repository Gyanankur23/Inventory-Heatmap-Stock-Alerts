// script.js

// Your live Render backend URL
const API_BASE = "https://inventory-heatmap-stock-alerts.onrender.com";

// Fetch inventory from backend and populate table
fetch(`${API_BASE}/inventory`)
  .then(res => res.json())
  .then(data => {
    const inventory = data.data; // matches backend JSON
    const tableBody = document.querySelector("#inventory-table tbody");

    inventory.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.item}</td>
        <td>${row.location}</td>
        <td>${row.stock}</td>
        <td>${row.days_until_out_of_stock}</td>
      `;
      tableBody.appendChild(tr);
    });

    // Populate stock-out alerts
    const alertsList = document.getElementById("alerts-list");
    inventory.forEach(row => {
      if (row.days_until_out_of_stock <= 5) {
        const li = document.createElement("li");
        li.textContent = `⚠️ ${row.item} at ${row.location} running low (${row.days_until_out_of_stock} days left)`;
        alertsList.appendChild(li);
      }
    });
  })
  .catch(err => console.error("Error fetching inventory:", err));