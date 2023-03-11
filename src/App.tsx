import { Navigate, Route, Routes } from 'react-router-dom';
import { Homepage } from './Pages/Homepage';
import './App.scss';
import { CharacterPage } from './Pages/CharacterPage';
import { PageNotFound } from './Pages/PageNotFound';
import { SignIn } from './Pages/SignIn';
import { AuthContextProvider } from './context/AuthContext';
import { Navbar } from './Components/Navbar';

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <div className="App App__container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/login" element={<Navigate to="/sign-in" replace />} />
          <Route path=":id" element={<CharacterPage />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
};

export default App;
