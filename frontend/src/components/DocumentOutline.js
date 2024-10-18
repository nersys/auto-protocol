import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../styles/MarkdownDocument.css';

function DocumentOutline() {
  const location = useLocation();
  const initialOutline = location.state?.outline || "No outline available";

  const [outline, setOutline] = useState(initialOutline);
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(null); // To store generated markdown

  const markdownRef = useRef(null);

  // Toggle edit mode
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle change in the entire outline content
  const handleChange = (e) => setOutline(e.target.value);

  // Save the edited outline to the backend
  const saveOutline = async () => {
    try {
      await fetch('http://localhost:8000/save-outline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outline }),
      });
      setIsEditing(false);
      alert('Outline saved successfully!');
    } catch (error) {
      console.error('Error saving outline:', error);
      alert('Failed to save outline. Please try again.');
    }
  };

  // Generate protocol document and store markdown
  const generateDocument = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate-protocol-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outline }), // Send the outline data to the backend
      });
      const result = await response.json();
      setMarkdownContent(result.markdown); // Store markdown content
      alert('Document generated successfully!');
    } catch (error) {
      console.error('Error generating document:', error);
      alert('Failed to generate the document. Please try again.');
    }
  };

  // Download the generated PDF document
  const downloadPdf = async () => {
    try {
      const response = await fetch('http://localhost:8000/download-protocol');
      const blob = await response.blob(); // Get the file as a blob
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'protocol_document.pdf'); // Filename for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download the PDF. Please try again.');
    }
  };

  return (
    <div className="outline-container">
      <h3>Outline</h3>
      {isEditing ? (
        <textarea
          value={outline}
          onChange={handleChange}
          className="input-text"
          style={{
            width: '100%',
            minHeight: '500px',
            fontSize: '1rem',
            padding: '1rem',
            resize: 'none', // Prevent textarea from resizing
          }}
        />
      ) : (
        <div
          ref={markdownRef} // Ref to capture rendered markdown
          className="document-content"
          style={{
            width: '100%',
            minHeight: '500px',
            fontSize: '1rem',
            padding: '1rem',
            overflowY: 'auto', // Ensure it's scrollable if content overflows
          }}
        >
          <ReactMarkdown children={markdownContent || outline} remarkPlugins={[remarkGfm]} />
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={toggleEdit} className="primary-button" style={{ marginRight: '10px' }}>
          {isEditing ? 'Cancel' : 'Edit Outline'}
        </button>
        {isEditing && (
          <button onClick={saveOutline} className="primary-button" style={{ marginRight: '10px' }}>
            Save Outline
          </button>
        )}
        <button onClick={generateDocument} className="primary-button" style={{ marginRight: '10px' }}>
          Generate Document
        </button>
        <button onClick={downloadPdf} className="primary-button">
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default DocumentOutline;