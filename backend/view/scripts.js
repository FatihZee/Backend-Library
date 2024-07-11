const apiUrl = "http://localhost:5000/api/books";

async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const booksGrid = document.getElementById("booksGrid");
    booksGrid.innerHTML = "";
    books.forEach((book) => {
      booksGrid.innerHTML += `
                <div class="book-card">
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                    <p class="price">Rp ${book.price}</p>
                    <div class="action-buttons">
                        <button onclick="deleteBook('${book.id}')">Hapus</button>
                        <button onclick="showEditForm('${book.id}', '${book.title}', '${book.author}', '${book.publishedDate}', '${book.pages}', '${book.image}')">Edit</button>
                    </div>
                </div>
            `;
    });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

async function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publishedDate = document.getElementById("publishedDate").value;
  const pages = document.getElementById("pages").value;
  const image = document.getElementById("image").files[0];

  if (!title || !author) {
    alert("Judul dan Penulis harus diisi!");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("publishedDate", publishedDate);
  formData.append("pages", pages);
  formData.append("image", image);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      showBookListPage(); // Panggil fungsi untuk menampilkan halaman daftar buku
      fetchBooks();
    } else {
      console.error("Failed to create book");
    }
  } catch (error) {
    console.error("Error creating book:", error);
  }
}

function showAddBookPage() {
  document.getElementById("bookListPage").style.display = "none";
  document.getElementById("addBookPage").style.display = "block";
}

function showBookListPage() {
  document.getElementById("addBookPage").style.display = "none";
  document.getElementById("bookListPage").style.display = "block";
}

async function deleteBook(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchBooks();
    } else {
      console.error("Failed to delete book");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}

function showEditForm(id, title, author, publishedDate, pages, image) {
  document.getElementById("editId").value = id;
  document.getElementById("editTitle").value = title;
  document.getElementById("editAuthor").value = author;
  document.getElementById("editPublishedDate").value = publishedDate;
  document.getElementById("editPages").value = pages;
  document.getElementById("editForm").style.display = "block";
}

function hideEditForm() {
  document.getElementById("editForm").style.display = "none";
}

async function updateBook() {
  const id = document.getElementById("editId").value;
  const title = document.getElementById("editTitle").value;
  const author = document.getElementById("editAuthor").value;
  const publishedDate = document.getElementById("editPublishedDate").value;
  const pages = document.getElementById("editPages").value;
  const image = document.getElementById("editImage").files[0];

  if (!title || !author) {
    alert("Judul dan Penulis harus diisi!");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("author", author);
  formData.append("publishedDate", publishedDate);
  formData.append("pages", pages);
  if (image) {
    formData.append("image", image);
  }

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      body: formData,
    });
    if (response.ok) {
      hideEditForm();
      fetchBooks();
    } else {
      console.error("Failed to update book");
    }
  } catch (error) {
    console.error("Error updating book:", error);
  }
}

fetchBooks();
