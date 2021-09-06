import React from 'react';
import '@styles/footer.sass';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container footer-wrapper">
      <div className="footer-github">
        <ul className="github-list">
          <li>
            <a
              href="https://github.com/utrennik"
              className="github-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              utrennik
            </a>
          </li>
          <li>
            <a
              href="https://github.com/RealOneReal"
              className="github-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              RealOneReal
            </a>
          </li>
          <li>
            <a
              href="https://github.com/HelenBassa"
              className="github-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              HelenBassa
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-rsschool">
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
