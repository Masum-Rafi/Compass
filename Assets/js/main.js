document.getElementById("menuToggle").addEventListener("click", function () {
   document.getElementById("navbar").classList.toggle("show");
});

// Destination data
const destinations = [
  {
    name: "ঢাকা",
    img: "Assets/img/dhaka.jpg",
    desc: "বাংলাদেশের রাজধানী শহর"
  },
  {
    name: "কক্সবাজার",
    img: "Assets/img/coxsbazar.jpg",
    desc: "বিশ্বের দীর্ঘতম সমুদ্র সৈকত"
  },
  {
    name: "সুন্দরবন",
    img: "Assets/img/sundarban.jpg",
    desc: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন"
  },
  {
    name: "সাজেক ভ্যালি",
    img: "Assets/img/sajek.jpg",
    desc: "মেঘের রাজ্যে পাহাড়ি সৌন্দর্য"
  }
];

// Target the section
const destContainer = document.getElementById("popular-destinations");

// Function to render destinations
function renderDestinations(list) {
  destContainer.innerHTML = "";
  list.forEach(dest => {
    destContainer.innerHTML += `
      <div class="dest-card">
        <img src="${dest.img}" alt="${dest.name}">
        <h3>${dest.name}</h3>
        <p>${dest.desc}</p>
      </div>
    `;
  });
}

// Initial render
renderDestinations(destinations);

// Enable search from nav bar
document.addEventListener("input", function (e) {
  if (e.target.type === "search") {
    const query = e.target.value.toLowerCase();
    const filtered = destinations.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.desc.toLowerCase().includes(query)
    );
    renderDestinations(filtered);
  }
});

// Data fetch

  document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/destinations")
    .then(res => res.json())
    .then(data => {
      const destContainer = document.getElementById("popular-destinations");
      destContainer.innerHTML = "";
      data.forEach(dest => {
        destContainer.innerHTML += `
          <div class="dest-card">
            <img src="${dest.img}" alt="${dest.name}">
            <h3>${dest.name}</h3>
            <p>${dest.desc}</p>
          </div>
        `;
      });
    })
    .catch(err => console.error("Error fetching destinations:", err));
});

