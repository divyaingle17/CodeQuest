import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import AuthLandingPage from './pages/AuthLandingPage';
import ProblemList from './pages/ProblemList';
import ProblemWorkspace from './pages/ProblemWorkspace';
import StudyPlans from './pages/StudyPlans';
import Contests from './pages/Contests';
import ProfileDashboard from './pages/ProfileDashboard';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';

function MainContent() {
  const { activeTab, currentUser } = useApp();

  // If user is unauthenticated, show Auth Landing & Gateway Page as the primary entry screen
  if (!currentUser) {
    return <AuthLandingPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-300">
      {activeTab !== 'workspace' && <Navbar />}
      
      <main className="w-full">
        {activeTab === 'problems' && <ProblemList />}
        {activeTab === 'workspace' && <ProblemWorkspace />}
        {activeTab === 'studyplans' && <StudyPlans />}
        {activeTab === 'contests' && <Contests />}
        {activeTab === 'leaderboard' && <Leaderboard />}
        {activeTab === 'profile' && <ProfileDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
