import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Layout from './components/Layout';
import Auth from './components/Auth';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Router } from 'react-router-dom';

const AppContent = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        {isAuthenticated ? <Layout /> : <Auth />}
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;