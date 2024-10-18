from pydantic import BaseModel, Field
from typing import Optional


class ProtocolInput(BaseModel):
    title: Optional[str] = None
    sponsor: Optional[str] = None
    protocol_number: Optional[str] = None
    registry_number: Optional[str] = None
    principal_investigator: Optional[str] = None
    study_sites: Optional[str] = None
    drug_name: Optional[str] = None
    rationale: Optional[str] = None
    preclinical_data: Optional[str] = None
    dose_rationale: Optional[str] = None
    primary_objective: Optional[str] = None
    secondary_objectives: Optional[str] = None
    primary_endpoint: Optional[str] = None
    secondary_endpoints: Optional[str] = None
    trial_phase: Optional[str] = None
    study_design: Optional[str] = None
    dose_escalation_strategy: Optional[str] = None
    stopping_rules: Optional[str] = None
    study_duration: Optional[str] = None
    inclusion_criteria: Optional[str] = None
    exclusion_criteria: Optional[str] = None
    num_participants: Optional[str] = None
    study_location: Optional[str] = None
    safety_monitoring_plan: Optional[str] = None
    risk_considerations: Optional[str] = None
    adverse_event_reporting: Optional[str] = None
    stopping_criteria: Optional[str] = None
    statistical_methods: Optional[str] = None
    sample_size_justification: Optional[str] = None
    missing_data_handling: Optional[str] = None
    data_collection_methods: Optional[str] = None
    confidentiality_plan: Optional[str] = None
    data_access: Optional[str] = None
    ethics_committee_approval: Optional[str] = None
    informed_consent: Optional[str] = None
