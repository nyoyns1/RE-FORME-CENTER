import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientFile from './components/PatientFile';
import Agenda from './components/Agenda';
import Billing from './components/Billing';
import { Patient, Session } from './lib/supabase';
import { Search, Filter, Plus, UserPlus } from 'lucide-react';
import { cn } from './lib/utils';

// Mock Data for demonstration
const MOCK_PATIENT: Patient = {
  id: '1',
  first_name: 'Jean',
  last_name: 'Dupont',
  email: 'jean.dupont@email.com',
  phone: '06 12 34 56 78',
  is_mutuelle: true,
  referring_doctor: 'Dr. Martin',
  medical_history: 'Entorse cheville droite il y a 2 ans. Douleurs lombaires chroniques.',
  gdpr_consent: true,
  created_at: new Date().toISOString()
};

const MOCK_SESSIONS: Session[] = [
  { id: 's1', patient_id: '1', date: '2024-03-25T14:30:00Z', status_billing: 'paid', clinical_notes: 'Amélioration de la mobilité. Exercices de proprioception effectués.', location: 'cabinet' },
  { id: 's2', patient_id: '1', date: '2024-03-18T10:00:00Z', status_billing: 'unpaid', clinical_notes: 'Douleur persistante au réveil. Massage transverse profond.', location: 'cabinet' },
  { id: 's3', patient_id: '1', date: '2024-03-11T16:15:00Z', status_billing: 'paid', clinical_notes: 'Bilan initial. Test de force 3/5.', location: 'visio' },
];

const PatientsList: React.FC = () => {
  const [filterMutuelle, setFilterMutuelle] = useState<'all' | 'mutuelle' | 'non-mutuelle'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const patients = [MOCK_PATIENT]; // In real app, fetch from Supabase
  const filteredPatients = patients.filter(p => {
    const matchesSearch = `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMutuelle = 
      filterMutuelle === 'all' ? true :
      filterMutuelle === 'mutuelle' ? p.is_mutuelle : !p.is_mutuelle;
    return matchesSearch && matchesMutuelle;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Patients</h1>
          <p className="text-slate-500">Gérez vos dossiers patients et l'historique des soins.</p>
        </div>
        <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          <UserPlus size={20} className="mr-2" />
          Nouveau Patient
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Rechercher par nom, prénom..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-xl">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'mutuelle', label: 'Mutuelle' },
            { id: 'non-mutuelle', label: 'Hors Mutuelle' },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilterMutuelle(opt.id as any)}
              className={cn(
                "px-4 py-2 text-sm font-bold rounded-lg transition-all",
                filterMutuelle === opt.id 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Patient File (Detailed View for Demo) */}
      <div className="mt-8">
        <PatientFile 
          patient={MOCK_PATIENT} 
          sessions={MOCK_SESSIONS} 
          onUpdatePatient={(upd) => console.log('Update patient:', upd)} 
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
