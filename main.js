//This is called when the first AJAX request is fired.
$(document).ajaxStart(function(event, jqXHR) {
  //Show spinner
  $("body").css("cursor", "progress");
});

//This is called after all the AJAX request are stopped.
$(document).ajaxStop(function(event, jqXHR) {
  //Hide spinner
  $("body").css("cursor", "default");
});

var books = [
  
];

$('.search').on('click', function () {
  var search = $('#search-query').val();

  books = [];

  fetch(search);
});

var addBooks = function (data) {
  data.items.forEach(element => {
    var book = {
      title: element.volumeInfo.title || null,
      // ternary operator
      author: element.volumeInfo.authors ? element.volumeInfo.authors[0] : null,
      imageURL: element.volumeInfo.imageLinks ? element.volumeInfo.imageLinks.thumbnail : null,
      pageCount: element.volumeInfo.pageCount || null,
      isbn: element.volumeInfo.industryIdentifiers ?
        element.volumeInfo.industryIdentifiers[0].identifier : null
    };

    books.push(book);
  });
  renderBooks()
};

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};

var renderBooks = function () {
  $('.books').empty();

  for (var i = 0; i < books.length; i++) {
    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newBook = template(books[i]);
    $('.books').append(newBook);
  }
};