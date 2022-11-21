import { useEffect, useState } from 'react';
import { CardSet, IGameSettingsErrors } from '@models/types';
import { coverCardData } from '@components/ui/cover-card/cover-cardData';
import { valueCardData } from '@components/ui/value-card/value-cardData';
import config from '@src/config.json';

export const useLobbySettings = (changePokerGameSettings: (value: any) => void) => {
  const [switchSettings, setSwitchSettings] = useState({
    dealerAsPlr: config.defaultSettings.dealerAsPlayer,
    changeChoice: false,
    timerIsNeed: config.defaultSettings.isTimerNeeded,
    revoteBeforeEndOfRound: false,
    scoreForIssues: false,
    participationInGameForNewUsers: false,
    autoreverse: false,
  });

  const [cardSet, setCardSet] = useState(CardSet.fibonacci);
  const isCustomCardSet = cardSet === CardSet.customCardSet;

  const [inputSettingsForDeck, setInputSettingsForDeck] = useState({
    scoreType: 'Story Point',
    scoreTypeShort: 'SP',
  });

  const [coverCard, setCoverCard] = useState(coverCardData);
  const [valueCard, setValueCard] = useState(valueCardData);
  const [valueTimer, setValueTimer] = useState<Date | null>(
    new Date(1970, 1, 1, 0, config.defaultSettings.timerMins, config.defaultSettings.timerSecs)
  );
  const [activeCoverCardID, setIsActiveCoverCard] = useState<string>('1');
  const [valuesOfNewDeck, setValuesOfNewDeck] = useState<string[]>(
    valueCard.map((card) => card.value)
  );
  const [errors, setErrors] = useState({} as IGameSettingsErrors);

  const validate = () => {
    if (!inputSettingsForDeck.scoreType) {
      setErrors({ ...errors, scoreTypeError: true });
    } else if (!inputSettingsForDeck.scoreTypeShort) {
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
  }, [inputSettingsForDeck.scoreType, inputSettingsForDeck.scoreTypeShort]);

  useEffect(() => {
    const timer = switchSettings.timerIsNeed ? valueTimer : null;
    const customDeck = isCustomCardSet ? valueCard.map((card) => card.value) : null;
    const coverCardforServer = coverCard.find((item) => item.coverCardID === activeCoverCardID);
    changePokerGameSettings({
      ...switchSettings,
      cardSet,
      timer,
      coverCardforServer,
      inputSettingsForDeck,
      customDeck,
    });
  }, [
    switchSettings,
    cardSet,
    activeCoverCardID,
    valueTimer,
    coverCard,
    inputSettingsForDeck,
    valuesOfNewDeck,
  ]);

  return {
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
    valuesOfNewDeck,
    setValuesOfNewDeck,
    errors,
  };
};
