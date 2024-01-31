'use client';
import { useEffect } from 'react';

import '@/node_modules/@waaark/luge/dist/css/luge.css';

/**
 * This is for the trailing effect for the wand in the Cursor component.
 *
 * Delete this when necessary. This adds a whole another library to this project
 * and we don't need the clutter later on if we don't need it.
 *
 * But magic wand trail effect is very cool. So we keep for Spring '24.
 */

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
