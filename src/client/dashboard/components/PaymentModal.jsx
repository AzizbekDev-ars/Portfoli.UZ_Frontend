import React, { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!isOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">Top-Up to PRO 🚀</h3>
            <p className="text-xs text-slate-500 font-medium">Unlock premium features forever.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:text-black dark:hover:text-white transition-colors">
            ✕
          </button>
        </div>

        {/* Amount Box */}
        <div className="px-6 pt-6 pb-2">
           <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-4 flex justify-between items-center">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">Total payable amount:</span>
              <span className="text-2xl font-black text-indigo-700 dark:text-indigo-300">$3.00</span>
           </div>
        </div>

        {/* Form */}
        <form onSubmit={handlePay} className="p-6 space-y-5">
           <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Card Number</label>
              <input 
                type="text" 
                required 
                placeholder="0000 0000 0000 0000" 
                maxLength="19"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-mono text-sm transition-colors"
               />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  required 
                  placeholder="MM/YY" 
                  maxLength="5"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-mono text-sm transition-colors"
                 />
             </div>
             <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CVV</label>
                <input 
                  type="password" 
                  required 
                  placeholder="•••" 
                  maxLength="3"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none rounded-xl px-4 py-3 font-mono text-sm transition-colors"
                 />
             </div>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full mt-2 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors flex justify-center items-center gap-2 shadow-lg"
           >
             {loading ? (
                <span className="w-5 h-5 border-2 border-slate-500/30 border-t-white dark:border-t-black rounded-full animate-spin"></span>
             ) : (
                <span>Pay $3.00 & Upgrade</span>
             )}
           </button>

           <div className="text-center flex items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-400">
             <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             Encrypted & Secure Payment
           </div>
        </form>

      </div>
    </div>
  );
};

export default PaymentModal;
