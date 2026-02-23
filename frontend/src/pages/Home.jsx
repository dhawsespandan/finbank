import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: "'Georgia', serif", background: '#fff' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        display: 'flex', alignItems: 'stretch',
        minHeight: '520px', width: '100%'
      }}>
        <div style={{
          flex: '0 0 55%',
          background: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80") center/cover no-repeat',
          minHeight: '520px'
        }} />
        <div style={{
          flex: '0 0 45%',
          background: '#1a3a5c',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          padding: '60px 50px', textAlign: 'center'
        }}>
          <div style={{
            width: '50px', height: '3px',
            background: '#c9a84c', marginBottom: '24px'
          }} />
          <h1 style={{
            color: '#fff', fontSize: '38px',
            fontWeight: '700', margin: '0 0 16px',
            lineHeight: 1.2, letterSpacing: '0.5px'
          }}>
            Welcome to<br />Fin Bank
          </h1>
          <p style={{
            color: '#a8c4e0', fontSize: '16px',
            marginBottom: '36px', fontStyle: 'italic'
          }}>
            Where the world comes to bank
          </p>
          <div style={{
            width: '50px', height: '3px',
            background: '#c9a84c', marginBottom: '36px'
          }} />
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'transparent', border: '2px solid #c9a84c',
              color: '#c9a84c', padding: '14px 40px',
              fontSize: '14px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.target.style.background = '#c9a84c';
              e.target.style.color = '#1a3a5c';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#c9a84c';
            }}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        background: '#c9a84c', padding: '20px 0',
        display: 'flex', justifyContent: 'space-around',
        alignItems: 'center', width: '100%'
      }}>
        {[
          { num: '50,000+', label: 'Customers Served' },
          { num: '₹500Cr+', label: 'Loans Disbursed' },
          { num: '99.9%', label: 'Uptime Reliability' },
          { num: '24/7', label: 'Customer Support' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a3a5c' }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: '#1a3a5c', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Services Section */}
      <section style={{ background: '#f8f6f1', padding: '80px 0', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            color: '#c9a84c', fontSize: '13px',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px'
          }}>What We Offer</p>
          <h2 style={{
            fontSize: '34px', fontWeight: '700',
            color: '#1a3a5c', margin: 0
          }}>Services We Offer</h2>
          <div style={{
            width: '60px', height: '3px',
            background: '#c9a84c', margin: '16px auto 0'
          }} />
        </div>

        <div style={{
          display: 'flex', gap: '0',
          maxWidth: '100%', padding: '0 60px',
          justifyContent: 'center'
        }}>
          {[
            {
              icon: '🏦',
              title: 'Personalized Accounts',
              desc: 'Flexible account options designed to adapt to your life goals and financial needs. Savings, current, and fixed deposit accounts tailored for you.',
              img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80'
            },
            {
              icon: '📊',
              title: 'Investment Advisory',
              desc: 'Expert guidance and professional tools to help you grow your wealth securely. Strategic investment planning for a financially sound future.',
              img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&q=80'
            },
            {
              icon: '💼',
              title: 'Loan Solutions',
              desc: 'Get loans with competitive interest rates and a seamless application process. Home, personal, and business loans processed swiftly.',
              img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80'
            },
          ].map((s, i) => (
            <div key={s.title} style={{
              flex: '1', maxWidth: '380px',
              background: '#fff',
              margin: '0 16px',
              boxShadow: '0 4px 24px rgba(26,58,92,0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26,58,92,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(26,58,92,0.08)';
              }}
            >
              <div style={{
                height: '200px',
                background: `url("${s.img}") center/cover no-repeat`
              }} />
              <div style={{
                borderTop: '4px solid #c9a84c',
                padding: '28px'
              }}>
                <h3 style={{
                  color: '#1a3a5c', fontSize: '18px',
                  marginBottom: '12px', fontWeight: '700'
                }}>{s.title}</h3>
                <p style={{
                  color: '#666', fontSize: '14px',
                  lineHeight: '1.7', margin: 0
                }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section style={{
        width: '100%', position: 'relative', overflow: 'hidden'
      }}>
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
          alt="Security"
          style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block', filter: 'brightness(0.3)' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '40px'
        }}>
          <p style={{
            color: '#c9a84c', fontSize: '13px',
            letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px'
          }}>Your Safety, Our Priority</p>
          <h2 style={{
            color: '#fff', fontSize: '38px',
            fontWeight: '700', marginBottom: '20px'
          }}>SECURITY</h2>
          <div style={{ width: '60px', height: '3px', background: '#c9a84c', marginBottom: '24px' }} />
          <p style={{
            color: '#ccc', fontSize: '16px',
            maxWidth: '700px', lineHeight: '1.8'
          }}>
            At Fin Bank, your security is our top priority. We utilize advanced encryption
            technologies and multi-factor authentication to ensure your financial information
            is always safe. Our dedicated team monitors accounts 24/7 to protect against
            fraud and unauthorized access. Trust us to keep your assets secure as you bank with confidence.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: '#1a3a5c', padding: '80px 60px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Our Advantage</p>
          <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#fff', margin: 0 }}>Why Choose Fin Bank?</h2>
          <div style={{ width: '60px', height: '3px', background: '#c9a84c', margin: '16px auto 0' }} />
        </div>
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '🔒', title: 'Bank-Grade Security', desc: 'End-to-end encryption and real-time fraud monitoring.' },
            { icon: '⚡', title: 'Instant Processing', desc: 'Lightning-fast loan approvals and account services.' },
            { icon: '🤝', title: 'Dedicated Support', desc: '24/7 customer care team at your service.' },
            { icon: '📱', title: 'Digital First', desc: 'Manage everything from our seamless online platform.' },
          ].map(w => (
            <div key={w.title} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '36px 28px', width: '220px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{w.icon}</div>
              <h4 style={{ color: '#c9a84c', fontSize: '15px', marginBottom: '10px', fontWeight: '700' }}>{w.title}</h4>
              <p style={{ color: '#a8c4e0', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}