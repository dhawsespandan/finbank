import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE = import.meta.env.VITE_API_URL || 'https://finbank-backend-zirx.onrender.com/api';

export default function ManagerDashboard() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ username: '', password: '', fullName: '' });
  const [message, setMessage] = useState('');
  const [msgType, setMsgType] = useState('');
  const fullName = localStorage.getItem('fullName');
  const token = localStorage.getItem('token');

  const headers = { Authorization: `Bearer ${token}` };

  const loadEmployees = async () => {
    const res = await axios.get(`${API_BASE}/manager/employees`, { headers });
    setEmployees(res.data);
  };

  useEffect(() => { loadEmployees(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!form.username.startsWith('emp')) {
      setMsgType('error');
      setMessage('Employee username must start with emp');
      return;
    }
    try {
      await axios.post(`${API_BASE}/manager/create-employee`, form, { headers });
      setMsgType('success');
      setMessage(`Employee ${form.username} created successfully!`);
      setForm({ username: '', password: '', fullName: '' });
      loadEmployees();
    } catch (err) {
      setMsgType('error');
      setMessage(err.response?.data?.error || 'Error creating employee');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f6f1' }}>
      <Header />

      <div style={{ background: '#1a3a5c', padding: '32px 60px' }}>
        <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Manager Portal</p>
        <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 }}>Welcome, {fullName}</h1>
      </div>

      <div style={{ flex: 1, padding: '40px 60px' }}>

        {/* Create Employee Form */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>CREATE NEW EMPLOYEE</h3>
          </div>
          <div style={{ padding: '28px' }}>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input placeholder="e.g. John Smith"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Username (empXXXXXX)</label>
                <input placeholder="e.g. emp000001"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value.toLowerCase() })}
                  style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" placeholder="Set password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  style={inputStyle} required />
              </div>
              <button type="submit" style={submitBtn}>CREATE EMPLOYEE</button>
            </form>
            {message && (
              <div style={{
                marginTop: '16px', padding: '12px 16px', fontSize: '14px',
                background: msgType === 'success' ? '#d4edda' : '#f8d7da',
                color: msgType === 'success' ? '#155724' : '#721c24',
                borderLeft: `4px solid ${msgType === 'success' ? '#28a745' : '#dc3545'}`
              }}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Employees List */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>CURRENT EMPLOYEES</h3>
            <span style={{ background: '#c9a84c', color: '#1a3a5c', padding: '2px 10px', fontSize: '12px', fontWeight: '700' }}>
              {employees.length}
            </span>
          </div>
          {employees.length === 0 ? (
            <p style={{ color: '#888', padding: '32px', textAlign: 'center' }}>No employees yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f6f1' }}>
                  {['Full Name', 'Username', 'Role'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((e, i) => (
                  <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ ...td, fontWeight: '600', color: '#1a3a5c' }}>{e.fullName}</td>
                    <td style={td}>{e.username}</td>
                    <td style={td}>
                      <span style={{ background: '#d4edda', color: '#155724', padding: '4px 12px', fontSize: '12px', fontWeight: '600' }}>
                        EMPLOYEE
                      </span>
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

const labelStyle = { display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' };
const inputStyle = { padding: '10px 14px', border: '1px solid #ddd', fontSize: '14px', width: '200px', outline: 'none', fontFamily: 'inherit' };
const submitBtn = { padding: '10px 28px', background: '#1a3a5c', color: 'white', border: '2px solid #1a3a5c', cursor: 'pointer', fontWeight: '600', fontSize: '13px', letterSpacing: '1px', fontFamily: 'inherit', height: '42px' };
const th = { padding: '12px 20px', textAlign: 'left', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', color: '#666', fontWeight: '600' };
const td = { padding: '14px 20px', fontSize: '14px', color: '#333' };