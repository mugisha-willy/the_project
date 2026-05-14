import { TrendingUp, Trophy, Target } from 'lucide-react';

function ProgressBar({ current, target, title = "Donation Goal", showDetails = true }) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      {showDetails && (
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{title}</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="font-bold text-primary">{percentage.toFixed(0)}%</span>
          </div>
        </div>
      )}
      
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-linear-to-r from-primary to-primary-dark h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {showDetails && (
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>RWF {current.toLocaleString()}</span>
          <span className="font-semibold">RWF {target.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;