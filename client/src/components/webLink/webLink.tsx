import { IWebLink } from '@models/types';

export const WebLink = ({ link, style, children }: IWebLink) => (
  <a href={link} className={style} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
