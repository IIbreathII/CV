'use client';

import { useRef, useEffect } from 'react';
import styles from './styles/PageTransition.module.css';

type Props = {
  targetId: string;
  children: React.ReactElement;
};

const EXPAND_DURATION = 1500; // Длительность расширения
const COLLAPSE_DURATION = 1500; // Длительность сворачивания
const SCROLL_DELAY = 800; // Когда начинать скролл (после начала расширения)

export default function Transition({ targetId, children }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  const cleanup = () => {
    if (animationTimeout.current) {
      clearTimeout(animationTimeout.current);
      animationTimeout.current = null;
    }
    if (overlayRef.current) {
      overlayRef.current.classList.remove(styles.triger);
      overlayRef.current.classList.remove(styles['triger-reverse']);
    }
    isAnimating.current = false;
  };

  useEffect(() => {
    return cleanup;
  }, []);

  const run = () => {
    if (isAnimating.current) return;

    const overlay = overlayRef.current;
    const target = document.getElementById(targetId);

    if (!overlay || !target) return;

    isAnimating.current = true;

    // 1. Запускаем анимацию расширения
    overlay.classList.add(styles.triger);

    // 2. Через SCROLL_DELAY начинаем плавный скролл к цели
    animationTimeout.current = setTimeout(() => {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // 3. После завершения расширения запускаем сворачивание
      animationTimeout.current = setTimeout(() => {
        overlay.classList.remove(styles.triger);
        overlay.classList.add(styles['triger-reverse']);

        // 4. После завершения сворачивания сбрасываем состояние
        animationTimeout.current = setTimeout(() => {
          overlay.classList.remove(styles['triger-reverse']);
          isAnimating.current = false;
        }, COLLAPSE_DURATION);
      }, EXPAND_DURATION - SCROLL_DELAY);
    }, SCROLL_DELAY);
  };

  return (
    <>
      <div 
        id="page-transition" 
        ref={overlayRef}
        className={styles.block_transition} 
      />
      <div
        style={{ display: 'contents' }}
        onClick={run}
      >
        {children}
      </div>
    </>
  );
}