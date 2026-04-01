/*
  RE FORME CENTER - PostgreSQL Schema (Supabase)
  
  -- Patients Table
  CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    birth_date DATE,
    is_mutuelle BOOLEAN DEFAULT false,
    referring_doctor TEXT,
    medical_history TEXT,
    gdpr_consent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Pathologies Table
  CREATE TABLE pathologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    diagnosis TEXT NOT NULL,
    treatment_plan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Sessions Table
  CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    status_billing TEXT CHECK (status_billing IN ('paid', 'unpaid', 'pending')) DEFAULT 'unpaid',
    clinical_notes TEXT,
    location TEXT CHECK (location IN ('cabinet', 'domicile', 'clinique', 'visio')) DEFAULT 'cabinet',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Staff Table
  CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE, -- Link to Supabase Auth
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'therapist', 'secretary')) DEFAULT 'therapist',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Documents Table (Storage references)
  CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    type TEXT, -- 'prescription', 'imaging', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
*/
