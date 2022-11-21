import { CoverCard } from '@components/ui/cover-card/cover-card';
import { CoverCreateCard } from '@components/ui/cover-card/cover-create-card';
import { ValueCard } from '@components/ui/value-card/value-card';
import { ValueCreateCard } from '@components/ui/value-card/value-create-card';
import { ICardDeckLobby } from '@models/types';

export const CardsDeckLobby = ({
  coverCard,
  activeCoverCardID,
  handleIsActiveCoverCard,
  onCreateCoverHandler,
  isCustomCardSet,
  valueCard,
  inputSettingsForDeck,
  handleValuesFromNewDeck,
  onCreateValueHandler,
}: ICardDeckLobby) => (
  <section className="lobby-content-game-cards">
    <h3 className="section-header">Game cards:</h3>
    <div className="game-cards-lobby-container">
      <div className="game-cards-select-cover">
        <h4 className="game-cards-lobby-label">Select cover:</h4>
        <div className="cover-card-container">
          {coverCard.map(({ coverCardID, image }) => (
            <div key={coverCardID}>
              <CoverCard
                coverCardID={coverCardID}
                image={image}
                isSelected={activeCoverCardID === coverCardID}
                handleClick={handleIsActiveCoverCard}
              />
            </div>
          ))}
          <CoverCreateCard onCreateCoverHandler={onCreateCoverHandler} />
        </div>
      </div>
      {isCustomCardSet && (
        <div className="game-cards-add-value">
          <h4 className="game-cards-lobby-label">Add card values:</h4>
          <div className="cover-card-container">
            {valueCard.map(({ value, valueCardID }) => (
              <div key={valueCardID}>
                <ValueCard
                  valueCardID={valueCardID}
                  name={inputSettingsForDeck.scoreTypeShort}
                  value={value}
                  handleDataFromValueCard={handleValuesFromNewDeck}
                />
              </div>
            ))}
            <ValueCreateCard onCreateValueHandler={onCreateValueHandler} />
          </div>
        </div>
      )}
    </div>
  </section>
);
