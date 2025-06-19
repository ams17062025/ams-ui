import logo from './logo.svg';
import './App.css';
import Header from './pages/Header';
import CodeList from './pages/CodeList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="codelist" element={<CodeList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
