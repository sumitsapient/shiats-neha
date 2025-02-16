import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        img: ({ src, alt }) => {
          return (
            <Image
              src={src!} // Make sure the image path is correct
              alt={alt || "Markdown Image"}
              width={800} // Adjust width as needed
              height={500} // Adjust height as needed
              style={{ objectFit: "cover", borderRadius: "10px" }}
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
