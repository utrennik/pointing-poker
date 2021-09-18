import { ChangeEvent, useEffect, useState } from 'react';
import { makeStyles, MenuItem, Select, Switch, TextField } from '@material-ui/core';
import SecondsTimePicker from '@components/ui/time-picker/time-picker';
import { CardSet, IGameSettingsErrors } from '@models/types';
import { cardSetData } from './cardSetData';
import './game-settings-section.sass';

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 400,
  },
}));

const GameSettingsSection = () => {
  const classes = useStyles();

  const [switchSettings, setSwitchSettings] = useState({
    dealerAsPlr: false,
    changeChoice: false,
    timerIsNeed: false,
  });

  const [cardSet, setCardSet] = useState(CardSet.fibonacci);

  const [inputSettings, setInputSettings] = useState({
    scoreType: '',
    scoreTypeShort: '',
  });

  const handleSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchSettings({ ...switchSettings, [event.target.name]: event.target.checked });
  };

  const handleChange = (event: ChangeEvent<any>) => {
    setCardSet(event.target.value);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputSettings({ ...inputSettings, [event.target.name]: event.target.value });
  };

  const [errors, setErrors] = useState({} as IGameSettingsErrors);

  const validate = () => {
    if (!inputSettings.scoreType) {
      setErrors({ ...errors, scoreTypeError: true });
    } else if (!inputSettings.scoreTypeShort) {
      setErrors({ ...errors, scoreTypeShortError: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.scoreTypeError;
      delete newErrors.scoreTypeShortError;
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    validate();
  }, [inputSettings.scoreType, inputSettings.scoreTypeShort]);

  return (
    <section className="lobby-content-game-settings">
      <h3 className="section-header">Game settings:</h3>
      <div className="switch-lobby">
        <h4 className="switch-lobby-label">Scram master as player:</h4>
        <div className="switch-lobby-switch">
          <Switch
            id="dealer-as-plr-switch"
            name="dealerAsPlr"
            checked={switchSettings.dealerAsPlr}
            color="primary"
            onChange={handleSwitch}
          />
        </div>
      </div>
      <div className="switch-lobby">
        <h4 className="switch-lobby-label">Changing card in round end:</h4>
        <div className="switch-lobby-switch">
          <Switch
            id="change-choice-switch"
            name="changeChoice"
            checked={switchSettings.changeChoice}
            color="primary"
            onChange={handleSwitch}
          />
        </div>
      </div>
      <div className="switch-lobby">
        <h4 className="switch-lobby-label">Is timer needed:</h4>
        <div className="switch-lobby-switch">
          <Switch
            id="is-timer-needed"
            name="timerIsNeed"
            checked={switchSettings.timerIsNeed}
            color="primary"
            onChange={handleSwitch}
          />
        </div>
      </div>
      {switchSettings.timerIsNeed && (
        <div className="timer-lobby">
          <SecondsTimePicker />
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
          {cardSet === CardSet.customCardSet && (
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
                    value={inputSettings.scoreType}
                    onChange={handleInput}
                    error={errors.scoreTypeError === true}
                  />
                </div>
                {errors.scoreTypeError === true && (
                  <div className="error">* Field "Score type" must be filled in</div>
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
                    value={inputSettings.scoreTypeShort}
                    onChange={handleInput}
                    error={errors.scoreTypeShortError === true}
                  />
                </div>
                {errors.scoreTypeShortError === true && (
                  <div className="error">* Field "Score type (Short)" must be filled in</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GameSettingsSection;
