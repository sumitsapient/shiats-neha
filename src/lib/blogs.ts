import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_DIR = path.join(process.cwd(), "src/content/blogs");

interface Blog {
  metadata: {
    title: string;
    author: string;
    date: string;
    excerpt:string;
    coverImage?: string;
  };
  content: string;
}

// Get all blog slugs (filenames)
export function getAllBlogSlugs() {
  return fs.readdirSync(BLOGS_DIR).map((file) => file.replace(".md", ""));
}

// Get metadata & content for a specific blog
export function getBlogBySlug(slug: string): Blog | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    metadata: {
      title: data.title as string,
      author: data.author as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      coverImage: data.coverImage as string | undefined,
    },
    content,
  };
}

// Get all blog metadata (for blog list)
export function getAllBlogs() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => {
    const blog = getBlogBySlug(slug);
    if (!blog) return null;
    return { ...blog.metadata, slug };
  }).filter((blog): blog is NonNullable<typeof blog> => blog !== null);
}
