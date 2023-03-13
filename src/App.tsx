import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { DefaultRouter } from './routes';
import { persistor, store } from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <DefaultRouter />
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
