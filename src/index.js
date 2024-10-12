document.addEventListener("DOMContentLoaded", main);

// Function Declarations
function main() {
  displayRamens(); 
  addSubmitListener(); 
}

const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const detailName = document.querySelector('.name');
  const detailRestaurant = document.querySelector('.restaurant');
  const detailRating = document.querySelector('#rating-display');
  const detailComment = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  detailName.innerText = ramen.name;
  detailRestaurant.innerText = ramen.restaurant;
  detailRating.innerText = ramen.rating.toString(); 
  detailComment.innerText = ramen.comment; 
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('new-name').value.trim();
      const restaurant = document.getElementById('new-restaurant').value.trim();
      const image = document.getElementById('new-image').value.trim();
      const rating = document.getElementById('new-rating').value.trim();
      const comment = document.getElementById('new-comment').value.trim();

      if (!name || !restaurant || !image || !rating || !comment) {
          alert("All fields must be filled out!");
          return;
      }

      const newRamen = { name, restaurant, image, rating, comment };
      addRamenToMenu(newRamen); // Add the new ramen to the menu
      handleClick(newRamen); // Immediately show its details
      form.reset(); // Reset the form after submission
  });
};
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then(response => response.json())
  .then(ramens => {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = ''; // Clear previous images if necessary
    ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image; // Ensure this is correct
      img.alt = ramen.name;
      img.addEventListener('click', () => handleClick(ramen));
      ramenMenu.appendChild(img);
    });
  })
  .catch(error => console.error('Error fetching ramens:', error));
};

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;

  // Attach click event to the new ramen image
  img.addEventListener('click', () => handleClick(ramen));
  ramenMenu.appendChild(img);
};
// Export functions for testing (if needed)
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
