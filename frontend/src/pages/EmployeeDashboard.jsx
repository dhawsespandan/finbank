import { useEffect, useState } from 'react';
import { getPendingLoans, reviewLoan } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EmployeeDashboard() {
  const [loans, setLoans] = useState([]);
  const fullName = localStorage.getItem('fullName');

  const load = async () => {
    const res = await getPendingLoans();
    setLoans(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleReview = async (id, decision) => {
    await reviewLoan(id, decision);
    load();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f5f7fb' }}>
      <Header />
      <div style={{ padding: '32px 60px', flex: 1 }}>
        <h2 style={{ color: '#2B5CA8' }}>Employee Dashboard — {fullName}</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>Review pending loan applications below.</p>

        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: '16px' }}>
            Pending Loans
            <span style={{
              marginLeft: '12px', background: '#fff3cd', color: '#856404',
              padding: '2px 10px', borderRadius: '12px', fontSize: '13px'
            }}>
              {loans.length}
            </span>
          </h3>

          {loans.length === 0 ? (
            <p style={{ color: '#888' }}>No pending loans. All caught up! ✅</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2B5CA8', color: 'white' }}>
                  {['Customer', 'Amount', 'Purpose', 'Applied At', 'Actions'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loans.map((l, i) => (
                  <tr key={l.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                    <td style={td}>
                      <div style={{ fontWeight: '600' }}>{l.customerName}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{l.customerUsername}</div>
                    </td>
                    <td style={td}>₹{l.amount?.toLocaleString()}</td>
                    <td style={td}>{l.purpose}</td>
                    <td style={td}>{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td style={td}>
                      <button
                        onClick={() => handleReview(l.id, 'APPROVE')}
                        style={{ ...actionBtn, background: '#28a745' }}>
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReview(l.id, 'REJECT')}
                        style={{ ...actionBtn, background: '#dc3545', marginLeft: '8px' }}>
                        ❌ Reject
                      </button>
                    </td>
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

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '500' };
const td = { padding: '12px 16px', borderBottom: '1px solid #eee', fontSize: '14px' };
const actionBtn = {
  padding: '6px 14px', color: 'white', border: 'none',
  borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600'
};