const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const safeFetchJson = async (url, options) => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      data = { error: text || `HTTP Error ${res.status}` };
    }

    if (!res.ok) {
      throw new Error(data?.error || `Server error (${res.status}). Please try again.`);
    }
    return data;
  } catch (err) {
    if (err.name === 'SyntaxError') {
      throw new Error("Server response error. Please try again.");
    }
    throw err;
  }
};

export const loginUser = async (email, password) => {
  return safeFetchJson(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
};

export const registerUser = async (email, password, username, role = 'user') => {
  return safeFetchJson(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username, role })
  });
};

export const fetchAdminUsers = async () => {
  return safeFetchJson(`${API_BASE_URL}/admin/users`);
};

export const createAdminQuestion = async (questionData) => {
  return safeFetchJson(`${API_BASE_URL}/admin/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionData)
  });
};

export const deleteAdminQuestion = async (questionId) => {
  return safeFetchJson(`${API_BASE_URL}/admin/questions/${questionId}`, {
    method: 'DELETE'
  });
};

export const fetchQuestions = async (filters = {}) => {
  const queryParams = new URLSearchParams();
  if (filters.category && filters.category !== 'All') queryParams.append('category', filters.category);
  if (filters.difficulty && filters.difficulty !== 'All') queryParams.append('difficulty', filters.difficulty);
  if (filters.examTag && filters.examTag !== 'All') queryParams.append('examTag', filters.examTag);
  if (filters.search) queryParams.append('search', filters.search);

  return safeFetchJson(`${API_BASE_URL}/questions?${queryParams.toString()}`);
};

export const fetchQuestionBySlug = async (slug) => {
  return safeFetchJson(`${API_BASE_URL}/questions/${slug}`);
};

export const submitQuestionAnswer = async (slug, selectedOption, timeSpentSeconds) => {
  return safeFetchJson(`${API_BASE_URL}/questions/${slug}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ selectedOption, timeSpentSeconds })
  });
};

export const fetchAiExplanation = async (questionTitle, questionStatement, userQuery) => {
  return safeFetchJson(`${API_BASE_URL}/ai/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questionTitle, questionStatement, userQuery })
  });
};

export const fetchStudyPlans = async () => {
  return safeFetchJson(`${API_BASE_URL}/studyplans`);
};

export const fetchContests = async () => {
  return safeFetchJson(`${API_BASE_URL}/contests`);
};

export const fetchUserProfile = async () => {
  return safeFetchJson(`${API_BASE_URL}/user/profile`);
};
