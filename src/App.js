import './App.css';
import QuizHome from './Component/QuizHome';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Results from './Component/Results';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<QuizHome />} />
          <Route path='/results' element={ <Results />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
