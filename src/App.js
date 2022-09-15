import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './pages/Layout.js';
import { DicePage } from './pages/DicePage.js';
import { Home } from './pages/Home.js';
import { CharacterCreator } from './pages/CharacterCreator.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="charcreate" element={<CharacterCreator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
