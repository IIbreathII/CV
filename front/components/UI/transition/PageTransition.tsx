'use client';

import styles from './styles/PageTransition.module.css';

type Props = {
  targetId: string;
  children: React.ReactElement;
};

const FADE_DURATION = 400;

export default function Transition({ targetId, children }: Props) {
  const run = () => {
    const overlay = document.getElementById('page-transition');
    const target = document.getElementById(targetId);

    if (!overlay || !target) return;

    overlay.classList.add(styles.visible);

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'auto' });
      overlay.classList.remove(styles.visible);
    }, FADE_DURATION);
  };

  return (
    <>
      <div id="page-transition" className={styles.block_transition} />
      <div
        style={{ display: 'contents' }}
        onClick={run}
      >
        {children}
      </div>
    </>
  );
}
