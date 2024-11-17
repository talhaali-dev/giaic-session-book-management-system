"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function CreateBookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, imgUrl }),
      })

      if (response.ok) {
        setTitle("")
        setAuthor("")
        setImgUrl("")
        router.refresh()
      } else {
        console.error("Failed to create book")
      }
    } catch (error) {
      console.error("Error creating book:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create New Book</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="imgUrl">Image URL</Label>
            <Input
              id="imgUrl"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Book"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
