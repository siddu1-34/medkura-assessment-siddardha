-- =============================================================
-- MEDKURA HEALTH - PATIENT JOURNEY DATABASE SCHEMA
-- =============================================================

-- ENUM for case stages
CREATE TYPE case_stage AS ENUM (
  'onboarded',
  'lab_tests_ordered',
  'second_opinion_scheduled',
  'second_opinion_completed',
  'hospital_selected',
  'surgery_scheduled',
  'surgery_completed',
  'closed'
);

-- =============================================================
-- PATIENTS
-- A patient may have multiple surgery cases
-- =============================================================

CREATE TABLE patients (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    phone VARCHAR(20),
    city VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- CARE REPRESENTATIVES
-- MedKura staff managing the case
-- =============================================================

CREATE TABLE representatives (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- CASES
-- Represents one surgery journey
-- =============================================================

CREATE TABLE cases (
    id UUID PRIMARY KEY,
    patient_id UUID NOT NULL,
    representative_id UUID NOT NULL,
    condition TEXT,
    current_stage case_stage DEFAULT 'onboarded',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_patient
        FOREIGN KEY (patient_id)
        REFERENCES patients(id),

    CONSTRAINT fk_representative
        FOREIGN KEY (representative_id)
        REFERENCES representatives(id)
);

-- =============================================================
-- CASE STAGE HISTORY
-- Audit trail for tracking stage changes
-- =============================================================

CREATE TABLE case_stage_history (
    id UUID PRIMARY KEY,
    case_id UUID NOT NULL,
    stage case_stage,
    changed_by VARCHAR(255),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_case
        FOREIGN KEY (case_id)
        REFERENCES cases(id)
);

-- =============================================================
-- DOCTORS
-- Doctors who provide second opinions
-- =============================================================

CREATE TABLE doctors (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    specialty VARCHAR(100),
    city VARCHAR(100),
    consultation_fee INT,
    average_rating DECIMAL(2,1)
);

-- =============================================================
-- CONSULTATIONS
-- Doctor consultation records for a case
-- =============================================================

CREATE TABLE consultations (
    id UUID PRIMARY KEY,
    case_id UUID NOT NULL,
    doctor_id UUID NOT NULL,
    consultation_date TIMESTAMP,
    notes TEXT,

    CONSTRAINT fk_case_consultation
        FOREIGN KEY (case_id)
        REFERENCES cases(id),

    CONSTRAINT fk_doctor_consultation
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
);

-- =============================================================
-- LAB TEST ORDERS
-- Lab tests requested for the case
-- =============================================================

CREATE TABLE lab_orders (
    id UUID PRIMARY KEY,
    case_id UUID NOT NULL,
    lab_name VARCHAR(255),
    test_type VARCHAR(255),
    status VARCHAR(50),
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_case_lab
        FOREIGN KEY (case_id)
        REFERENCES cases(id)
);

-- =============================================================
-- HOSPITALS
-- Hospitals where surgery can take place
-- =============================================================

CREATE TABLE hospitals (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    address TEXT
);

-- =============================================================
-- HOSPITAL REFERRALS
-- Case referral to hospitals
-- =============================================================

CREATE TABLE hospital_referrals (
    id UUID PRIMARY KEY,
    case_id UUID NOT NULL,
    hospital_id UUID NOT NULL,
    referred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_case_referral
        FOREIGN KEY (case_id)
        REFERENCES cases(id),

    CONSTRAINT fk_hospital_referral
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
);

-- =============================================================
-- DOCUMENTS
-- Medical reports, insurance documents etc.
-- =============================================================

CREATE TABLE documents (
    id UUID PRIMARY KEY,
    case_id UUID NOT NULL,
    file_name VARCHAR(255),
    file_url TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_case_document
        FOREIGN KEY (case_id)
        REFERENCES cases(id)
);

-- =============================================================
-- INDEXES (Performance Optimization)
-- =============================================================

-- Index for frequently searching cases by representative
CREATE INDEX idx_cases_representative
ON cases(representative_id);

-- Index for filtering cases by stage
CREATE INDEX idx_cases_stage
ON cases(current_stage);

-- Index for retrieving stage history quickly
CREATE INDEX idx_case_stage_history_case
ON case_stage_history(case_id);

-- Index for searching patients by city
CREATE INDEX idx_patients_city
ON patients(city);

-- Index for fetching consultations per case
CREATE INDEX idx_consultations_case
ON consultations(case_id);

-- =============================================================
-- SAMPLE QUERY A
-- Get all active cases assigned to a representative
-- where the case has been in the same stage for more than 5 days
-- =============================================================

-- SELECT *
-- FROM cases
-- WHERE representative_id = 'rep_001'
-- AND current_stage != 'closed'
-- AND updated_at < NOW() - INTERVAL '5 days';


-- =============================================================
-- SAMPLE QUERY B
-- Average number of days from case creation
-- to Hospital Selected stage grouped by city
-- =============================================================

-- SELECT p.city,
-- AVG(EXTRACT(DAY FROM (c.updated_at - c.created_at))) AS avg_days
-- FROM cases c
-- JOIN patients p ON c.patient_id = p.id
-- WHERE c.current_stage = 'hospital_selected'
-- GROUP BY p.city;