import { Switch } from '@material-ui/core';
import { ISwitchLobby } from '@models/types';

export const SwitchLobby = ({ switchSettings, handleSwitch }: ISwitchLobby) => (
  <>
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Dealer as player:</h4>
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
      <h4 className="switch-lobby-label">New user in game should be admitted by dealer:</h4>
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
    {/* 
    //TODO: Implement revoting option if needed
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Allow re-voting</h4>
      <div className="switch-lobby-switch">
        <Switch
          id="change-choice-switch"
          name="changeChoice"
          checked={switchSettings.changeChoice}
          color="primary"
          onChange={handleSwitch}
        />
      </div>
    </div> */}
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
      <h4 className="switch-lobby-label">Allow replay the Issue round:</h4>
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
    {/* <div className="switch-lobby">
    //TODO: Implement add cards score from the file
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
    </div> */}
    <div className="switch-lobby">
      <h4 className="switch-lobby-label">Cards auto-flip when everybody voted:</h4>
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
