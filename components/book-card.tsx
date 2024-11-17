"use client";

import { useState } from "react";
import { Book } from "@/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookCard({ author, id, imgUrl, title }: Book) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = {
      id,
      title: updatedTitle,
      author: updatedAuthor,
      imgUrl,
    };
    try {
      const response = await fetch(`/api/books`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      if (response.ok) {
        router.refresh()
        setIsUpdateDialogOpen(false);
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/books`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        router.refresh()

        console.log("Book deleted successfully");
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <Card className="h-full w-full max-w-sm">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1 mt-2">
          {author}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between">
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Update</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={updatedAuthor}
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
