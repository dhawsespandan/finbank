import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f6f1' }}>
      <Header />

      {/* Hero */}
      <div style={{ background: '#1a3a5c', padding: '60px', textAlign: 'center' }}>
        <p style={{ color: '#c9a84c', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Who We Are</p>
        <h1 style={{ color: '#fff', fontSize: '38px', fontWeight: '700', margin: '0 0 16px' }}>About Fin Bank</h1>
        <div style={{ width: '60px', height: '3px', background: '#c9a84c', margin: '0 auto 20px' }} />
        <p style={{ color: '#a8c4e0', fontSize: '16px', maxWidth: '600px', margin: '0 auto', fontStyle: 'italic' }}>
          A modern digital banking platform built for transparency, speed, and trust.
        </p>
      </div>

      <div style={{ padding: '60px', maxWidth: '900px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* About the Project */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>ABOUT THE PROJECT</h3>
          </div>
          <div style={{ padding: '32px', lineHeight: '1.9', color: '#444', fontSize: '15px' }}>
            <p>
              Fin Bank is a full-stack loan management web application built as a demonstration of modern
              banking workflows. It features role-based access for customers, employees, and managers,
              with a clean and professional interface designed for ease of use.
            </p>
            <br />
            <p>
              The platform is built using <strong style={{ color: '#1a3a5c' }}>Spring Boot 4</strong> on the backend
              with <strong style={{ color: '#1a3a5c' }}>MongoDB Atlas</strong> as the database, and
              <strong style={{ color: '#1a3a5c' }}> React (Vite)</strong> on the frontend. It is deployed
              on <strong style={{ color: '#1a3a5c' }}>Render</strong> (backend) and
              <strong style={{ color: '#1a3a5c' }}> Vercel</strong> (frontend), with JWT-based authentication
              securing all routes.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>HOW IT WORKS</h3>
          </div>
          <div style={{ padding: '32px' }}>
            {[
              {
                role: 'Customer',
                color: '#1a3a5c',
                points: [
                  'Register with a username starting with cus (e.g. cus000001)',
                  'Each login generates a random account balance between ₹50,000 and ₹2,00,000',
                  'Apply for loans at any time from the dashboard',
                  'View full loan history including approved, rejected, and paid loans',
                ]
              },
              {
                role: 'Employee',
                color: '#856404',
                points: [
                  'Created exclusively by the Manager — cannot self-register',
                  'Reviews all pending loan applications from customers',
                  'Can approve or reject any pending loan',
                  'Maintains the Customer Loan Ledger and marks loans as paid',
                  'Marking a loan as paid reduces the customer\'s total loan amount',
                ]
              },
              {
                role: 'Manager',
                color: '#155724',
                points: [
                  'Single fixed account: username man123456',
                  'Responsible for creating and managing employee accounts',
                  'Has a dedicated dashboard to view all current employees',
                  'Employee usernames must start with emp (e.g. emp000001)',
                ]
              },
            ].map(section => (
              <div key={section.role} style={{ marginBottom: '28px' }}>
                <h4 style={{ color: section.color, fontSize: '15px', fontWeight: '700', marginBottom: '12px', letterSpacing: '0.5px' }}>
                  {section.role}
                </h4>
                {section.points.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#c9a84c', fontWeight: '700', marginTop: '2px' }}>—</span>
                    <span style={{ color: '#555', fontSize: '14px', lineHeight: '1.7' }}>{p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Loan Rules */}
        <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(26,58,92,0.08)', overflow: 'hidden', marginBottom: '32px' }}>
          <div style={{ background: '#1a3a5c', padding: '16px 28px' }}>
            <h3 style={{ color: '#fff', margin: 0, fontSize: '16px', letterSpacing: '1px' }}>LOAN APPROVAL RULES</h3>
          </div>
          <div style={{ padding: '32px', fontSize: '14px', color: '#555', lineHeight: '1.9' }}>
            <p style={{ marginBottom: '16px' }}>
              Fin Bank uses a smart auto-approval system based on each customer's account balance at the time of login:
            </p>
            <div style={{
              background: '#f8f6f1', border: '1px solid #e0d9c8',
              borderLeft: '4px solid #c9a84c', padding: '20px 24px', marginBottom: '20px'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: '#1a3a5c', fontSize: '15px' }}>
                Auto-Approve Limit = 10% of Account Balance
              </p>
            </div>
            <p style={{ marginBottom: '10px' }}>
              If the customer's <strong>cumulative loan total</strong> (including the new request) stays below this 10% threshold, the loan is <strong style={{ color: '#155724' }}>automatically approved</strong> instantly.
            </p>
            <p style={{ marginBottom: '10px' }}>
              If it exceeds the threshold, the loan is marked as <strong style={{ color: '#856404' }}>PENDING</strong> and routed to an employee for manual review.
            </p>
            <p>
              Once an employee marks a loan as <strong style={{ color: '#004085' }}>PAID</strong>, that amount is deducted from the customer's total loan balance, potentially freeing up auto-approval capacity again.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ background: '#1a3a5c', padding: '36px', boxShadow: '0 2px 12px rgba(26,58,92,0.08)' }}>
          <h3 style={{ color: '#c9a84c', margin: '0 0 24px', fontSize: '16px', letterSpacing: '1px' }}>TECHNOLOGY STACK</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['Spring Boot 4', 'MongoDB Atlas', 'React (Vite)', 'JWT Authentication', 'Render', 'Vercel', 'Docker', 'Spring Security'].map(tech => (
              <span key={tech} style={{
                background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
                color: '#c9a84c', padding: '6px 16px', fontSize: '13px', letterSpacing: '0.5px'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}