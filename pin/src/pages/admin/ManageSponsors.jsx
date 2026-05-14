import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';

function ManageSponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sample data - replace with actual API call
    setSponsors([
      { id: 1, company_name: 'Company A', contact_person: 'John', email: 'contact@companya.com', sponsorship_type: 'gold', amount: 500000, status: 'pending', created_at: new Date().toISOString() },
      { id: 2, company_name: 'Company B', contact_person: 'Jane', email: 'contact@companyb.com', sponsorship_type: 'silver', amount: 250000, status: 'approved', created_at: new Date().toISOString() },
    ]);
    setLoading(false);
  }, []);

  const filteredSponsors = sponsors.filter(s => 
    s.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Sponsorship Requests</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search sponsors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr><th className="px-4 py-3 text-left">Company</th><th className="px-4 py-3 text-left">Contact</th><th className="px-4 py-3 text-left">Package</th><th className="px-4 py-3 text-left">Amount</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-left">Actions</th></tr>
            </thead>
            <tbody className="divide-y">
              {filteredSponsors.map((sponsor) => (
                <tr key={sponsor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><p className="font-medium">{sponsor.company_name}</p><p className="text-sm text-gray-500">{sponsor.email}</p></td>
                  <td className="px-4 py-3">{sponsor.contact_person}</td>
                  <td className="px-4 py-3 capitalize">{sponsor.sponsorship_type}</td>
                  <td className="px-4 py-3">RWF {sponsor.amount?.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`inline-block px-2 py-1 text-xs rounded-full ${sponsor.status === 'approved' ? 'bg-green-100 text-green-700' : sponsor.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{sponsor.status}</span></td>
                  <td className="px-4 py-3"><div className="flex space-x-2"><button className="p-1 text-green-600 hover:bg-green-50 rounded"><CheckCircle className="w-4 h-4" /></button><button className="p-1 text-red-600 hover:bg-red-50 rounded"><XCircle className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageSponsors;