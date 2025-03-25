import React from 'react';

import { CurrentUserContext } from 'shared-context';


import '../blocks/profile/profile.css'


function ProfileSection ({children, onEditProfile, onAddPlace, onEditAvatar}) {    
    const currentUser = React.useContext(CurrentUserContext);
    const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };
    
   return  (
   <>
        <section className="profile page__section">
           <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
           <div className="profile__info">
               <h1 className="profile__title">{currentUser.name}</h1>
               <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
               <p className="profile__description">{currentUser.about}</p>
           </div>
           <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
       </section><section className="places page__section">
               <ul className="places__list">
                   {children}
               </ul>
        </section>
    </>
  )
}

export default ProfileSection;