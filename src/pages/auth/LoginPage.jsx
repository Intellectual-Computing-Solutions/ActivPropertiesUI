import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../context/AuthContext';

// Figma assets (valid for 7 days from generation)
const imgHero = 'https://www.figma.com/api/mcp/asset/eee87b35-bebf-4eda-b287-992fcb336a73';
const imgLogo = 'https://www.figma.com/api/mcp/asset/a07dc5d7-c8fa-4cc1-a12c-0283c6c6c11d';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4">
      <div
        className="w-full max-w-[1024px] h-[600px] flex gap-5 items-center justify-end
                    rounded-3xl overflow-hidden px-10 py-2.5 relative"
        style={{ background: '#fff' }}
      >
        {/* Left panel — hero illustration */}
        <div
          className="flex-1 h-full rounded-[20px] relative overflow-hidden"
          style={{
            background: 'linear-gradient(137.2deg, #efebfd 20.28%, rgba(252,233,206,0.5) 101.67%)',
          }}
        >
          <img
            src={imgHero}
            alt="Activ Properties"
            className="absolute w-[746px] left-[25px] top-[55px] object-cover"
          />
          {/* frosted footer strip */}
          <div className="absolute bottom-6 left-3.5 right-3.5 h-[103px] rounded-[20px] bg-white/20" />
        </div>

        {/* Right panel — login form */}
        <div className="flex flex-col gap-8 h-[832px] w-[559px] shrink-0 justify-center">
          {/* Logo placeholder bar */}
          <div className="bg-[#fafafd] h-[91px] rounded-[20px] w-full" />

          {/* Card */}
          <div
            className="flex flex-col gap-10 p-[30px] rounded-3xl w-full"
            style={{
              background: 'linear-gradient(180deg, #f7f9fd 0%, rgba(253,247,252,0) 100%)',
            }}
          >
            {/* Header */}
            <div className="flex flex-col gap-10 items-center w-full">
              <img src={imgLogo} alt="Activ Logo" className="w-[72px] h-[72px] object-cover" />

              <div className="flex flex-col gap-2 w-full">
                <h1
                  className="text-2xl font-bold text-[#1f2440]"
                  style={{ fontFamily: "'Nunito Sans', sans-serif" }}
                >
                  Login
                </h1>
                <div className="bg-[#f4f1fe] rounded px-3 py-1.5 w-full">
                  <p className="text-base font-medium text-[#1d252b]">
                    For security reasons please login with your credentials
                  </p>
                </div>
              </div>

              {/* Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                {/* Error banner */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                {/* Agency Domain */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-0 text-base text-black font-normal">
                    Agency Domain
                    <span className="text-[#c80909] font-medium text-sm leading-6 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. acme"
                    required
                    className="bg-white h-12 w-full rounded-lg px-[10px] text-base text-[#1d252b]
                               border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6b40ed]/30"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-start text-base text-black font-normal">
                    Email Address
                    <span className="text-[#c80909] font-medium text-sm leading-6 ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="samplename@activproperties.com"
                    required
                    className="bg-white h-12 w-full rounded-lg px-[10px] text-base text-[#1d252b]
                               border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6b40ed]/30"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-start text-base text-black font-normal">
                    Password
                    <span className="text-[#c80909] font-medium text-sm leading-6 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="bg-white h-12 w-full rounded-lg pl-4 pr-10 text-base text-[#1d252b]
                                 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6b40ed]/30"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="self-end text-base text-[#6b40ed] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6b40ed] hover:bg-[#5a33d4] disabled:opacity-60
                             text-white text-base font-medium rounded px-5 py-3.5
                             transition-colors duration-150"
                >
                  {loading ? 'Logging in…' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
