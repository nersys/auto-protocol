import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import '../styles/SynopsisForm.css';
import '../styles/LoadingSpinner.css';

function ProtocolForm() {
  const [formData, setFormData] = useState({
    title: '',
    sponsor: '',
    protocol_number: '',
    registry_number: '',
    principal_investigator: '',
    study_sites: '',
    drug_name: '',
    rationale: '',
    preclinical_data: '',
    dose_rationale: '',
    primary_objective: '',
    secondary_objectives: '',
    primary_endpoint: '',
    secondary_endpoints: '',
    trial_phase: '',
    study_design: '',
    dose_escalation_strategy: '',
    stopping_rules: '',
    study_duration: '',
    inclusion_criteria: '',
    exclusion_criteria: '',
    num_participants: '',
    study_location: '',
    safety_monitoring_plan: '',
    risk_considerations: '',
    adverse_event_reporting: '',
    stopping_criteria: '',
    statistical_methods: '',
    sample_size_justification: '',
    missing_data_handling: '',
    data_collection_methods: '',
    confidentiality_plan: '',
    data_access: '',
    ethics_committee_approval: '',
    informed_consent: ''
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the spinner

    try {
      const response = await axios.post('http://localhost:8000/generate-protocol-document/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
     const outlineText = response.data?.response ?? "No outline generated";
      navigate('/outline-page', { state: { outline: outlineText } });
    } catch (error) {
      console.error('Error submitting protocol:', error);
      alert("Failed to generate outline. Please try again.");
    } finally {
      setLoading(false); // Hide the spinner
    }
  };



  return (
    <div className="App">
      <h1>Let's get some details on your trial!</h1>

      <form onSubmit={handleSubmit}>
        <h2>Introduction</h2>
        <input
          type="text"
          name="title"
          placeholder="Trial Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input-text"
        />
        <input
          type="text"
          name="sponsor"
          placeholder="Sponsor's Name"
          value={formData.sponsor}
          onChange={handleChange}
          required
          className="input-text"
        />
        <input
          type="text"
          name="protocol_number"
          placeholder="Protocol Number"
          value={formData.protocol_number}
          onChange={handleChange}
          className="input-text"
        />
        <input
          type="text"
          name="registry_number"
          placeholder="Registry Number"
          value={formData.registry_number}
          onChange={handleChange}
          className="input-text"
        />
        <input
          type="text"
          name="principal_investigator"
          placeholder="Principal Investigator"
          value={formData.principal_investigator}
          onChange={handleChange}
          className="input-text"
        />
        <input
          type="text"
          name="study_sites"
          placeholder="Study Sites"
          value={formData.study_sites}
          onChange={handleChange}
          className="input-text"
        />

        <h2>Study Rationale and Background</h2>
        <input
          type="text"
          name="drug_name"
          placeholder="Drug Name"
          value={formData.drug_name}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="rationale"
          placeholder="Study Rationale"
          value={formData.rationale}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="preclinical_data"
          placeholder="Summary of Preclinical Data"
          value={formData.preclinical_data}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="dose_rationale"
          placeholder="Rationale for Dose Selection"
          value={formData.dose_rationale}
          onChange={handleChange}
          className="input-text"
        />

        <h2>Objectives and Endpoints</h2>
        <input
          type="text"
          name="primary_objective"
          placeholder="Primary Objective"
          value={formData.primary_objective}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="secondary_objectives"
          placeholder="Secondary Objectives"
          value={formData.secondary_objectives}
          onChange={handleChange}
          className="input-text"
        />
        <input
          type="text"
          name="primary_endpoint"
          placeholder="Primary Endpoint"
          value={formData.primary_endpoint}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="secondary_endpoints"
          placeholder="Secondary Endpoints"
          value={formData.secondary_endpoints}
          onChange={handleChange}
          className="input-text"
        />

        <h2>Study Design</h2>
        <input
          type="text"
          name="trial_phase"
          placeholder="Trial Phase"
          value={formData.trial_phase}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="study_design"
          placeholder="Study Design"
          value={formData.study_design}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="dose_escalation_strategy"
          placeholder="Dose Escalation Strategy"
          value={formData.dose_escalation_strategy}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="stopping_rules"
          placeholder="Stopping Rules"
          value={formData.stopping_rules}
          onChange={handleChange}
          className="input-text"
        />
        <input
          type="text"
          name="study_duration"
          placeholder="Study Duration"
          value={formData.study_duration}
          onChange={handleChange}
          required
          className="input-text"
        />

        <h2>Participants Information</h2>
        <textarea
          name="inclusion_criteria"
          placeholder="Inclusion Criteria"
          value={formData.inclusion_criteria}
          onChange={handleChange}
          required
          className="input-text"
        />
        <textarea
          name="exclusion_criteria"
          placeholder="Exclusion Criteria"
          value={formData.exclusion_criteria}
          onChange={handleChange}
          required
          className="input-text"
        />
        <input
          type="text"
          name="num_participants"
          placeholder="Number of Participants"
          value={formData.num_participants}
          onChange={handleChange}
          required
          className="input-text"
        />
        <input
          type="text"
          name="study_location"
          placeholder="Study Location"
          value={formData.study_location}
          onChange={handleChange}
          required
          className="input-text"
        />

        <h2>Safety and Monitoring</h2>
        <textarea
          name="safety_monitoring_plan"
          placeholder="Safety Monitoring Plan"
          value={formData.safety_monitoring_plan}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="risk_considerations"
          placeholder="Risk Considerations"
          value={formData.risk_considerations}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="adverse_event_reporting"
          placeholder="Adverse Event Reporting"
          value={formData.adverse_event_reporting}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="stopping_criteria"
          placeholder="Stopping Criteria for Safety"
          value={formData.stopping_criteria}
          onChange={handleChange}
          className="input-text"
        />

        <h2>Statistical Plan</h2>
        <textarea
          name="statistical_methods"
          placeholder="Statistical Methods"
          value={formData.statistical_methods}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="sample_size_justification"
          placeholder="Sample Size Justification"
          value={formData.sample_size_justification}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="missing_data_handling"
          placeholder="Missing Data Handling Plan"
          value={formData.missing_data_handling}
                    onChange={handleChange}
          className="input-text"
        />

        <h2>Data Management</h2>
        <textarea
          name="data_collection_methods"
          placeholder="Data Collection Methods"
          value={formData.data_collection_methods}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="confidentiality_plan"
          placeholder="Data Confidentiality Plan"
          value={formData.confidentiality_plan}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="data_access"
          placeholder="Data Access Details"
          value={formData.data_access}
          onChange={handleChange}
          className="input-text"
        />

        <h2>Ethical Considerations</h2>
        <textarea
          name="ethics_committee_approval"
          placeholder="Ethics Committee Approval Details"
          value={formData.ethics_committee_approval}
          onChange={handleChange}
          className="input-text"
        />
        <textarea
          name="informed_consent"
          placeholder="Informed Consent Process"
          value={formData.informed_consent}
          onChange={handleChange}
          className="input-text"
        />

        <button type="submit" className="primary-button">
          Generate Trial Document
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {isSubmitted && (
        <div className="Confirmation">
          <p>Protocol successfully submitted!</p>
        </div>
      )}
    </div>
  );
}

export default ProtocolForm;
