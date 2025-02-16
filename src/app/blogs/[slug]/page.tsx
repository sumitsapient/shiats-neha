import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Blog {
  metadata: {
    title: string;
    author: string;
    date: string;
    excerpt?:string;
    coverImage?: string;
  };
  content: string;
}

// Adjusted type for `params` as a Promise
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // Await the params here
  const blog: Blog | null = await getBlogBySlug(slug);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="blog-container">
      <h1 className="blog-title">{blog.metadata.title}</h1>
      <p className="blog-meta">
        By {blog.metadata.author} on {blog.metadata.date}
      </p>

      {blog.metadata.coverImage && (
        <Image
          src={blog.metadata.coverImage}
          alt="Cover Image"
          width={800}
          height={500}
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      )}

      <ReactMarkdown className="blog-content" remarkPlugins={[remarkGfm]}>
        {blog.content}
      </ReactMarkdown>
    </div>
  );
}

// No change needed here
export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}
