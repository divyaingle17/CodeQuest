import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile, loginUser, registerUser } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('problems'); // problems, workspace, studyplans, contests, leaderboard, profile, admin
  const [currentSlug, setCurrentSlug] = useState('time-and-work-pipes-cisterns-efficiency');
  const [userProfile, setUserProfile] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [examState, setExamState] = useState(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('codequest_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  // Theme preference persisted in LocalStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codequest_theme') || 'dark';
  });

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('codequest_theme', theme);
    const root = document.documentElement;
    const body = document.body;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      body.classList.add('light');
      body.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      body.classList.add('dark');
      body.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loadProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setUserProfile(data);
    } catch (err) {
      console.error("Failed to load user profile", err);
    }
  };

  const handleLogin = async (email, password) => {
    const res = await loginUser(email, password);
    setCurrentUser(res.user);
    localStorage.setItem('codequest_user', JSON.stringify(res.user));
    setShowAuthModal(false);
    return res;
  };

  const handleRegister = async (email, password, username, role = 'user') => {
    const res = await registerUser(email, password, username, role);
    setCurrentUser(res.user);
    localStorage.setItem('codequest_user', JSON.stringify(res.user));
    setShowAuthModal(false);
    return res;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('codequest_user');
    setActiveTab('problems');
  };

  const toggleBookmark = (slug) => {
    setBookmarks(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const openQuestion = (slug) => {
    setCurrentSlug(slug);
    setActiveTab('workspace');
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      currentSlug,
      setCurrentSlug,
      userProfile,
      setUserProfile,
      loadProfile,
      bookmarks,
      toggleBookmark,
      openQuestion,
      examState,
      setExamState,
      theme,
      toggleTheme,
      currentUser,
      setCurrentUser,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode,
      handleLogin,
      handleRegister,
      handleLogout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
