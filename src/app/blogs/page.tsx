import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import Image from "next/image";

export default async function BlogList() {
  const blogs = getAllBlogs();

  return (
    <div>
      <h1>📜 Blog List</h1>
      {blogs.map((blog) => (
        <div key={blog.slug}>
          {blog.coverImage && (
            <Image
              src={blog.coverImage}
              width={800}
              height={400}
              alt="Cover Image"
              className="cover-image"
            />
          )}
          <h2>{blog.title}</h2>
          <p>{blog.excerpt}</p>
          <Link href={`/blogs/${blog.slug}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
