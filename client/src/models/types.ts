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

export type IModalWindow = Pick<IModalWrapper, 'isOpen' | 'onClose'>;

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

export interface IIssueModalErrors {
  /*
   * title of Issue error
   */
  isTitleIssueError?: boolean;
}

export interface IEditIssueModalErrors {
  /*
   * title of Issue error
   */
  titleIssueError?: boolean;
  /*
   * link of Issue error
   */
  linkIssueError?: boolean;
}

export enum IssuePriority {
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
}

export interface IIssue {
  /*
   * id of the issue
   */
  id: string;
  /*
   * Name of the issue
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
   * User id
   */
  id: string;
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
  /*
   * Remove user button enabled
   */
  isRemoveButtonDisabled: boolean;
}

export interface IUser {
  /*
   * User ID
   */
  id: string;
  /*
   * User first name
   */
  firstName: string;
  /*
   * Game room
   */
  room: string | null;
  /*
   * User last name
   */
  lastName?: string;
  /*
   * User job position
   */
  jobPosition?: string;
  /*
   * User avatar (BASE64)
   */
  avatar?: string;
  /*
   * User role
   */
  role: 'dealer' | 'member' | 'observer';
}

export interface IUserDelete {
  /*
   * ID of the dealer who removes the user
   */
  dealerID: string;
  /*
   * ID of the user to remove
   */
  userID: string;
  /*
   * Room to remove user
   */
  room: string;
}

export interface IUserDeleteVote {
  /*
   * ID of the user who initiated remove
   */
  removerUserID: string;
  /*
   * ID of the user to remove
   */
  deleteUserID: string;
  /*
   * Room to remove user
   */
  room: string;
}

export interface IUserDeleteVoteData {
  /*
   * ID of the user who initiated remove
   */
  removerUserID: string;
  /*
   * Full name of the user who initiated remove
   */
  removerUserFullName: string;
  /*
   * ID of the user to remove
   */
  deleteUserID: string;
  /*
   * Full name of the user to delete
   */
  deleteUserFullName: string;
}

export interface IDeleteVoteFinishData {
  /*
   * ID of the room
   */
  room: string;
  /*
   * User delete vote result
   */
  result: boolean;
}

export interface IDeleteVoteResults {
  /*
   * ID of the user to delete
   */
  deletedUserID: string;
  /*
   * is the user deleted
   */
  isDeleted: boolean;
}

export interface IGame {
  /*
   * Game users
   */
  users: IUser[];
  /*
   * Game title
   */
  title: string;
  /*
   * Game dealer
   */
  dealer: IUser;
  /*
   * roomID
   */
  room: string;
  /*
   * Game settings
   */
  settings: IGameSettings;
  /*
   * Game status
   */
  gameStatus: 'lobby' | 'poker' | 'cancelGame';
}

export interface IGameSettings {}

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
  isScramMasterLobby: boolean;
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

export interface IMasterSection {
  /*
   * Is this the dealer lobby
   */
  isDealerLobby: boolean;
}

export interface IMembersSection {
  /*
   * Is this the dealer lobby
   */
  isDealerLobby: boolean;
}
