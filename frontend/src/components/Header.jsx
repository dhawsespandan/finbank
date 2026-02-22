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
      background: '#2B5CA8',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px'
    }}>
      <span style={{ color: 'white', fontSize: '22px', fontWeight: '600', cursor: 'pointer' }}
            onClick={() => navigate('/')}>
        Fin Bank
      </span>
      <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
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
  color: 'white', textDecoration: 'underline', fontWeight: '500', cursor: 'pointer'
};
const loginBtn = {
  background: 'white', color: '#2B5CA8', border: 'none',
  padding: '8px 20px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px'
};