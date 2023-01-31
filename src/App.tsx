import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { DefaultRouter } from './routes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <DefaultRouter />
      </Router>
    </Provider>
  );
}

export default App;
