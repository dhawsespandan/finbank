import { useEffect, useState } from 'react';
import { getPendingLoans, reviewLoan, getAllApprovedLoans, markLoanPaid } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EmployeeDashboard() {
  const [loans, setLoans] = useState([]);
  const [approvedLoans, setApprovedLoans] = useState([]);
  const fullName = localStorage.getItem('fullName');

  const load = async () => {
    const [pending, approved] = await Promise.all([getPendingLoans(), getAllApprovedLoans()]);
    setLoans(pending.data);
    setApprovedLoans(approved.data);
  };

  useEffect(() => { load(); }, []);

  const handleReview = async (id, decision) => {
    await reviewLoan(id, decision);
    load();
  };

  const handleMarkPaid = async (id) => {
    await markLoanPaid(id);
    load();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f6f1' }}>
      <Header />

      <div style={{ background: '#1a3a5c', padding: '32px 60px' }}>
        <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Employee Portal</p>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>Welcome, {fullName}</h1>
      </div>

      <div style={{ flex: 1, padding: '40px 60px' }}>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '36px' }}>
          {[
            { label: 'Pending Review', value: loans.length, icon: '🕐' },
            { label: 'Awaiting Action', value: loans.length > 0 ? 'Action Required' : 'All Clear', icon: loans.length > 0 ? '⚠️' : '✅' },
            { label: 'Total Active Loans', value: approvedLoans.filter(l => !l.paid).length, icon: '📋' },
            { label: 'Loans Paid Off', value: approvedLoans.filter(l => l.paid).length, icon: '✔️' },
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

        {/* Pending Loans Table */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>PENDING LOAN APPLICATIONS</h3>
            {loans.length > 0 && (
              <span style={{ background: '#c9a84c', color: '#1a3a5c', padding: '2px 10px', fontSize: '12px', fontWeight: '700' }}>
                {loans.length}
              </span>
            )}
          </div>

          {loans.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
              <p style={{ color: '#888', fontSize: '16px' }}>No pending loans. All caught up!</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f6f1' }}>
                  {['Customer', 'Username', 'Amount', 'Purpose', 'Applied At', 'Actions'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loans.map((l) => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ ...td, fontWeight: '600', color: '#1a3a5c' }}>{l.customerName}</td>
                    <td style={{ ...td, color: '#888', fontSize: '13px' }}>{l.customerUsername}</td>
                    <td style={{ ...td, fontWeight: '600' }}>₹{l.amount?.toLocaleString()}</td>
                    <td style={td}>{l.purpose}</td>
                    <td style={td}>{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td style={td}>
                      <button onClick={() => handleReview(l.id, 'APPROVE')}
                        style={{ ...actionBtn, background: '#1a3a5c', border: '2px solid #1a3a5c', marginRight: '8px' }}>
                        Approve
                      </button>
                      <button onClick={() => handleReview(l.id, 'REJECT')}
                        style={{ ...actionBtn, background: 'transparent', border: '2px solid #dc3545', color: '#dc3545' }}>
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Customer Loan Ledger */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>CUSTOMER LOAN LEDGER</h3>
            <span style={{ background: '#c9a84c', color: '#1a3a5c', padding: '2px 10px', fontSize: '12px', fontWeight: '700' }}>
              {approvedLoans.length}
            </span>
          </div>

          {approvedLoans.length === 0 ? (
            <p style={{ color: '#888', padding: '32px', textAlign: 'center' }}>No approved loans yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f6f1' }}>
                  {['Customer', 'Amount', 'Purpose', 'Approved By', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {approvedLoans.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ ...td, fontWeight: '600', color: '#1a3a5c' }}>{l.customerName}</td>
                    <td style={{ ...td, fontWeight: '600' }}>₹{l.amount?.toLocaleString()}</td>
                    <td style={td}>{l.purpose}</td>
                    <td style={td}>{l.approvedBy || 'AUTO'}</td>
                    <td style={td}>{new Date(l.appliedAt).toLocaleDateString()}</td>
                    <td style={td}>
                      <span style={{
                        padding: '4px 12px', fontSize: '12px', fontWeight: '600',
                        background: l.paid ? '#d4edda' : '#fff3cd',
                        color: l.paid ? '#155724' : '#856404'
                      }}>
                        {l.paid ? 'PAID' : 'OUTSTANDING'}
                      </span>
                    </td>
                    <td style={td}>
                      {!l.paid && (
                        <button onClick={() => handleMarkPaid(l.id)}
                          style={{ padding: '6px 16px', background: '#1a3a5c', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '600', fontFamily: 'inherit' }}>
                          Mark Paid
                        </button>
                      )}
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

const th = { padding: '12px 20px', textAlign: 'left', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#666', fontWeight: '600' };
const td = { padding: '14px 20px', fontSize: '14px', color: '#333' };
const actionBtn = { padding: '6px 16px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px', fontFamily: 'inherit', color: '#fff' };