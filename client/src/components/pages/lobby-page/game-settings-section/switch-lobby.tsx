import { Switch } from '@material-ui/core';
import { ISwitchLobby } from '@models/types';

export const SwitchLobby = ({ switchSettings, handleSwitch }: ISwitchLobby) => (
  <>
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
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Revote before round end:</h4>
      <div className="switch-lobby-switch">
        <Switch
          id="revote"
          name="revoteBeforeEndOfRound"
          checked={switchSettings.revoteBeforeEndOfRound}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
    </div>
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Score for issues from file:</h4>
      <div className="switch-lobby-switch">
        <Switch
          id="scoreForIssues"
          name="scoreForIssues"
          checked={switchSettings.scoreForIssues}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
    </div>
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Participation in game for new users:</h4>
      <div className="switch-lobby-switch">
        <Switch
          id="participationInGameForNewUsers"
          name="participationInGameForNewUsers"
          checked={switchSettings.participationInGameForNewUsers}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
    </div>
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Cards autoreverse in the end of round:</h4>
      <div className="switch-lobby-switch">
        <Switch
          id="autoreverse"
          name="autoreverse"
          checked={switchSettings.autoreverse}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
    </div>
  </>
);
