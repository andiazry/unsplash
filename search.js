const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");

const searchUnsplash = function(term) {
  alert(term);
};

// when submit form, get info from input

formTag.addEventListener("submit", function(event) {
  // get the info from input
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm);

  // stop the form from loading next page
  event.preventDefault();
});
