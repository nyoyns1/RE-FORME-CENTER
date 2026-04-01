import React from 'react';
import { Calendar as CalendarIcon, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Agenda: React.FC = () => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const hours = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agenda</h1>
          <p className="text-slate-500">Gérez vos rendez-vous et lieux de consultation.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
            <button className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg">Jour</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">Semaine</button>
            <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">Mois</button>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
            <Plus size={18} className="mr-2" />
            Nouveau RDV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-bold">Mercredi 25 Mars 2024</h2>
            <div className="flex space-x-1">
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
              <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> Cabinet</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span> Domicile</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> Visio</div>
          </div>
        </div>

        <div className="grid grid-cols-[100px_1fr] divide-x divide-slate-100">
          <div className="bg-slate-50/50">
            {hours.map(hour => (
              <div key={hour} className="h-20 px-4 py-2 text-xs font-bold text-slate-400 border-b border-slate-100">
                {hour}
              </div>
            ))}
          </div>
          <div className="relative">
            {/* Grid Lines */}
            {hours.map((_, i) => (
              <div key={i} className="h-20 border-b border-slate-100"></div>
            ))}
            
            {/* Appointments */}
            <div className="absolute top-[130px] left-4 right-4 h-24 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-3 shadow-sm">
              <p className="text-xs font-bold text-blue-700">14:30 - 15:30</p>
              <p className="text-sm font-bold text-slate-900">Marc Lefebvre</p>
              <p className="text-xs text-slate-500 flex items-center mt-1">
                <MapPin size={12} className="mr-1" /> Cabinet
              </p>
            </div>

            <div className="absolute top-[320px] left-4 right-4 h-20 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-3 shadow-sm">
              <p className="text-xs font-bold text-purple-700">17:00 - 18:00</p>
              <p className="text-sm font-bold text-slate-900">Sophie Martin</p>
              <p className="text-xs text-slate-500 flex items-center mt-1">
                <MapPin size={12} className="mr-1" /> Domicile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
