import { Book, books } from "@/data"; // Importing the Book interface and books array from the specified module

// Handler for GET requests
export async function GET() {
  // Returns the books array as a JSON response with a 200 status code
  return new Response(JSON.stringify(books), { status: 200 });
}

// Handler for POST requests
export async function POST(request: Request) {
  try {
    // Parse the JSON body of the request to get the new book details, excluding the id
    const newBook: Omit<Book, "id"> = await request.json();

    // Assign a unique ID to the new book (incrementing based on the current books array length)
    const bookWithId: Book = { ...newBook, id: books.length + 1 };

    // Add the new book to the books array
    books.push(bookWithId);

    // Respond with a success message and the newly added book
    return new Response(
      JSON.stringify({ message: "Book added!", book: bookWithId }),
      { status: 201 } // Status 201 indicates a resource was successfully created
    );
  } catch {
    // Catch and handle errors related to invalid JSON input
    return new Response(JSON.stringify({ message: "Invalid JSON input" }), {
      status: 400, // Status 400 indicates a bad request
    });
  }
}

// Handler for PUT requests (update a book's details)
export async function PUT(request: Request) {
  try {
    // Parse the JSON body of the request to get the book ID and the updated details
    const { id, ...updatedBook } = await request.json();

    // Find the index of the book to update in the books array
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex !== -1) {
      // If the book exists, update its details
      books[bookIndex] = { ...books[bookIndex], ...updatedBook };

      // Respond with a success message and the updated book
      return new Response(
        JSON.stringify({ message: "Book updated!", book: books[bookIndex] }),
        { status: 200 } // Status 200 indicates a successful operation
      );
    } else {
      // If the book is not found, return a 404 response
      return new Response(JSON.stringify({ message: "Book not found!" }), {
        status: 404,
      });
    }
  } catch {
    // Catch and handle errors related to invalid JSON input
    return new Response(JSON.stringify({ message: "Invalid JSON input" }), {
      status: 400, // Status 400 indicates a bad request
    });
  }
}

// Handler for DELETE requests
export async function DELETE(request: Request) {
  // Parse the JSON body of the request to get the ID of the book to delete
  const { id }: { id: number } = await request.json();

  // Find the index of the book to delete in the books array
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex !== -1) {
    // If the book exists, remove it from the books array
    const deletedBook = books.splice(bookIndex, 1); // Splice removes the book and returns it

    // Respond with a success message and the deleted book
    return new Response(
      JSON.stringify({ message: "Book deleted!", book: deletedBook[0] }),
      { status: 200 } // Status 200 indicates a successful operation
    );
  } else {
    // If the book is not found, return a 404 response
    return new Response(JSON.stringify({ message: "Book not found!" }), {
      status: 404,
    });
  }
}
