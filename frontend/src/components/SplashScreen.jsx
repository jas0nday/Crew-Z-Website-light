import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SEEN_KEY = 'crewz_splash_seen';

export const SplashScreen = () => {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem(SEEN_KEY));

  useEffect(() => {
    if (!visible) return undefined;
    sessionStorage.setItem(SEEN_KEY, '1');
    const timer = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFFDF7]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          data-testid="splash-screen"
        >
          <motion.div
            className="crewz-logo"
            style={{ '--logo-size': '72px', '--speed': '1.6s' }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            aria-label="Loading CrewZ"
          >
            <span className="icon" aria-hidden="true">
              <span className="face">
                <span className="z-letter">Z</span>
                <span className="bar" />
              </span>
            </span>
            <span className="word">CREW<span className="accent">Z</span></span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
