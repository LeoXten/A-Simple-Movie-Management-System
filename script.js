document.addEventListener("DOMContentLoaded", function () {
    const movieForm = document.getElementById("movieForm");
    const movieList = document.getElementById("movieList");
    const searchBox = document.getElementById("searchBox");
    
    function loadMovies() {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movieList.innerHTML = "";
        
        if (movies.length === 0) {
            movieList.innerHTML = "<tr><td colspan='7'>No movies added yet</td></tr>";
            return;
        }
        
        movies.forEach((movie, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${movie.name}</td>
                <td>${movie.description}</td>
                <td>${movie.year}</td>
                <td>${movie.rating}</td>
                <td>${movie.genre}</td>
                <td><img src="${movie.poster}" alt="Movie Poster" width="50"></td>
                <td><button onclick="deleteMovie(${index})">Delete</button></td>
            `;
            movieList.appendChild(row);
        });
    }
    
    if (movieForm) {
        movieForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value;
            const description = document.getElementById("description").value;
            const genre = document.getElementById("genre").value;
            const rating = document.getElementById("rating").value;
            const year = document.getElementById("year").value;
            const poster = document.getElementById("poster").value;
            
            const movie = { name, description, genre, rating, year, poster };
            const movies = JSON.parse(localStorage.getItem("movies")) || [];
            movies.push(movie);
            localStorage.setItem("movies", JSON.stringify(movies));
            
            alert("Movie added successfully!");
            movieForm.reset();
            loadMovies();
        });
    }
    
    window.deleteMovie = function (index) {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies.splice(index, 1);
        localStorage.setItem("movies", JSON.stringify(movies));
        loadMovies();
    };
    
    if (movieList) {
        loadMovies();
    }
    
    searchBox.addEventListener("input", function () {
        const searchText = searchBox.value.toLowerCase();
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movieList.innerHTML = "";
        
        const filteredMovies = movies.filter(movie => 
            movie.name.toLowerCase().includes(searchText) || 
            movie.genre.toLowerCase().includes(searchText) || 
            movie.year.includes(searchText)
        );
        
        if (filteredMovies.length === 0) {
            movieList.innerHTML = "<tr><td colspan='7'>No matching movies found</td></tr>";
            return;
        }
        
        filteredMovies.forEach((movie, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${movie.name}</td>
                <td>${movie.description}</td>
                <td>${movie.year}</td>
                <td>${movie.rating}</td>
                <td>${movie.genre}</td>
                <td><img src="${movie.poster}" alt="Movie Poster" width="50"></td>
                <td><button onclick="deleteMovie(${index})">Delete</button></td>
            `;
            movieList.appendChild(row);
        });
    });
});
