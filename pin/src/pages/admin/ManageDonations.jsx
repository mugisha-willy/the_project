import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

function ManageDonations() {
  const [donations] = useState([{ id: 1, donor_name: 'John Doe', amount: 50000, status: 'completed', created_at: new Date().toISOString() }]);
  return (
    <div className="container mx-auto px-4 py-8"><div className="flex justify-between items-center mb-6"><h1 className="text-3xl font-bold">Manage Donations</h1><button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2"><Download className="w-4 h-4" />Export CSV</button></div>
    <div className="bg-white rounded-xl shadow-md overflow-hidden"><div className="p-4 border-b"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search donations..." className="w-full pl-9 pr-3 py-2 border rounded-lg" /></div></div>
    <table className="w-full"><thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left">Donor</th><th className="px-4 py-3 text-left">Amount</th><th className="px-4 py-3 text-left">Status</th></tr></thead><tbody>{donations.map(d => (<tr key={d.id}><td className="px-4 py-3">{d.donor_name}</td><td className="px-4 py-3">RWF {d.amount.toLocaleString()}</td><td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Completed</span></td></tr>))}</tbody></table></div></div>
  );
}
export default ManageDonations;