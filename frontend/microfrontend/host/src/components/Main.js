import React, {lazy} from 'react';
import { CurrentUserContext } from 'shared-context';

const Card = lazy(() => import('feeds/Card'));
const ProfileSection = lazy(() => import('profile/ProfileSection'));


function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="content">
      <ProfileSection
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
        children={cards.map((card) => (
          <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
      ))}
      />
    </main>
  );
}

export default Main;
