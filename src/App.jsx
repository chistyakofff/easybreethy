import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ExercisePage } from './pages/ExercisePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/exercise/:id" element={<ExercisePage />} />
      </Route>
    </Routes>
  );
}
