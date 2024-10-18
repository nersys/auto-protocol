import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/MarkdownDocument.css';

function SynopsisPage() {
  const location = useLocation();
  const synopsis = location.state?.synopsis || "No synopsis available";

  return (
    <div className="synopsis-container">
      <div className="document-content">
        <ReactMarkdown children={synopsis} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}

export default SynopsisPage;