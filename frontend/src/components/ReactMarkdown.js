import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/MarkdownDocument.css'; // Optional: custom CSS for styling

function MarkdownDocument({ markdownContent }) {
  return (
    <div className="markdown-container">
      <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
    </div>
  );
}

export default MarkdownDocument;