import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { formatCurrency } from '../lib/utils';

const data = [
  { name: 'Lun', revenue: 450 },
  { name: 'Mar', revenue: 520 },
  { name: 'Mer', revenue: 380 },
  { name: 'Jeu', revenue: 610 },
  { name: 'Ven', revenue: 580 },
  { name: 'Sam', revenue: 200 },
];

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Revenus du mois', value: '8 450 €', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', trendUp: true },
    { label: 'Nouveaux Patients', value: '24', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+5%', trendUp: true },
    { label: 'Séances du jour', value: '12', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50', trend: 'Stable', trendUp: null },
    { label: 'Impayés', value: '1 240 €', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', trend: '-2%', trendUp: false },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bonjour, Dr. Dupont</h1>
          <p className="text-slate-500">Voici l'activité de votre centre aujourd'hui.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
            Exporter PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            Nouveau RDV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={cn("p-3 rounded-xl", stat.bg)}>
                <stat.icon className={stat.color} size={24} />
              </div>
              {stat.trendUp !== null && (
                <div className={cn(
                  "flex items-center text-xs font-bold px-2 py-1 rounded-lg",
                  stat.trendUp ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {stat.trendUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                  {stat.trend}
                </div>
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Performance Hebdomadaire</h3>
            <select className="bg-slate-50 border-none rounded-lg text-sm font-medium px-3 py-1.5 focus:ring-2 focus:ring-blue-500">
              <option>7 derniers jours</option>
              <option>30 derniers jours</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#2563eb', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Prochains Rendez-vous</h3>
          <div className="space-y-6">
            {[
              { time: '14:30', patient: 'Marc Lefebvre', type: 'Rééducation Genou' },
              { time: '15:15', patient: 'Sophie Martin', type: 'Bilan Initial' },
              { time: '16:00', patient: 'Thomas Costa', type: 'Ostéopathie' },
              { time: '16:45', patient: 'Julie Bernard', type: 'Rééducation Dos' },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg shrink-0">
                  {item.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{item.patient}</p>
                  <p className="text-xs text-slate-500 truncate">{item.type}</p>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            Voir tout l'agenda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
