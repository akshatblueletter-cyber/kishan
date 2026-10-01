import { createContext, useContext } from 'react';

// The current page’s title + subtitle, shown in the centre of the header.
// Each page sets it when it loads; the header reads it.
export const DEFAULT_META = {
  title: 'Understanding the Human Journey',
  subtitle: 'Ancient Wisdom · Modern Science · Lived Experience',
};

export const PageMetaContext = createContext({ meta: DEFAULT_META, setMeta: () => {} });
export const usePageMeta = () => useContext(PageMetaContext);
