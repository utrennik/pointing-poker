import { ReactNode } from 'react';

export interface IWebLink {
  link: string;
  style: string;
  children: string | ReactNode;
}

export interface IInputButtonProps {
  /*
   * the text of the button
   */
  buttonText: string;
  /*
   * The action will be called on submit event
   */
  valueHandler: (value: string) => void;
}

export interface ICustomAvatar {
  /*
   * first name of User
   */
  firstName: string;
  /*
   * last name of User
   */
  lastName?: string;
  /*
   * avatar image
   */
  avatarImage?: string;
}

export interface IMemberCard {
  /*
   * first name of User
   */
  firstName: string;
  /*
   * last name of User
   */
  lastName?: string;
  /*
   * role in the team
   */
  role: string;
  /*
   * avatar image
   */
  avatarImage?: string;
}

export interface IIssueCard {
  /*
   * Name of the issue card
   */
  name: string;
  /*
   * Priority of the issue in sprint
   */
  priority: 'high' | 'normal' | 'low';
  /*
   * Select card in estimate mode
   */
  isSelected: boolean;
  /*
   * Select card in estimate mode
   */
  isGame: boolean;
}
