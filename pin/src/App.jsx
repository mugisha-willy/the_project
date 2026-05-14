import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Videos from './pages/Videos';
import VideoDetails from './pages/VideoDetails';
import PostDetails from './pages/PostDetails';
import Posts from './pages/Posts';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import ChangeCredentials from './pages/ChangeCredentials';
import Sponsorship from './pages/Sponsorship';
import Donate from './pages/Donate';
import ManageDisplayAds from './pages/admin/ManageDisplayAds';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/trending" element={<Videos />} />
        <Route path="/news" element={<Posts />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-credentials" element={<ChangeCredentials />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/admin/display-ads" element={<ManageDisplayAds />} />
        <Route path="/sponsorship" element={<Sponsorship />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;