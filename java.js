function searchMov() {
  $("#movlist").empty();

  $.ajax({
    url: "https://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "b669f823",
      s: $("#search_input").val().trim(),
    },
    success: function (result) {
      if (result.Response === "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movlist").append(
            `
              <div class="p-3">
     <div class="card" style="width: 18rem;">
                <img src="${data.Poster}" class="card-img-top" alt="Movie Poster">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <p class="card-text">Year: ${data.Year}, Type: ${data.Type}</p>
                  <button class="btn btn-primary see_detail" target="_blank" data-toggle="modal"
      data-target="#exampleModal" data-id='` +
              data.imdbID +
              `'>View Detail</button>
                </div>
              </div>
        </div>
           
            `
          );
        });
        console.log(movies);
      } else {
        $("#movlist").html(`<h2>${result.Error}</h2>`);
      }
    },
    error: function (xhr, status, error) {
      $("#movlist").html(`<h2>Error: ${error}</h2>`);
    },
  });
}
$("#button_search").on("click", function () {
  // Clear previous search results
  searchMov();
});

// Clear search input after search
$("#search_input").val("");
$("#search_input").on("keyup", function (r) {
  if (r.keyCode === 13) {
    searchMov();
  }
});

$("#movlist").on("click", ".see_detail", function () {
  $.ajax({
    url: "https://www.omdbapi.com/",
    type: "get",
    dataType: "json",
    data: {
      apikey: "b669f823",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(`
          <div class='container-fluid'>
            <div class='row'>  
              <div class='col-md-4'>
                <img src='${movie.Poster}' class='img-fluid'>
              </div> 
              <div class='col-md-8'>
                <ul class="list-group">
                  <li class="list-group-item"><strong>Title:</strong> ${movie.Title}</li>
                  <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                  <li class="list-group-item"><strong>Year:</strong> ${movie.Year}</li>
                  <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                  <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                </ul>
              </div>
            </div>
          </div>
        `);
      } else {
        $(".modal-body").html("<p>Error: Unable to fetch movie details.</p>");
      }
    },
    error: function (xhr, status, error) {
      $(".modal-body").html(`<p>Error: ${error}</p>`);
    },
  });
});
