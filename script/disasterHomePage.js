function openTab(evt, tabName) {
  const tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach(tab => tab.style.display = "none");

  const tablinks = document.querySelectorAll(".tab button");
  tablinks.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Show first tab by default
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".tab button").dispatchEvent(new Event("mouseover"));
});
