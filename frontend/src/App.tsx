import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import ResultPage from './pages/ResultPage';

function App() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Only show search bar on home page
  const showSearch = location.pathname === '/';

  return (
    <Layout 
      searchQuery={showSearch ? searchQuery : undefined}
      onSearchChange={showSearch ? setSearchQuery : undefined}
    >
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
        <Route path="/experience/:id" element={<DetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/result/:reference" element={<ResultPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
