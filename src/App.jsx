import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Books from './pages/Books';
import Edit from './pages/Edit';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import NewBook from './pages/NewBook';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/books' element={<Books />}/>
        <Route path="/edit/:id" element={<Edit />}/>
        <Route path="/newbook" element={<NewBook />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<LogIn />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
