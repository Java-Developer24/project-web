// Data Initialization
const guides = [];
const usedTickets = new Set();
const totalTickets = 1000; // Increased ticket range for unique assignments

// List of random names for the guides
const randomNames = [
  "John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie White", "Emily Davis",
  "Michael Clark", "Sarah Lewis", "David Harris", "Sophia Walker", "James Allen", "Elizabeth Young",
  "Daniel Scott", "Mia King", "Henry Adams", "Grace Baker", "Lucas Nelson", "Amelia Carter",
  "Ethan Perez", "Sophie Mitchell", "Matthew Roberts", "Olivia Turner", "Benjamin Hill", "Isabella Moore",
  "Jacob Walker", "Ava King", "William Campbell", "Megan Harris", "Oliver Lopez", "Charlotte Nelson",
  "Samuel Turner", "Lily Clark", "Jack Robinson", "Harper Scott", "Alexander Lewis", "Madison Adams",
  "James Morgan", "Chloe Harris", "Jack Allen", "Ella Baker", "Lucas Martinez", "Mason Evans",
  "Samantha Cooper", "Daniel Allen", "Grace Harris", "Henry Johnson", "Amelia Nelson", "Liam Clark",
  "Victoria Young", "Ryan Carter", "Ella Mitchell", "Ethan Baker", "Natalie Walker"
];

// Generate unique tickets
function generateUniqueTickets(count) {
  const tickets = [];
  for (let i = 0; i < count; i++) {
    let ticket;
    do {
      ticket = Math.floor(Math.random() * totalTickets) + 1;
    } while (usedTickets.has(ticket));
    tickets.push(ticket);
    usedTickets.add(ticket);
  }
  return tickets;
}

// Create guides and assign tickets
for (let i = 0; i < 50; i++) {
  const tickets = generateUniqueTickets(8); // Assign 8 unique tickets per guide
  guides.push({
    id: i + 1,
    name: randomNames[i], // Assign a random name from the list
    tickets,
  });
}

// Update Admin Dashboard with guide and ticket details
const adminDashboard = document.getElementById("admin-dashboard");
const guideCountDisplay = document.getElementById("guide-count");
const ticketCountDisplay = document.getElementById("ticket-count");

// Populate admin dashboard
guideCountDisplay.textContent = guides.length;
ticketCountDisplay.textContent = usedTickets.size;

guides.forEach((guide) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${guide.id}</td>
    <td>${guide.name}</td>
    <td>${guide.tickets.join(", ")}</td>
  `;
  adminDashboard.appendChild(row);
});

// Contest Logic
const generateRandomButton = document.getElementById("generate-random");
const resultDisplay = document.getElementById("result");
const winners = new Set();

generateRandomButton.addEventListener("click", () => {
  if (winners.size >= 2) {
    resultDisplay.textContent = "The contest is over!";
    return;
  }

  let ticket, winnerGuide;
  do {
    ticket = Math.floor(Math.random() * totalTickets) + 1;
    winnerGuide = guides.find((guide) => guide.tickets.includes(ticket));
  } while (!winnerGuide || winners.has(winnerGuide.id));

  winners.add(winnerGuide.id);
  const prize = winners.size === 1 ? "Pulsar Bike" : "Activa";
  resultDisplay.textContent = `Winner ${winners.size}: ${winnerGuide.name} with Ticket number :${ticket}. Won the Prize: ${prize}`;
});

// Tab Switching Logic
const contestTab = document.getElementById("contest-tab");
const adminTab = document.getElementById("admin-tab");
const contestView = document.getElementById("contest-view");
const adminView = document.getElementById("admin-view");

contestTab.addEventListener("click", () => {
  contestTab.classList.add("active");
  adminTab.classList.remove("active");
  contestView.style.display = "block";
  adminView.style.display = "none";
});

adminTab.addEventListener("click", () => {
  adminTab.classList.add("active");
  contestTab.classList.remove("active");
  contestView.style.display = "none";
  adminView.style.display = "block";
});
