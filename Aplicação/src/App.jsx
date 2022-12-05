import './App.css';
import AppRoutes from './AppRoutes';
import {ReactSession} from 'react-client-session'

function App() {
  ReactSession.setStoreType("localStorage");
  return (
    <div className="app">
      <AppRoutes />
    </div>
  );
}

export default App;
