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

export type VotingData = string | 'pass' | 'coffee';

export interface IStatsItem {
  /*
   * Voting stats card value
   */
  score: VotingData;
  /*
   * Voting card percentage
   */
  percentage: number;
  /*
   * Voting points short name
   */
  pointsShortName: string;
}

export interface IUserScore {
  /*
   * User ID
   */
  userID: string;
  /*
   * Card selected by user
   */
  score: VotingData;
}

export interface IUsercore {
  /*
   * Room ID
   */
  roomID: string;
  /*
   * Issue ID
   */
  issueID: string;

  userScore: IUserScore;
}

export interface IRoundVoteResults {
  /*
   * ID of the issue
   */
  issueID: string;
  /*
   * Users round voting data
   */
  score: IUserScore[];
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
   * Issue description
   */
  description: string;
  /*
   * Game room id
   */
  room: string;
  /*
   * Priority of the issue in sprint
   */
  priority: keyof typeof IssuePriority;
  /*
   * Is the issue active
   */
  isActive: boolean;
  /*
   * Score of the Issue
   */
  score: string;
  /*
   * Issue voting data (which card the user has selected)
   */
  votingData: VotingData[];
}

export interface IIssueCard {
  /*
   * id of the issue
   */
  id: string;
  /*
   * Name of the issue
   */
  name: string;
  /*
   * Game room id
   */
  room: string;
  /*
   * Priority of the issue in sprint
   */
  priority: keyof typeof IssuePriority;
  /*
   * Is the issue active
   */
  isActive: boolean;
  /*
   * Is the client in the game mode
   */
  isGame: boolean;
  /*
   * Is the client a dealer
   */
  isDealer: boolean;
  /*
   * Is the issue played
   */
  isPlayed: boolean;
}

export interface IIssuesSection {
  /*
   * Is the client a dealer
   */
  sectionTitle: string;
}

export interface IIssueDelete {
  /*
   * id of the issue
   */
  id: string;
  /*
   * Game room id
   */
  room: string;
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

export interface IMessage {
  /*
   * id of the message
   */
  messageID: string;
  /*
   * message sending time
   */
  messageTime: string;
  /*
   * Game room id
   */
  room: string;
  /*
   * id of the User
   */
  userID: string;
  /*
   * user message
   */
  message: string;
}
export interface IMessageCard {
  /*
   * id of the message
   */
  messageID: string;
  /*
   * message sending time
   */
  messageTime: string;
  /*
   * Game room id
   */
  room: string;
  /*
   * id of the User
   */
  userID: string;
  /*
   * сhat should be active only in the lobby
   */
  isLobby: boolean;
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
  /*
   * user message
   */
  message: string;
  /*
   * is message of current user
   */
  isCurrentUser: boolean;
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
  gameStatus: GameStatus;
  /*
   * Round timer
   */
  timer: number;
  /*
   * Game issues
   */
  issues: IIssue[];
  /*
   * Game current issue
   */
  currentIssue: IIssue;
}

export enum GameStatus {
  LOBBY = 'lobby',
  POKER = 'poker',
  CANCEL = 'cancelGame',
}

export interface IGameSettings {}

export interface IScramMasterCard {
  id?: number;
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
  /*
   * props with Poker Game Settings
   */
  lobbyGameSettings: any;
}

export interface IMembersSection {
  /*
   * Is this the dealer lobby
   */
  isDealerLobby: boolean;
  /*
   * game members
   */
  members: IUser;
}

export interface ICoverCard {
  /*
   * Unique card identifier
   */
  coverCardID: string;
  /*
   * Image for cover card
   */
  image: string;
  /*
   * Select cover card
   */
  isSelected: boolean;
  /*
   * handle click for active class
   */
  handleClick?: (id: string) => void;
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
  value: string;
  /*
   * hadle Click
   */
  handleDataFromValueCard?: (val: string, id: string) => void;
}

export interface IGameCard {
  /*
   * Unique game card identifier
   */
  gameCardID: string;
  /*
   * Name of game card
   */
  name: string;
  /*
   * Value for game card
   */
  value: VotingData;
  /*
   * Image for game card
   */
  image: string;
  /*
   * Flip game card
   */
  isFlipped: boolean;
  /*
   * Select game card
   */
  isSelected: boolean;
  /*
   * The action will be called on Create value card
   */
  onSelectedHandler?: () => void;
}
export interface IGameTopSection {
  /*
   * Round timer start value in seconds
   */
  timerSecs: number;
  /*
   * Is the client user a dealer
   */
  isClientDealer: boolean;
}
export interface ILobbySettings {
  /*
   * id of room for Game
   */
  room?: string;
  /*
   * dealer can play poker with members
   */
  dealerAsPlr: boolean;
  /*
   * variant of deck with card
   */
  cardSet: CardSet;
  /*
   * custom deck,which make by dealer
   */
  customCardSet?: string[];
  /*
   * possibility to all users connect in room ,when poker start
   */
  participation_in_game_for_new_users?: boolean;
  /*
   * chage choice after card will be flip
   */
  changeChoice: boolean;
  /*
   *revote after round with voting end
   */
  revote_before_round_end?: boolean;
  /*
   * timer on/off
   */
  timerIsNeed: boolean | number;
  /*
   * possibility to load file with issues
   */
  scoreForIssuesFromFile: boolean;
  /*
   * autoreverse cards at the end of each round
   */
  autoreverse: boolean;
  /*
   * game status
   */
  gameStatus?: 'lobby' | 'poker' | 'cancel';
  /*
   * units of estimation
   */
  estimationUnits: {
    scoreType: string;
    scoreTypeShort: string;
  };
  /*
   * cover card for game
   */
  coverCardforServer: ICoverCard;
}

export interface IGameStatus {
  gameStatus: 'lobby' | 'poker' | 'cancel';
}

export interface IGameSettingsSection {
  changePokerGameSettings: (value: any) => void;
}

export interface ICardDeckLobby {
  coverCard: ICoverCard[];
  activeCoverCardID: string;
  handleIsActiveCoverCard: (ID: string) => void;
  onCreateCoverHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  isCustomCardSet: boolean;
  valueCard: IValueCard[];
  onCreateValueHandler: () => void;
  inputSettingsForDeck: {
    scoreType: string;
    scoreTypeShort: string;
  };
  handleValuesFromNewDeck: (value: string, id: string) => void;
}

export interface ISwitchLobby {
  switchSettings: {
    dealerAsPlr: boolean;
    changeChoice: boolean;
    timerIsNeed: boolean;
    revoteBeforeEndOfRound: boolean;
    scoreForIssues: boolean;
    participationInGameForNewUsers: boolean;
    autoreverse: boolean;
  };
  handleSwitch: (event: ChangeEvent<HTMLInputElement>) => void;
}
