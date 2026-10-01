import { Route, Routes } from 'react-router-dom';
import SiteLayout from './layout/SiteLayout.jsx';
import Page from './pages/Page.jsx';

// Every URL is a page stored in MongoDB: "/" → home, "/why-are-we-here" → that page, anything else → 404.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Page slug="home" />} />
        <Route path=":slug" element={<Page />} />
        <Route path="*" element={<Page slug="not-found" />} />
      </Route>
    </Routes>
  );
}
