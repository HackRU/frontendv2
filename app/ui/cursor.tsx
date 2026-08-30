'use client';

import LugeReact from './luge';

// the visible pointer is a native CSS cursor, not this component
import './cursor.css';

/**
 *
 * Documentation: https://luge.cool/docs/custom-cursor/
 * Compatibility with Next.js Discussion: https://github.com/AntoineW/luge/discussions/9
 *
 * The day that Luge becomes deprecated or starts to break, cause problems, etc., it must be removed.
 *
 * 1. pnpm uninstall @waaark/luge
 * 2. Delete the TrailEffect component
 * 3. Delete all instances of data-lg-[...] in global.css
 */
const TrailEffect = () => {
  return (
    <>
      <LugeReact />
      {/* no data-lg-cursor-hide - it would hide the mushroom too */}
      <div data-lg-cursor>
        <div
          data-lg-cursor-trail
          data-lg-cursor-trail-length="20"
          data-lg-cursor-inertia="0.4"
        ></div>
      </div>
    </>
  );
};

const Cursor = () => {
  return <TrailEffect />;
};

export default Cursor;
