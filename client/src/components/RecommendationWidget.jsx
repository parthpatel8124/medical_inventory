import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';

const RecommendationWidget = ({ onRecommendation, onClose }) => {
  const [symptoms, setSymptoms] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const filteredSymptoms = symptoms.filter(s => s.trim());
      
      const response = await fetch('http://127.0.0.1:5001/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: filteredSymptoms })
      });

      const data = await response.json();
      if (response.ok) {
        onRecommendation(data);
      } else {
        setError(data.error || 'Failed to get recommendations');
      }
    } catch (err) {
      setError('Service unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Find Medicines by Symptoms</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {symptoms.map((symptom, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={symptom}
                onChange={e => {
                  const newSymptoms = [...symptoms];
                  newSymptoms[i] = e.target.value;
                  setSymptoms(newSymptoms);
                }}
                className="flex-1 p-2 border rounded"
                placeholder="Enter symptom"
              />
              {symptoms.length > 1 && (
                <button 
                  type="button"
                  onClick={() => setSymptoms(symptoms.filter((_, index) => index !== i))}
                  className="text-red-500"
                >
                  <Minus />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => setSymptoms([...symptoms, ''])}
            className="text-blue-500 flex items-center gap-1"
          >
            <Plus /> Add Symptom
          </button>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          >
            {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecommendationWidget;
