import React, { useState } from 'react';
import axios from 'axios';

function ProtocolAlpha() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/generate-response', { prompt: inputText });
    setResponseText(response.data.response);
  } catch (error) {
    console.error('Error generating response:', error);
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Protocol Alpha</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Write your text here..."
        rows="5"
        style={{ width: '100%', padding: '10px' }}
      />
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Submit
      </button>

      <h3>Response:</h3>
      <textarea
        value={responseText}
        readOnly
        rows="5"
        style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#f0f0f0' }}
      />
    </div>
  );
}

export default ProtocolAlpha;