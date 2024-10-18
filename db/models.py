import datetime
from sqlalchemy import Column, Integer, String, Date, DateTime, Text
from db.database import Base


# Protocol model representing the database table for storing protocols
class ProtocolInputs(Base):
    __tablename__ = 'study_protocols'

    id = Column(Integer, primary_key=True, index=True)

    # General Information
    title = Column(String, nullable=True)  # Trial title
    sponsor = Column(String, nullable=True)  # Sponsor of the trial
    protocol_number = Column(String, nullable=True)  # Internal protocol ID
    registry_number = Column(String, nullable=True)  # Clinical trial registry ID
    principal_investigator = Column(String, nullable=True)  # Principal investigator
    study_sites = Column(String, nullable=True)  # Study sites
    study_start_date = Column(String, nullable=True)  # Planned start date
    study_end_date = Column(String, nullable=True)  # Planned end date

    # Drug/Intervention Details
    drug_name = Column(String, nullable=True)  # Name of the drug or intervention
    rationale = Column(Text, nullable=True)  # Rationale for the study
    preclinical_data = Column(Text, nullable=True)  # Preclinical data summary
    dose_rationale = Column(Text, nullable=True)  # Rationale for dose selection

    # Objectives and Endpoints
    primary_objective = Column(String, nullable=True)  # Primary objective of the study
    secondary_objectives = Column(
        Text, nullable=True
    )  # Secondary objectives of the study
    primary_endpoint = Column(String, nullable=True)  # Primary endpoint
    secondary_endpoints = Column(Text, nullable=True)  # Secondary endpoints

    # Study Design
    trial_phase = Column(
        String, nullable=True
    )  # Phase of the trial (Phase 1, Phase 2, etc.)
    study_design = Column(
        Text, nullable=True
    )  # Study design type (randomized, open-label, etc.)
    dose_escalation_strategy = Column(Text, nullable=True)  # Dose escalation strategy
    stopping_rules = Column(Text, nullable=True)  # Stopping rules for safety
    study_duration = Column(String, nullable=True)  # Study duration

    # Participants
    inclusion_criteria = Column(Text, nullable=True)  # Inclusion criteria
    exclusion_criteria = Column(Text, nullable=True)  # Exclusion criteria
    num_participants = Column(String, nullable=True)  # Number of participants
    study_location = Column(String, nullable=True)  # Study locations

    # Safety and Monitoring
    safety_monitoring_plan = Column(Text, nullable=True)  # Safety monitoring details
    risk_considerations = Column(Text, nullable=True)  # Risk mitigation strategies
    adverse_event_reporting = Column(
        Text, nullable=True
    )  # Adverse event reporting methods
    stopping_criteria = Column(Text, nullable=True)  # Stopping criteria for safety

    # Statistical Plan
    statistical_methods = Column(Text, nullable=True)  # Statistical analysis methods
    sample_size_justification = Column(Text, nullable=True)  # Sample size justification
    missing_data_handling = Column(Text, nullable=True)  # Handling missing data

    # Data Management
    data_collection_methods = Column(Text, nullable=True)  # Data collection methodology
    confidentiality_plan = Column(Text, nullable=True)  # Confidentiality plan
    data_access = Column(Text, nullable=True)  # Data access details

    # Ethics and Compliance
    ethics_committee_approval = Column(
        String, nullable=True
    )  # Ethics committee approval info
    informed_consent = Column(Text, nullable=True)  # Informed consent process
    conflict_of_interest = Column(
        Text, nullable=True
    )  # Conflict of interest disclosures

    # Timestamps
    created_at = Column(String, default=datetime.datetime.now())
    updated_at = Column(String, onupdate=datetime.datetime.now())
