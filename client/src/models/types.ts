import { ReactNode } from 'react';

export interface IWebLink {
  link: string;
  style: string;
  children: string | ReactNode;
}

export interface IInputButtonProps {
  buttonText: string;
  valueHandler: Function;
}
