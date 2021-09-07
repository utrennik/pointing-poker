import { IWebLink } from '@models/types';

export const WebLink: React.FC<IWebLink> = ({ link, style, children }) => (
  <a href={link} className={style} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
