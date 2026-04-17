import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from './hook/useMediaQuery';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'LANDING', href: '#landing' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'TECH STACK', href: '#skills' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT ME', href: '#contact' },
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
  const isAnchorNavRef = useRef(false);
  const scrollEndTimer = useRef(null);

  const toggleMenu = () => setIsMenuOpen(p => !p);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScrollEnd = () => {
      clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(() => {
        isAnchorNavRef.current = false;
        lastScrollY.current = window.scrollY;
        window.removeEventListener('scroll', onScrollEnd);
      }, 150);
    };

    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');

      // #landing — всегда в самый верх
      if (href === '#landing') {
        e.preventDefault();
        isAnchorNavRef.current = true;
        setHidden(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.addEventListener('scroll', onScrollEnd, { passive: true });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      isAnchorNavRef.current = true;
      setHidden(false);
      window.addEventListener('scroll', onScrollEnd, { passive: true });
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      clearTimeout(scrollEndTimer.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isAnchorNavRef.current) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < 5) return;

      if (delta > 0 && currentY > 60) {
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
            <a href="/documents/CV_Artem_Starikov.docx" download className={styles.download_btn}>
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