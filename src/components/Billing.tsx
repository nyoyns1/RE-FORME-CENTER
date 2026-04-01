import React from 'react';
import { FileText, Download, Filter, Search, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const Billing: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Facturation</h1>
          <p className="text-slate-500">Gérez vos factures, impayés et exports comptables.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
            <Download size={18} className="mr-2" />
            Export Comptable (CSV)
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
            <FileText size={18} className="mr-2" />
            Générer Facture
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Facturé (Mois)</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">12 450,00 €</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">En attente de paiement</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">1 240,00 €</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Taux de recouvrement</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">92%</h3>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold">Factures Récentes</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="N° Facture, Patient..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm" />
            </div>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg"><Filter size={20} /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                <th className="px-6 py-4">N° Facture</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { id: 'FAC-2024-001', patient: 'Jean Dupont', date: '25/03/2024', amount: 120, status: 'paid' },
                { id: 'FAC-2024-002', patient: 'Marie Curie', date: '24/03/2024', amount: 45, status: 'unpaid' },
                { id: 'FAC-2024-003', patient: 'Albert Einstein', date: '22/03/2024', amount: 90, status: 'pending' },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.patient}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{formatCurrency(inv.amount)}</td>
                  <td className="px-6 py-4">
                    {inv.status === 'paid' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <CheckCircle2 size={12} className="mr-1" /> Payée
                      </span>
                    ) : inv.status === 'unpaid' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <AlertCircle size={12} className="mr-1" /> Impayée
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                        <Clock size={12} className="mr-1" /> En attente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">Détails</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
