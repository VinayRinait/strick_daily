const form = document.querySelector("#book-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent the form from submitting normally

  let image = form.image.value;
  let book_name = form.name.value;
  let author = form.author.value;
  let genre = form.genre.value;
  let edition = form.edition.value;
  let publisher = form.publisher.value;
  let cost = form.cost.value;
  let bookData = {
    image: image,
    book_name: book_name,
    author: author,
    genre: genre,
    edition: edition,
    publisher: publisher,
    cost: cost,
  };

  try {
    const response = await fetch("http://localhost:3000/Books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    alert("Book added successfully!");
    form.reset(); // clear the form
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
