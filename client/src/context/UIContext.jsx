import { createContext, useContext } from 'react';

// Lets any component open the ☰ menu or the search panel
// (e.g. the “All steps” button on phones).
export const UIContext = createContext({ openMenu: () => {}, openSearch: () => {} });
export const useUI = () => useContext(UIContext);
