import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { alert('Passwords do not match'); return; }
    setSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  if (success) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-red py-12 px-4"><div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"><div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">Password reset successful! Redirecting to login...</div></div></div>);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-red py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8"><div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"><Lock className="w-8 h-8 text-white" /></div><h2 className="text-2xl font-bold">Create New Password</h2></div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium mb-2">New Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div></div>
          <div><label className="block text-sm font-medium mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" /><input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" required /></div></div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition">Reset Password</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;