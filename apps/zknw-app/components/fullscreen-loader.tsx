'use client';

import { ComponentProps, PropsWithChildren, forwardRef } from 'react';
import { motion } from 'framer-motion';

export const FullscreenLoader = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      key="fullscreen-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5 } }}
      exit={{ opacity: 0, transition: { delay: 0.5 } }}
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      <div className="animate-pulse w-24 h-24 neon-fuchsia rounded-full"></div>
    </motion.div>
  );
};
