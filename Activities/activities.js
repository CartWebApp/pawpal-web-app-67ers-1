const foodInput = document.getElementById("foodinput");
const addFoodBtn = document.getElementById("addfoodbtn");
const foodList = document.getElementById("foodlist");

// Add food item when clicking "Add" button
addFoodBtn.addEventListener("click", () => {
  const food = foodInput.value.trim();
  if (food === "") {
    alert("Please enter a food item.");
    return;
  }

  // Create new <p> for the food entry
  const item = document.createElement("p");
  item.textContent = `${food} just now`;

  // Add to top of list
  foodList.prepend(item);

  // Clear input
  foodInput.value = "";
});