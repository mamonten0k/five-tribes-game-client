import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DefaultRouter } from './routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DefaultRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
