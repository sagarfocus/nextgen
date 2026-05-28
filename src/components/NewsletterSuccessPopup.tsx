import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X, Sparkles } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  autoDismissMs?: number;
}

export default function NewsletterSuccessPopup({
  open,
  onClose,
  title = 'Thank you!',
  message = "You're on the list — updates will reach you soon.",
  autoDismissMs = 4500,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onClose, autoDismissMs);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, autoDismissMs]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="np-backdrop"
            className="fixed inset-0 z-[9000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            style={{
              background:
                'radial-gradient(circle at 50% 40%, rgba(15, 65, 50, 0.32), rgba(8, 14, 28, 0.55))',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
            aria-hidden="true"
          />
          <motion.div
            key="np-card"
            className="fixed inset-0 z-[9001] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-success-title"
          >
            <motion.div
              className="relative pointer-events-auto"
              initial={{ scale: 0.85, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 16, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 360, damping: 26 }}
              style={{
                width: 'min(92vw, 420px)',
                borderRadius: 24,
                padding: '36px 30px 30px',
                background:
                  'linear-gradient(160deg, #ffffff 0%, #ecfdf5 55%, #d1fae5 100%)',
                boxShadow:
                  '0 30px 80px -20px rgba(10, 60, 40, 0.45), 0 12px 32px -10px rgba(10, 60, 40, 0.18)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                overflow: 'hidden',
              }}
            >
              {/* Decorative shimmer */}
              <motion.div
                aria-hidden="true"
                initial={{ rotate: 0, opacity: 0.4 }}
                animate={{ rotate: 360, opacity: [0.4, 0.65, 0.4] }}
                transition={{ rotate: { duration: 18, repeat: Infinity, ease: 'linear' }, opacity: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } }}
                style={{
                  position: 'absolute',
                  top: -60,
                  right: -60,
                  width: 220,
                  height: 220,
                  background:
                    'radial-gradient(circle, rgba(16, 185, 129, 0.28), transparent 65%)',
                  pointerEvents: 'none',
                }}
              />
              <motion.div
                aria-hidden="true"
                initial={{ scale: 0.9, opacity: 0.3 }}
                animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: -50,
                  left: -50,
                  width: 180,
                  height: 180,
                  background:
                    'radial-gradient(circle, rgba(20, 184, 166, 0.22), transparent 65%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: 'none',
                  background: 'rgba(15, 65, 50, 0.08)',
                  color: '#0f4132',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <X size={16} />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.05 }}
                style={{
                  position: 'relative',
                  width: 76,
                  height: 76,
                  borderRadius: 24,
                  margin: '0 auto 18px',
                  background:
                    'linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow:
                    '0 14px 32px -8px rgba(16, 185, 129, 0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <CheckCircle2 size={40} color="white" strokeWidth={2.4} />
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.7] }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: '#fff',
                    color: '#0f766e',
                    borderRadius: 999,
                    width: 28,
                    height: 28,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 6px 14px -4px rgba(15, 118, 110, 0.4)',
                  }}
                >
                  <Sparkles size={14} />
                </motion.span>
              </motion.div>

              {/* Title + message */}
              <h2
                id="newsletter-success-title"
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 800,
                  color: '#064e3b',
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  position: 'relative',
                  textAlign: 'center',
                  margin: '10px auto 0',
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: '#115e59',
                  maxWidth: 320,
                }}
              >
                {message}
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={onClose}
                style={{
                  position: 'relative',
                  display: 'block',
                  margin: '22px auto 0',
                  padding: '11px 28px',
                  borderRadius: 999,
                  border: 'none',
                  background:
                    'linear-gradient(135deg, #047857, #0f766e)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  cursor: 'pointer',
                  boxShadow:
                    '0 12px 24px -8px rgba(4, 120, 87, 0.5), 0 4px 10px -4px rgba(4, 120, 87, 0.3)',
                }}
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
