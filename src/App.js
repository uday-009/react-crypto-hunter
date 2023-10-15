import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import {styled} from 'styled-components'
import Alert from './components/Alert';

function App() {


  return (
    <Router>
      <AppContainer>       
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} exact ></Route>
          <Route path='/coins/:id' element={<CoinPage />} ></Route>
        </Routes>
        
      </AppContainer>
      <Alert />
    </Router>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: #14161a;
  color: #fff;
  min-height: 100vh;

`
