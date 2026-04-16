import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

// Figma assets — valid 7 days from generation
const imgHero    = 'https://www.figma.com/api/mcp/asset/eee87b35-bebf-4eda-b287-992fcb336a73';
const imgLogo    = 'https://www.figma.com/api/mcp/asset/a07dc5d7-c8fa-4cc1-a12c-0283c6c6c11d';

export default function LoginPage() {
  const navigate  = useNavigate();
  const { signIn } = useAuth();

  // Extract agency domain from subdomain: acme.activ.properties → "acme"
  const domain = window.location.hostname.split('.')[0];

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login(email, password, domain);
      const { token, user } = res.data;
      signIn(token, user);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0edf8', padding: '24px' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1040px',
          display: 'flex',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(107,64,237,0.12)',
          background: '#fff',
          minHeight: '600px',
        }}
      >
        {/* ── Left: Hero panel ── */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(137deg, #efebfd 20%, rgba(252,233,206,0.5) 100%)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '600px',
          }}
        >
          <img
            src={imgHero}
            alt="Activ Properties"
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '460px',
              objectFit: 'contain',
            }}
          />
          {/* frosted strip */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              height: '80px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(8px)',
            }}
          />
          <div style={{ position: 'absolute', top: '32px', left: '32px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1f2440', fontFamily: "'Nunito Sans', sans-serif" }}>
              Activ Properties
            </span>
          </div>
        </div>

        {/* ── Right: Login form ── */}
        <div
          style={{
            width: '460px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '48px 40px',
            background: 'linear-gradient(180deg, #f7f9fd 0%, #fff 100%)',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <img
              src={imgLogo}
              alt="Activ Logo"
              style={{ width: '64px', height: '64px', objectFit: 'contain' }}
            />
          </div>

          {/* Heading */}
          <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 700, color: '#1f2440', fontFamily: "'Nunito Sans', sans-serif" }}>
            Login
          </h1>
          <div style={{ background: '#f4f1fe', borderRadius: '4px', padding: '8px 12px', marginBottom: '28px' }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#1d252b', fontFamily: "'Nunito Sans', sans-serif" }}>
              For security reasons please login with your credentials
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: '#fff0f0', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#dc2626', fontFamily: "'Nunito Sans', sans-serif" }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Email Address <span style={{ color: '#c80909' }}>*</span></label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@activproperties.com"
                required
                style={inputStyle}
                onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(107,64,237,0.2)'}
                onBlur={e => e.target.style.boxShadow = 'none'}
              />
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Password <span style={{ color: '#c80909' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  style={{ ...inputStyle, paddingRight: '44px' }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(107,64,237,0.2)'}
                  onBlur={e => e.target.style.boxShadow = 'none'}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0 }}
                >
                  {showPwd ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#6b40ed', fontSize: '14px', cursor: 'pointer', padding: 0, fontFamily: "'Nunito Sans', sans-serif" }}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#a78bfa' : '#6b40ed',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '14px 20px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Nunito Sans', sans-serif",
                transition: 'background 0.15s',
                marginTop: '4px',
              }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#5a33d4'; }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#6b40ed'; }}
            >
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: '14px',
  fontWeight: 500,
  color: '#1d252b',
  fontFamily: "'Nunito Sans', sans-serif",
};

const inputStyle = {
  width: '100%',
  height: '48px',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '0 14px',
  fontSize: '15px',
  color: '#1d252b',
  background: '#fff',
  outline: 'none',
  fontFamily: "'Nunito Sans', sans-serif",
  transition: 'box-shadow 0.15s',
};

function EyeIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}
