import { useState } from 'react';
import { Search, Download } from 'lucide-react';

function ManageSubscribers() {
  const [subscribers] = useState([{ id: 1, email: 'user@example.com', subscribed_at: new Date().toISOString() }]);
  return (
    <div className="container mx-auto px-4 py-8"><div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold">Subscribers</h1><button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"><Download className="w-4 h-4" />Export CSV</button></div>
    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="p-4 border-b"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search subscribers..." className="w-full pl-9 pr-3 py-2 border rounded-lg" /></div></div>
    <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3">Email</th><th className="px-4 py-3">Subscribed Date</th></tr></thead><tbody>{subscribers.map(s => (<tr key={s.id}><td className="px-4 py-3">{s.email}</td><td className="px-4 py-3">{new Date(s.subscribed_at).toLocaleDateString()}</td></tr>))}</tbody></table></div></div>
  );
}
export default ManageSubscribers;