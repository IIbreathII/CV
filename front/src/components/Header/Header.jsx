// Header.jsx
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from './hook/useMediaQuery';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'LANDING', href: '#landing' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'TECH STACK', href: '#tech-stack' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACTS', href: '#contacts' },
];

const DesktopNav = () => (
  <nav className={styles.desktop_nav}>
    {NAV_LINKS.map(({ label, href }) => (
      <a key={href} href={href} className={styles.nav_link}>
        {label}
      </a>
    ))}
  </nav>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 900px)');
  const lastScrollY = useRef(0);

  const toggleMenu = () => setIsMenuOpen(p => !p);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  // Скрываем хедер при скролле вниз
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${hidden ? styles.header_hidden : ''}`}>
        <div className={styles.header_block}>
          <div className={styles.header_logo}>
            <a href="/documents/CV.txt" download className={styles.download_btn}>
              Download CV
            </a>
          </div>

          <div className={styles.header_block_links}>
            {isDesktop
              ? <DesktopNav />
              : (
                <button
                  className={`${styles.burger_btn} ${isMenuOpen ? styles.burger_btn_open : ''}`}
                  onClick={toggleMenu}
                  aria-label="Меню"
                  aria-expanded={isMenuOpen}
                >
                  <span /><span /><span />
                </button>
              )
            }
          </div>
        </div>
      </header>

      {!isDesktop && createPortal(
        <div
          className={`${styles.mobile_overlay} ${isMenuOpen ? styles.mobile_overlay_open : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <nav className={styles.mobile_nav}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} className={styles.mobile_nav_link} onClick={toggleMenu}>
                {label}
              </a>
            ))}
          </nav>
        </div>,
        document.body
      )}
    </>
  );
};

export default Header;
