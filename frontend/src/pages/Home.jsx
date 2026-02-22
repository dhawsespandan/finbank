import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <section style={{ display: 'flex', alignItems: 'center', padding: '40px 60px', gap: '40px' }}>
        <img
          src="https://illustrations.popsy.co/gray/digital-nomad.svg"
          alt="Bank"
          style={{ width: '500px', borderRadius: '8px' }}
        />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700' }}>Welcome to Fin Bank</h1>
          <p style={{ color: '#555', fontSize: '16px' }}>Where the world comes to bank</p>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '20px 60px 60px' }}>
        <h2 style={{ textAlign: 'center', textDecoration: 'underline', fontSize: '24px', marginBottom: '28px' }}>
          Services We Offer
        </h2>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
          {services.map(s => (
            <div key={s.title} style={cardStyle}>
              <div style={{
                background: s.color, height: '140px', borderRadius: '4px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '40px'
              }}>
                {s.icon}
              </div>
              <div style={{ padding: '12px' }}>
                <strong>{s.title}</strong>
                <p style={{ fontSize: '13px', color: '#555', margin: '6px 0 0' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

const services = [
  { title: 'Personalized Accounts', desc: 'Flexible options to adapt to your life goals and finances', icon: '📋', color: '#d4edda' },
  { title: 'Investment Advisory', desc: 'Guidance and tools to help you grow your wealth security', icon: '📈', color: '#d1ecf1' },
  { title: 'Loan Solutions', desc: 'Get loans with competitive rates and easy applications', icon: '💰', color: '#fff3cd' },
];

const cardStyle = {
  width: '260px', border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden',
  boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
};