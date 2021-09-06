import React from 'react';
import '@styles/footer.sass';

export const Footer: React.FC = () => {
  const team = [
    {
      name: 'utrennik',
      github: 'https://github.com/utrennik',
    },
    {
      name: 'RealOneReal',
      github: 'https://github.com/RealOneReal',
    },
    {
      name: 'HelenBassa',
      github: 'https://github.com/HelenBassa',
    },
  ];

  const data = {
    style: 'github-item',
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <footer className="footer">
      <div className="container footer-wrapper">
        <div className="footer-github">
          <ul className="github-list">
            {team.map((item) => (
              <li>
                <a href={item.github} className={data.style} target={data.target} rel={data.rel}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-rsschool">
          <a href="https://rs.school/react/" className="rss" target={data.target} rel={data.rel}>
            <span className="rss-year">'21</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
