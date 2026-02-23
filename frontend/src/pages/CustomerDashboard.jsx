import { useEffect, useState } from 'react';
import { applyLoan, getMyLoans, getMySummary } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CustomerDashboard() {
  const [loans, setLoans] = useState([]);
  const [summary, setSummary] = useState(null);
  const [form, setForm] = useState({ amount: '', purpose: '' });
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
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
      setMsgType(status === 'APPROVED' ? 'success' : 'pending');
      setMessage(status === 'APPROVED' ? 'Loan auto-approved successfully!' : 'Loan submitted for employee review.');
      setForm({ amount: '', purpose: '' });
      loadData();
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.error || 'Error applying for loan');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f6f1' }}>
      <Header />

      <div style={{ background: '#1a3a5c', padding: '32px 60px' }}>
        <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Customer Portal</p>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>Welcome, {fullName}</h1>
      </div>

      <div style={{ flex: 1, padding: '40px 60px' }}>

        {/* Summary Cards */}
        {summary && (
          <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
            {[
              { label: 'Account Balance', value: `₹${summary.accountBalance?.toLocaleString()}`, icon: '🏦' },
              { label: 'Total Loans Taken', value: `₹${summary.totalLoanedAmount?.toLocaleString()}`, icon: '📋' },
              { label: 'Auto-Approve Limit', value: `₹${summary.autoApproveThreshold?.toLocaleString()}`, icon: '✅' },
              { label: 'Remaining Auto Limit', value: `₹${summary.remainingAutoApproveLimit?.toLocaleString()}`, icon: '💰' },
            ].map(c => (
              <div key={c.label} style={{
                flex: 1, background: '#fff',
                borderTop: '4px solid #c9a84c',
                padding: '24px 20px',
                boxShadow: '0 2px 12px rgba(26,58,92,0.08)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon}</div>
                <div style={{ fontSize: '12px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{c.label}</div>
                <div style={{ fontSize: '22px', fontWeight: '700', color: '#1a3a5c' }}>{c.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Apply Form */}
        <div style={{ background: '#fff', marginBottom: '32px', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>APPLY FOR A LOAN</h3>
          </div>
          <div style={{ padding: '28px' }}>
            <form onSubmit={handleApply} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <label style={labelStyle}>Amount (₹)</label>
                <input type="number" min="1" placeholder="e.g. 5000"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  style={inputStyle} required />
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={labelStyle}>Purpose</label>
                <input placeholder="e.g. Home renovation"
                  value={form.purpose}
                  onChange={e => setForm({ ...form, purpose: e.target.value })}
                  style={{ ...inputStyle, width: '100%' }} required />
              </div>
              <button type="submit" style={submitBtn}>SUBMIT APPLICATION</button>
            </form>
            {message && (
              <div style={{
                marginTop: '16px', padding: '12px 16px',
                background: msgType === 'success' ? '#d4edda' : msgType === 'error' ? '#f8d7da' : '#fff3cd',
                color: msgType === 'success' ? '#155724' : msgType === 'error' ? '#721c24' : '#856404',
                fontSize: '14px', borderLeft: `4px solid ${msgType === 'success' ? '#28a745' : msgType === 'error' ? '#dc3545' : '#ffc107'}`
              }}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Loan History */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>MY LOAN HISTORY</h3>
          </div>
          {loans.length === 0 ? (
            <p style={{ color: '#888', padding: '32px 28px', textAlign: 'center' }}>No loan applications yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f6f1' }}>
                  {['Amount', 'Purpose', 'Status', 'Applied At', 'Reviewed By'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loans.map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={td}>₹{l.amount?.toLocaleString()}</td>
                    <td style={td}>{l.purpose}</td>
                    <td style={td}>
                      <span style={{
                        padding: '4px 12px', fontSize: '12px', fontWeight: '600',
                        letterSpacing: '0.5px', textTransform: 'uppercase',
                        background: l.paid ? '#cce5ff'
                                  : l.status === 'APPROVED' ? '#d4edda'
                                  : l.status === 'REJECTED' ? '#f8d7da' : '#fff3cd',
                        color: l.paid ? '#004085'
                             : l.status === 'APPROVED' ? '#155724'
                             : l.status === 'REJECTED' ? '#721c24' : '#856404',
                      }}>
                        {l.paid ? 'PAID' : l.status}
                      </span>
                    </td>
                    <td style={td}>{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td style={td}>{l.approvedBy || l.rejectedBy || '—'}</td>
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

const labelStyle = { display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' };
const inputStyle = { padding: '10px 14px', border: '1px solid #ddd', fontSize: '14px', width: '200px', outline: 'none', fontFamily: 'inherit' };
const submitBtn = { padding: '10px 28px', background: '#1a3a5c', color: 'white', border: '2px solid #1a3a5c', cursor: 'pointer', fontWeight: '600', fontSize: '13px', letterSpacing: '1px', fontFamily: 'inherit', height: '42px' };
const th = { padding: '12px 20px', textAlign: 'left', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#666', fontWeight: '600' };
const td = { padding: '14px 20px', fontSize: '14px', color: '#333' };