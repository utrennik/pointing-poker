import React from 'react';
import '@styles/footer.sass';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer__wrapper">
      <div className="footer__github">
        <ul className="github__list">
          <li>
            <a
              href="https://github.com/utrennik"
              className="github__item"
              target="_blank"
              rel="noopener noreferrer"
            >
              utrennik
            </a>
          </li>
          <li>
            <a
              href="https://github.com/RealOneReal"
              className="github__item"
              target="_blank"
              rel="noopener noreferrer"
            >
              RealOneReal
            </a>
          </li>
          <li>
            <a
              href="https://github.com/HelenBassa"
              className="github__item"
              target="_blank"
              rel="noopener noreferrer"
            >
              HelenBassa
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__rsschool">
        <a
          href="https://rs.school/react/"
          className="rss"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="rss-year">'21</span>
        </a>
      </div>
    </div>
  </footer>
);
