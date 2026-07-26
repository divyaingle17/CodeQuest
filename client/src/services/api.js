const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const registerUser = async (email, password, username, role = 'user') => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username, role })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const fetchAdminUsers = async () => {
  const res = await fetch(`${API_BASE_URL}/admin/users`);
  return res.json();
};

export const createAdminQuestion = async (questionData) => {
  const res = await fetch(`${API_BASE_URL}/admin/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to create question');
  return data;
};

export const deleteAdminQuestion = async (questionId) => {
  const res = await fetch(`${API_BASE_URL}/admin/questions/${questionId}`, {
    method: 'DELETE'
  });
  return res.json();
};

export const fetchQuestions = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
  if (filters.difficulty && filters.difficulty !== 'All') queryParams.append('difficulty', filters.difficulty);
  if (filters.examTag && filters.examTag !== 'All') queryParams.append('examTag', filters.examTag);
  if (filters.search) queryParams.append('search', filters.search);

  const res = await fetch(`${API_BASE_URL}/questions?${queryParams.toString()}`);
  return res.json();
};

export const fetchQuestionBySlug = async (slug) => {
  const res = await fetch(`${API_BASE_URL}/questions/${slug}`);
  return res.json();
};

export const submitQuestionAnswer = async (slug, selectedOption, timeSpentSeconds) => {
  const res = await fetch(`${API_BASE_URL}/questions/${slug}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedOption, timeSpentSeconds })
  });
  return res.json();
};

export const fetchAiExplanation = async (questionTitle, questionStatement, userQuery) => {
  const res = await fetch(`${API_BASE_URL}/ai/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionTitle, questionStatement, userQuery })
  });
  return res.json();
};

export const fetchStudyPlans = async () => {
  const res = await fetch(`${API_BASE_URL}/studyplans`);
  return res.json();
};

export const fetchContests = async () => {
  const res = await fetch(`${API_BASE_URL}/contests`);
  return res.json();
};

export const fetchUserProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/user/profile`);
  return res.json();
};
