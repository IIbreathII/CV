import { useState } from 'react';
import { useContactForm } from './hooks/useContactForm';
import styles from './Contact.module.css';

function Contact() {
  const [copied, setCopied] = useState(false);
  const { fields, status, handleChange, handleSubmit } = useContactForm();

  const email = 'artemstarik7@gmail.com';

  const contactLinks = [
    { id: 1, name: 'Discord', url: 'https://discord.com/users/1471826882096926720', iconSrc: './assets/social_icons/discord.png', iconAlt: 'Discord' },
    { id: 3, name: 'GitHub', url: 'https://github.com/IIbreathII', iconSrc: './assets/social_icons/github.png', iconAlt: 'GitHub' },
    { id: 4, name: 'LinkedIn', url: 'https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D0%B5%D0%BC-%D1%81%D1%82%D0%B0%D1%80%D0%B8%D0%BA%D0%BE%D0%B2-92a300360/', iconSrc: './assets/social_icons/linkedin.png', iconAlt: 'LinkedIn' },
    { id: 5, name: 'Telegram', url: 'https://t.me/Temastarichok', iconSrc: './assets/social_icons/telegram.png', iconAlt: 'Telegram' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.contactWrapper} id="contact">
      <div className={styles.contactContainer}>

        <div className={styles.leftSide}>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>Get in touch</h2>
            <p className={styles.subtitle}>
              Feel free to contact me any time. I will get back to you as soon as possible!
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="Name"
                className={styles.inputField}
                required
              />
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="Email"
                className={styles.inputField}
                required
              />
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="message"
                className={styles.textArea}
                required
              />
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'loading'}
              >
                {status === 'loading' && 'Sending...'}
                {status === 'success' && 'Sent!'}
                {status === 'error' && 'Error, try again'}
                {status === 'idle' && 'Submit'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.linksContainer}>
            <div
              className={`${styles.linkItem} ${styles.emailBlock} ${copied ? styles.copied : ''}`}
              onClick={handleCopy}
            >
              <img src="./assets/social_icons/email.png" alt="Email" className={styles.icon} />
              <span className={styles.linkText}>{copied ? 'Copied!' : email}</span>
            </div>

            {contactLinks.map((link) => (
              <a key={link.id} href={link.url} className={styles.linkItem} target="_blank" rel="noreferrer">
                <img src={link.iconSrc} alt={link.iconAlt} className={styles.icon} />
                <span className={styles.linkText}>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;