import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const dashboardPath = role === 'CUSTOMER' ? '/customer' : '/employee';

  return (
    <header style={{
      background: '#1a3a5c',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 100
    }}>
      <span
        onClick={() => navigate('/')}
        style={{ color: 'white', fontSize: '22px', fontWeight: '700', cursor: 'pointer', letterSpacing: '1px', fontFamily: 'Georgia, serif' }}>
        Fin Bank
      </span>
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <a href="/" style={navLink}>HOME</a>
        <a href="/about" style={navLink}>ABOUT US</a>
        {token ? (
          <>
            <a href={dashboardPath} style={navLink}>DASHBOARD</a>
            <button onClick={handleLogout} style={loginBtn}>LOGOUT</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} style={loginBtn}>LOGIN</button>
        )}
      </nav>
    </header>
  );
}

const navLink = {
  color: 'white', textDecoration: 'underline',
  fontWeight: '500', cursor: 'pointer',
  fontSize: '13px', letterSpacing: '1px'
};
const loginBtn = {
  background: 'white', color: '#1a3a5c',
  border: 'none', padding: '8px 24px',
  fontWeight: '700', cursor: 'pointer',
  fontSize: '13px', letterSpacing: '1px',
  fontFamily: 'Georgia, serif'
};