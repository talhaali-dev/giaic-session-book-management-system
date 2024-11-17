import BookCard from "@/components/book-card";
import CreateBookForm from "@/components/book-form";
import { Book } from "@/data";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/books");
  const data: Book[] = await res.json();
  return (
    <div className="container mx-auto px-4 gap-4 py-8">
      <CreateBookForm  />
      <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((book) => (
          <BookCard
            key={book.id}
            author={book.author}
            imgUrl={book.imgUrl}
            title={book.title}
            id={book.id}
          />
        ))}
      </div>
    </div>
  );
}
