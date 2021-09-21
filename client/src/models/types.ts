import { ChangeEvent, ReactElement, ReactNode } from 'react';

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
  /*
   * input initial value
   */
  initialValue?: string;
  /*
   * input label
   */
  inputLabel?: string;
}

export interface IModalWrapper {
  /*
   * state of the modal window
   */
  isOpen: boolean;
  /*
   * modal close handler
   */
  onClose: () => void;
  /*
   * modal confirm handler
   */
  onConfirm: () => void;
  /*
   * modal title
   */
  title: string;
  /*
   * modal content
   */
  children: ReactElement;
  /*
   * disable confirm button
   */
  disableConfirm: boolean;
}

export interface IModalButtons {
  /*
   * confirmation button text
   */
  okBtnText: string;
  /*
   * cancel button text
   */
  cancelBtnText: string;
  /*
   * modal close handler
   */
  onClose: () => void;
  /*
   * modal confirm handler
   */
  onConfirm: () => void;
  /*
   * disable confirm button
   */
  disableConfirm: boolean;
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

export interface IConnectModalErrors {
  /*
   * first name of User error
   */
  firstNameError?: boolean;
}

enum IssuePriority {
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

export interface IIssueCard {
  /*
   * Unique card identifier
   */
  id?: number | string;
  /*
   * Name of the issue card
   */
  name: string;
  /*
   * Priority of the issue in sprint
   */
  priority: keyof typeof IssuePriority;
  /*
   * Select card in estimate mode
   */
  isSelected: boolean;
  /*
   * Select card in estimate mode
   */
  isGame: boolean;
}

export interface ICoverCard {
  /*
   * Unique card identifier
   */
  coverCardID?: number | string;
  /*
   * Image for cover card
   */
  image: string;
  /*
   * Select cover card
   */
  isSelected: boolean;
}

export interface ICreateCoverProps {
  /*
   * The action will be called on Create cover card
   */
  onCreateCoverHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
export interface ICreateValueProps {
  /*
   * The action will be called on Create value card
   */
  onCreateValueHandler: () => void;
}

export interface IValueCard {
  /*
   * Unique card identifier
   */
  valueCardID?: number | string;
  /*
   * Name of card
   */
  name: string;
  /*
   * Value for card
   */
  value: string | number;
}

export interface IMemberCard {
  /*
   * Unique card identifier
   */
  id?: number | string;
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

export interface IScramMasterCard {
  /*
   * Unique card identifier
   */
  id?: number | string;
  /*
   * first name of ScramMaster
   */
  firstName: string;
  /*
   * last name of ScramMaster
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
  /*
   * avatar image
   */
  // isScramMasterLobby: boolean;
}

export interface ILobbyButtons {
  /*
   * start game button text
   */
  startBtnText: string;
  /*
   * cancel game button text
   */
  cancelBtnText: string;
  /*
   * start game handler
   */
  onStart: () => void;
  /*
   * cancel game handler
   */
  onCancel: () => void;
  /*
   * disable start game button
   */
  disableStartGame: boolean;
}

export enum CardSet {
  fibonacci = 'Fibonacci',
  powersOfTwo = 'Powers of 2',
  customCardSet = 'Custom CardSet',
}

export interface IGameSettingsErrors {
  /*
   * type of score error
   */
  scoreTypeError?: boolean;
  /*
   * type of score error
   */
  scoreTypeShortError?: boolean;
}
