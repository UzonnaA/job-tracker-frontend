
export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const { token, username: returnedUsername } = await res.json();
  if (!token || !returnedUsername) throw new Error('Invalid login response');

  localStorage.setItem('token', token);
  localStorage.setItem('username', returnedUsername);
  return token;
}



export async function register(username: string, password: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || 'Registration failed')
  }
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

// Helper to get headers with Authorization token
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

export async function getApplications(): Promise<any[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (res.status === 403) {
    logout()
    window.location.href = '/login'
    return []
  }

  if (!res.ok) {
    throw new Error('Failed to fetch applications');
  }

  return await res.json();
}

export async function createApplication(application: any): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(application),
  });

  if (!res.ok) {
    throw new Error('Failed to create application');
  }

  return await res.json();
}




