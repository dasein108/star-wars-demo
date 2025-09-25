import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import UnderDevelopmentPage from './pages/UnderDevelopmentPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { darkTheme } from './theme/theme';
import { ErrorDisplay } from './components/common/ErrorDisplay';
import { ToastProvider } from './components/common/Toast';

// 404 Page component
const NotFoundPage = () => (
  <ErrorDisplay error="Page not found" />
);

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastProvider>
        <ErrorBoundary>
          <Router>
            <Box 
              component="main" 
              id="main-content"
              sx={{ 
                // mt: { xs: 7, sm: 8 }, // Account for fixed header height
                minHeight: 'calc(100vh - 64px)', // Ensure full viewport coverage
              }}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/character/:id" element={<DetailPage />} />
                <Route path="/under-development" element={<UnderDevelopmentPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>
          </Router>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
