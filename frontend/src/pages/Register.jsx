import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '', fullName: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const u = form.username;
    if (!u.startsWith('cus') && !u.startsWith('emp')) {
      setError('Username must start with cus (customer) or emp (employee)');
      return;
    }
    try {
      const res = await register(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('fullName', res.data.fullName);
      navigate(res.data.role === 'CUSTOMER' ? '/customer' : '/employee');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={formCard}>
          <h2 style={{ color: '#2B5CA8', marginBottom: '8px' }}>Create Account</h2>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '24px' }}>
            Use <b>cusXXXXXX</b> for customer &nbsp;|&nbsp; <b>empXXXXXX</b> for employee
          </p>
          <form onSubmit={handleSubmit}>
            <input placeholder="Full Name"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
              style={inputStyle} required />
            <input placeholder="Username (e.g. cus000001)"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value.toLowerCase() })}
              style={inputStyle} required />
            <input type="password" placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={inputStyle} required />
            {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
            <button type="submit" style={submitBtn}>REGISTER</button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
            Already have an account? <a href="/login" style={{ color: '#2B5CA8' }}>Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const formCard = {
  background: 'white', padding: '40px', borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '380px'
};
const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '16px',
  border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box'
};
const submitBtn = {
  width: '100%', padding: '12px', background: '#2B5CA8', color: 'white',
  border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', fontWeight: '600'
};