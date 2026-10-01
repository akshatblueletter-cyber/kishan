import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Option B fonts (self-hosted via npm)
import '@fontsource/dm-serif-display/400.css';
import '@fontsource/dm-serif-display/400-italic.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/600.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/800.css';

import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/page.css';
import './styles/blocks.css';
import './styles/overlays.css';
import './styles/landing.css';

import App from './App.jsx';
import { StepsProvider } from './context/StepsContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StepsProvider>
        <App />
      </StepsProvider>
    </BrowserRouter>
  </StrictMode>
);
