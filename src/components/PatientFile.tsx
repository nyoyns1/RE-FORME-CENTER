import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  History, 
  Printer, 
  Plus,
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Patient, Session } from '../lib/supabase';
import { cn, formatCurrency } from '../lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface PatientFileProps {
  patient: Patient;
  sessions: Session[];
  onUpdatePatient: (updated: Partial<Patient>) => void;
}

const PatientFile: React.FC<PatientFileProps> = ({ patient, sessions, onUpdatePatient }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'sessions' | 'pathology'>('info');

  const printSessionCalendar = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text('RE FORME CENTER', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Calendrier des Séances - ${patient.last_name.toUpperCase()} ${patient.first_name}`, 105, 30, { align: 'center' });
    
    // Table
    const tableData = sessions.map((s, index) => [
      index + 1,
      format(new Date(s.date), 'dd/MM/yyyy HH:mm'),
      s.location.charAt(0).toUpperCase() + s.location.slice(1),
      s.status_billing === 'paid' ? 'Payé' : s.status_billing === 'unpaid' ? 'À payer' : 'En attente'
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Date & Heure', 'Lieu', 'Statut Facturation']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save(`calendrier_seances_${patient.last_name}.pdf`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Profile */}
      <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center text-3xl font-bold border border-white/30">
              {patient.first_name[0]}{patient.last_name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{patient.first_name} {patient.last_name}</h1>
              <div className="flex items-center mt-2 space-x-4 text-blue-100 text-sm">
                <span className="flex items-center"><Phone size={14} className="mr-1.5" /> {patient.phone}</span>
                <span className="flex items-center"><Mail size={14} className="mr-1.5" /> {patient.email}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 flex items-center">
              <span className="text-sm font-medium mr-3">Statut Mutuelle</span>
              <button 
                onClick={() => onUpdatePatient({ is_mutuelle: !patient.is_mutuelle })}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                  patient.is_mutuelle ? "bg-green-400" : "bg-slate-400"
                )}
              >
                <span className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  patient.is_mutuelle ? "translate-x-6" : "translate-x-1"
                )} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 px-8">
        {[
          { id: 'info', label: 'Informations', icon: User },
          { id: 'sessions', label: 'Historique Séances', icon: History },
          { id: 'pathology', label: 'Pathologies', icon: Stethoscope },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center px-6 py-4 text-sm font-medium border-b-2 transition-all",
              activeTab === tab.id 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon size={18} className="mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <FileText size={20} className="mr-2 text-blue-600" />
                Détails Médicaux
              </h3>
              <div className="bg-slate-50 p-6 rounded-xl space-y-4 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Médecin Prescripteur</p>
                  <p className="font-medium text-slate-900">{patient.referring_doctor || 'Non renseigné'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Antécédents</p>
                  <p className="text-slate-700 leading-relaxed">{patient.medical_history || 'Aucun antécédent majeur.'}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center">
                <CheckCircle2 size={20} className="mr-2 text-green-600" />
                Conformité
              </h3>
              <div className={cn(
                "p-6 rounded-xl border flex items-start space-x-4",
                patient.gdpr_consent ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
              )}>
                {patient.gdpr_consent ? (
                  <CheckCircle2 className="text-green-600 shrink-0" />
                ) : (
                  <AlertCircle className="text-red-600 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-slate-900">Consentement RGPD</p>
                  <p className="text-sm text-slate-600 mt-1">
                    {patient.gdpr_consent 
                      ? "Le patient a signé le formulaire de consentement pour le traitement de ses données." 
                      : "Action requise : Le patient n'a pas encore signé le consentement."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dernières consultations</h3>
              <div className="flex space-x-3">
                <button 
                  onClick={printSessionCalendar}
                  className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Printer size={16} className="mr-2" />
                  Imprimer le calendrier
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  <Plus size={16} className="mr-2" />
                  Nouvelle séance
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-4 pl-4">Date</th>
                    <th className="pb-4">Lieu</th>
                    <th className="pb-4">Notes Cliniques</th>
                    <th className="pb-4">Facturation</th>
                    <th className="pb-4 pr-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sessions.map((session) => (
                    <tr key={session.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4 pl-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {format(new Date(session.date), 'dd MMM yyyy', { locale: fr })}
                            </p>
                            <p className="text-xs text-slate-500">
                              {format(new Date(session.date), 'HH:mm')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                          {session.location}
                        </span>
                      </td>
                      <td className="py-4 max-w-xs truncate text-sm text-slate-600">
                        {session.clinical_notes || 'Pas de notes.'}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center">
                          {session.status_billing === 'paid' ? (
                            <span className="text-green-600 flex items-center text-sm font-medium">
                              <CheckCircle2 size={14} className="mr-1.5" /> Payé
                            </span>
                          ) : (
                            <span className="text-amber-600 flex items-center text-sm font-medium">
                              <AlertCircle size={14} className="mr-1.5" /> À régler
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientFile;
