import axiosInstance from './axiosInstance';

// Base URL is https://dev.activ.properties/api
// so paths here are relative to /api (e.g. /auth/login → /api/auth/login)

/**
 * Login using Basic Auth (email:password) + X-Tenant-Id header.
 * @param {string} email
 * @param {string} password
 * @param {string} domain - agency subdomain slug (X-Tenant-Id)
 */
export async function login(email, password, domain) {
  const credentials = btoa(`${email}:${password}`);
  const response = await axiosInstance.post(
    '/auth/login',
    null,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'X-Tenant-Id': domain,
      },
    }
  );
  return response.data; // { success, message, data: LoginResponse }
}

/**
 * Logout — invalidates the JWT on the server.
 */
export async function logout() {
  const token = localStorage.getItem('token');
  if (!token) return;
  await axiosInstance.post('/auth/logout', null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/**
 * Trigger forgot-password OTP email.
 * @param {string} email
 */
export async function forgotPassword(email) {
  const response = await axiosInstance.post('/auth/password/forgot', { email });
  return response.data;
}

/**
 * Reset password using OTP.
 * @param {string} email
 * @param {string} otp
 * @param {string} newPassword
 */
export async function resetPassword(email, otp, newPassword) {
  const response = await axiosInstance.post('/auth/password/reset', {
    email,
    otp,
    newPassword,
  });
  return response.data;
}

/**
 * Get agency branding by domain slug.
 * @param {string} domain
 */
export async function getAgencyDetails(domain) {
  const response = await axiosInstance.get('/auth/agency', { params: { domain } });
  return response.data;
}
