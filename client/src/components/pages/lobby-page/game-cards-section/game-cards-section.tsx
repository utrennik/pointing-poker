import { CoverCard } from '@components/ui/cover-card/cover-card';
import { coverCardData } from '@components/ui/cover-card/cover-cardData';
import { CoverCreateCard } from '@components/ui/cover-card/cover-create-card';
import { ValueCard } from '@components/ui/value-card/value-card';
import { valueCardData } from '@components/ui/value-card/value-cardData';
import { ValueCreateCard } from '@components/ui/value-card/value-create-card';
import './game-cards-section.sass';

const GameCardsSection = () => (
  <section className="lobby-content-game-cards">
    <h3 className="section-header">Game cards:</h3>
    <div className="game-cards-lobby-container">
      <div className="game-cards-select-cover">
        <h4 className="game-cards-lobby-label">Select cover:</h4>
        <div className="cover-card-container">
          {coverCardData.map(({ id, image, isSelected }) => (
            <div key={id}>
              <CoverCard id={id} image={image} isSelected={isSelected} />
            </div>
          ))}
          <CoverCreateCard />
        </div>
      </div>
      <div className="game-cards-add-value">
        <h4 className="game-cards-lobby-label">Add card values:</h4>
        <div className="cover-card-container">
          {valueCardData.map(({ id, name, value }) => (
            <div key={id}>
              <ValueCard id={id} name={name} value={value} />
            </div>
          ))}
          <ValueCreateCard />
        </div>
      </div>
    </div>
  </section>
);

export default GameCardsSection;
