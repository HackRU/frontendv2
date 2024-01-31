'use client';
import { useEffect } from 'react';

import '@/node_modules/@waaark/luge/dist/css/luge.css';

const LugeReact = () => {
  useEffect(() => {
    import('@waaark/luge/dist/js/luge')
      .then((luge) => {
        luge.lifecycle.refresh();
      })
      .catch((error) => console.error(error));
  });

  return null;
};

export default LugeReact;
