import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOption, setSubOption] = useState(null); // New state for secondary options
  const navigate = useNavigate();

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setSubOption(null); // Reset sub-option when main option changes
  };

  const handleSubOptionChange = (option) => {
    setSubOption(option);
  };

  const handleButtonClick = () => {
    if (!selectedOption) {
      alert('Please select a document type first!');
      return;
    }

    // Navigate based on the selected option's value
    if (selectedOption.value === 'clinical_trial' && !subOption) {
      alert('Please select a specific document type for Clinical Trial!');
      return;
    }

    if (selectedOption.value === 'clinical_trial') {
      switch (subOption.value) {
        case 'synopsis':
          navigate('/synopsis-form');
          break;
        case 'protocol':
          navigate('/protocol-form');
          break;
        default:
          alert('Selected Clinical Trial document type not recognized!');
      }
    } else {
      switch (selectedOption.value) {
        case 'research_report':
          navigate('/research-report');
          break;
        case 'proposal':
          navigate('/proposal');
          break;
        default:
          alert('Selected document type not recognized!');
      }
    }
  };

  const options = [
    { value: 'clinical_trial', label: 'Clinical Trial Document' },
    { value: 'research_report', label: 'Research Report' },
    { value: 'proposal', label: 'Proposal' },
  ];

  const clinicalTrialOptions = [
    { value: 'synopsis', label: 'Synopsis' },
    { value: 'protocol', label: 'Clinical Trial Protocol Document' },
  ];

  return (
    <div className="home-page">
      <h2>What document are you working on today?</h2>

      <div className="select-container">
        <Select
          options={options}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder="Select Document Type"
        />
      </div>

      {/* Conditionally render the second dropdown if Clinical Trial Document is selected */}
      {selectedOption?.value === 'clinical_trial' && (
        <div className="select-container" style={{ marginTop: '15px' }}>
          <Select
            options={clinicalTrialOptions}
            value={subOption}
            onChange={handleSubOptionChange}
            placeholder="Select Clinical Trial Document Type"
          />
        </div>
      )}

      <button
        onClick={handleButtonClick}
        style={{
          marginTop: '20px',
          padding: '15px 30px',
          backgroundColor: '#4A90E2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '18px',
        }}
      >
        Next
      </button>
    </div>
  );
}

export default HomePage;