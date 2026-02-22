import { useEffect, useState } from 'react';
import { applyLoan, getMyLoans, getMySummary } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CustomerDashboard() {
  const [loans, setLoans] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ amount: '', purpose: '' });
  const [message, setMessage] = useState('');
  const fullName = localStorage.getItem('fullName');

  const loadData = async () => {
    const [l, s] = await Promise.all([getMyLoans(), getMySummary()]);
    setLoans(l.data);
    setSummary(s.data);
  };

  useEffect(() => { loadData(); }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await applyLoan({ amount: parseFloat(form.amount), purpose: form.purpose });
      const status = res.data.status;
      setMessage(status === 'APPROVED'
        ? '✅ Loan auto-approved!'
        : '🕐 Loan submitted for employee review.');
      setForm({ amount: '', purpose: '' });
      loadData();
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.error || 'Error applying for loan'));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f7fb' }}>
      <Header />
      <div style={{ padding: '32px 60px', flex: 1 }}>
        <h2 style={{ color: '#2B5CA8' }}>Welcome, {fullName} 👋</h2>

        {/* Summary Cards */}
        {summary && (
          <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
            {[
              { label: 'Account Balance', value: `₹${summary.accountBalance?.toLocaleString()}` },
              { label: 'Total Loans Taken', value: `₹${summary.totalLoanedAmount?.toLocaleString()}` },
              { label: 'Auto-Approve Limit', value: `₹${summary.autoApproveThreshold?.toLocaleString()}` },
              { label: 'Remaining Auto Limit', value: `₹${summary.remainingAutoApproveLimit?.toLocaleString()}` },
            ].map(c => (
              <div key={c.label} style={summaryCard}>
                <div style={{ fontSize: '13px', color: '#666' }}>{c.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#2B5CA8' }}>{c.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Form */}
        <div style={sectionCard}>
          <h3 style={{ marginBottom: '16px' }}>Apply for a Loan</h3>
          <form onSubmit={handleApply} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={labelStyle}>Amount (₹)</label>
              <input type="number" min="1" placeholder="e.g. 5000"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                style={inputStyle} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Purpose</label>
              <input placeholder="e.g. Home renovation"
                value={form.purpose}
                onChange={e => setForm({ ...form, purpose: e.target.value })}
                style={inputStyle} required />
            </div>
            <button type="submit" style={submitBtn}>APPLY</button>
          </form>
          {message && <p style={{ marginTop: '12px', fontWeight: '500' }}>{message}</p>}
        </div>

        {/* Loan History */}
        <div style={sectionCard}>
          <h3 style={{ marginBottom: '16px' }}>My Loan History</h3>
          {loans.length === 0 ? (
            <p style={{ color: '#888' }}>No loans yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2B5CA8', color: 'white' }}>
                  {['Amount', 'Purpose', 'Status', 'Applied At', 'Approved By'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loans.map((l, i) => (
                  <tr key={l.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={td}>₹{l.amount?.toLocaleString()}</td>
                    <td style={td}>{l.purpose}</td>
                    <td style={td}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600',
                        background: l.status === 'APPROVED' ? '#d4edda' : l.status === 'REJECTED' ? '#f8d7da' : '#fff3cd',
                        color: l.status === 'APPROVED' ? '#155724' : l.status === 'REJECTED' ? '#721c24' : '#856404'
                      }}>
                        {l.status}
                      </span>
                    </td>
                    <td style={td}>{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td style={td}>{l.approvedBy || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const summaryCard = {
  flex: 1, background: 'white', padding: '20px', borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderLeft: '4px solid #2B5CA8'
};
const sectionCard = {
  background: 'white', padding: '24px', borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)', marginBottom: '24px'
};
const labelStyle = { display: 'block', fontSize: '13px', marginBottom: '6px', color: '#555' };
const inputStyle = {
  padding: '10px 14px', border: '1px solid #ccc', borderRadius: '4px',
  fontSize: '14px', width: '200px'
};
const submitBtn = {
  padding: '10px 24px', background: '#2B5CA8', color: 'white',
  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', height: '40px'
};
const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '500' };
const td = { padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: '14px' };