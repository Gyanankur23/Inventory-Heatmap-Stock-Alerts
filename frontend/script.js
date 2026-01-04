// Your Render backend URL
const API_BASE = "https://inventory-heatmap-stock-alerts.onrender.com";

// Fetch inventory from backend
fetch(`${API_BASE}/inventory`)
  .then(res => res.json())
  .then(data => {
    const inventory = data.data;
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

    // Populate alerts
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

// Navigation between sections
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-target");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(target).classList.add("active");
  });
});

// Activate first section by default
document.getElementById("heatmap-section").classList.add("active");