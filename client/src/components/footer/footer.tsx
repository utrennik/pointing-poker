import { WebLink } from '@components/webLink/webLink';
import { footerData } from '@components/footer/footerData';

import '@styles/footer.sass';

export const Footer = () => {
  const { team, rss, style } = footerData;

  return (
    <footer className="footer">
      <div className="container footer-wrapper">
        <div className="footer-github">
          <ul className="github-list">
            {team.map(({ name, link }) => (
              <li>
                <WebLink link={link} style={style.github}>
                  {name}
                </WebLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-rsschool">
          <WebLink link={rss.link} style={style.rss}>
            <span className="rss-year">{rss.year}</span>
          </WebLink>
        </div>
      </div>
    </footer>
  );
};
