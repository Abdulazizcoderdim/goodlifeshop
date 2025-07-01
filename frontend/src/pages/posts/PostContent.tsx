import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

interface PostContentProps {
  content: string;
  className?: string;
}

const PostContent = ({ content, className = "" }: PostContentProps) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    // Sanitize HTML content to prevent XSS attacks
    const cleanContent = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "strong",
        "em",
        "u",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "img",
        "div",
        "span",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "id"],
    });
    setSanitizedContent(cleanContent);
  }, [content]);

  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-img:rounded-lg prose-img:shadow-md ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default PostContent;
