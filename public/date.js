const dateElement = document.getElementById("date");
const currentDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
dateElement.textContent = currentDate;
