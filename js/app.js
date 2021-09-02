document.getElementById("error-message").style.display = "none";
const searchBooks = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // input field clear
  searchField.velue = "";
  // load data form api
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  document.getElementById("search-result").textContent = "";
  document.getElementById("books-numbers").textContent = "";
  fetch(url)
    .then((ress) => ress.json())
    .then((books) => displaySearchResult(books));
};

const displayError = () => {
  document.getElementById("error-message").style.display = "block";
  document.getElementById("books-numbers").textContent = "";
};

// Display result in webpage
const displaySearchResult = (books) => {
  const booksData = books.docs;
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  // get every book form booksData
  document.getElementById("books-numbers").innerText = `Total Books Show: ${booksData.length} of ${books.numFound}`;
  if (booksData.length === 0) {
    displayError();
  } else {
    document.getElementById("error-message").style.display = "none";
    booksData.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" onError="this.onerror=null;this.src='images/bike-1.png';" class="w-50 h-50 mx-auto" alt="Nan">
                <div class="card-body">
                    <h5 class="card-title">Title: ${book.title} </h5>
                    <p class="card-text">Author Names: ${book.author_name}</p>
                    <p class="card-text">Publisher: ${book.publisher} </p>
                    <p class="card-text">First Publish: ${book.first_publish_year} </p>
                    
                </div>
                <div class = "card-footer">
                    <button class="btn btn-outline-dark" onclick="loadTeamDetail('')">Load More <i class="fas fa-arrow-right"></i></button> 
                </div>
            </div>
            `;
      searchResult.appendChild(div);
    });
  }
};
