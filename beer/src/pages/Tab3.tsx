import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid } from '@ionic/react';
import './Tab3.css';
import { AppContext } from '../App';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const { favs, setSelected } = useContext(AppContext);

  const history = useHistory();

  const viewBrewery = (id: any) => {
    setSelected(favs[id]);
    history.push(`/brewery/${favs[id].name}`);
  }

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" className='title'>Favorites</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar className='search-bar' placeholder='Search from Favorites'></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {Object.values(favs).map((brewery: any, i: any) => {
            return (
              <div key={i} id={i} className='local-row' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>
                <div className='local-type' data-type={brewery.brewery_type.toUpperCase()}>{brewery.brewery_type.toUpperCase()}</div>
                <div className='local-name'>{brewery.name}</div>
                <div className='local-city'>{brewery.city}</div>
              </div>
            )
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
