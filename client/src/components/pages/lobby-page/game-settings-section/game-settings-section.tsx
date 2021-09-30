import { ChangeEvent } from 'react';
import { makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import SecondsTimePicker from '@components/ui/time-picker/time-picker';
import { ICoverCard, IGameSettingsSection } from '@models/types';
import { id } from '@utils/utils';
import { SwitchLobby } from '@components/pages/lobby-page/game-settings-section/switch-lobby';
import { useLobbySettings } from '@components/pages/lobby-page/game-settings-section/useLobbySettings';
import { cardSetData } from '@components/pages/lobby-page/game-settings-section/cardSetData';
import { CardsDeckLobby } from '@components/pages/lobby-page/game-settings-section/cards-deck-lobby';
import './game-settings-section.sass';

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 400,
  },
}));

const GameSettingsSection = ({ changePokerGameSettings }: IGameSettingsSection) => {
  const classes = useStyles();

  const {
    switchSettings,
    setSwitchSettings,
    cardSet,
    setCardSet,
    isCustomCardSet,
    inputSettingsForDeck,
    setInputSettingsForDeck,
    coverCard,
    setCoverCard,
    valueCard,
    setValueCard,
    setValueTimer,
    activeCoverCardID,
    setIsActiveCoverCard,
    setValuesOfNewDeck,
    errors,
  } = useLobbySettings(changePokerGameSettings);

  const onCreateCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        const ID = id();
        const newImage = {
          coverCardID: ID,
          image: reader.result as string,
          isSelected: false,
        };
        setCoverCard((arr) => [...arr, newImage as ICoverCard]);
      };
    }
  };

  const onCreateValueHandler = () => {
    const valueCardID = id();
    const newValueCard = {
      id: valueCardID,
      name: '',
      value: '',
    };

    setValueCard([...valueCard, newValueCard]);
  };

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchSettings({ ...switchSettings, [event.target.name]: event.target.checked });
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setCardSet(event.target.value);
  };

  const handleInputForDeck = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSettingsForDeck({
      ...inputSettingsForDeck,
      [event.target.name]: event.target.value,
    });
  };

  const changeValueTimer = (data: Date | null) => {
    setValueTimer(data);
  };

  const handleIsActiveCoverCard = (ID: string) => {
    setIsActiveCoverCard(ID);
  };

  const handleValuesFromNewDeck = (value: string, idCard: string) => {
    const index = valueCard.findIndex((card) => card.valueCardID === idCard);
    if (index < 0) return;
    const currentCard = valueCard[index];
    currentCard.value = value;
    setValueCard([...valueCard]);
    setValuesOfNewDeck([...valueCard.map((card) => card.value)]);
  };

  return (
    <>
      <section className="lobby-content-game-settings">
        <h3 className="section-header">Game settings:</h3>
        <SwitchLobby switchSettings={switchSettings} handleSwitch={handleSwitch} />
        {switchSettings.timerIsNeed && (
          <div className="timer-lobby">
            <SecondsTimePicker changeValueTimer={changeValueTimer} />
          </div>
        )}
        <div className="select-lobby">
          <h4 className="select-lobby-label">Choose your card set:</h4>
          <div className="select-lobby-switch">
            <Select value={cardSet} onChange={handleChange} displayEmpty className={classes.select}>
              {cardSetData.map(({ title, value }) => (
                <MenuItem key={title} value={value}>
                  {title}
                </MenuItem>
              ))}
            </Select>

            <div className="input-lobby-wrapper">
              <div className="input-lobby-container error-down">
                <div className="input-lobby">
                  <TextField
                    label="Score type:"
                    name="scoreType"
                    autoComplete="off"
                    placeholder="Story Point"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={inputSettingsForDeck.scoreType}
                    onChange={handleInputForDeck}
                    error={errors.scoreTypeError}
                  />
                </div>
                {errors.scoreTypeError && (
                  <div className="error">* Field &quot;Score type&quot; must be filled in</div>
                )}
              </div>

              <div className="input-lobby-container error-down">
                <div className="input-lobby">
                  <TextField
                    label="Score type (Short):"
                    name="scoreTypeShort"
                    autoComplete="off"
                    placeholder="SP"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={inputSettingsForDeck.scoreTypeShort}
                    onChange={handleInputForDeck}
                    error={errors.scoreTypeShortError}
                  />
                </div>
                {errors.scoreTypeShortError && (
                  <div className="error">
                    * Field &quot;Score type (Short)&quot; must be filled in
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CardsDeckLobby
        coverCard={coverCard}
        activeCoverCardID={activeCoverCardID}
        handleIsActiveCoverCard={handleIsActiveCoverCard}
        onCreateCoverHandler={onCreateCoverHandler}
        isCustomCardSet={isCustomCardSet}
        valueCard={valueCard}
        inputSettingsForDeck={inputSettingsForDeck}
        handleValuesFromNewDeck={handleValuesFromNewDeck}
        onCreateValueHandler={onCreateValueHandler}
      />
    </>
  );
};

export default GameSettingsSection;
