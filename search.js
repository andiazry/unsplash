const formTag = document.querySelector("form");
const inputTag = formTag.querySelector("input");
const resultsTag = document.querySelector("section.results");

const accessKey =
  "53d8efb44a54b06df90ce59cc2226c229e923e18c8921a76f9deea475fdbeb9c";
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query=";

const searchUnsplash = function(term) {
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      Authorization: "Client-ID " + accessKey
    }
  })
    .then(response => response.json())
    .then(data => {
      // format results from unsplash
      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular,
          width: result.width,
          height: result.height,
          name: result.user.name,
          title: result.description || "Untitled",
          backgroundColor: (result.color || "#cccccc") + "33"
        };
      });
    });
};

// add results to the page
const addResults = function(results) {
  // remove all the loading tags
  resultsTag.innerHTML = "";

  // loop over results and add to results tag on page
  results.forEach(results => {
    resultsTag.innerHTML =
      resultsTag.innerHTML +
      `
      <div class="single-result">
        <div class="image" style="background-color: ${results.backgroundColor}">
          <img src="${results.imageSrc}"/>
        </div>
        <h2>${results.title}</h2>
        <p>${results.name} - ${results.width} x ${results.height}</p>
      </div>
      `;
  });
};

// when submit form, get info from input

formTag.addEventListener("submit", function(event) {
  // get the info from input
  const searchTerm = inputTag.value;

  searchUnsplash(searchTerm).then(results => {
    addResults(results);
  });

  // stop the form from loading next page
  event.preventDefault();
});
