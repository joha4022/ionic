import React, { useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Tab5.css';
import { AppContext } from '../App';
import { useHistory } from 'react-router';

const Tab5: React.FC = () => {
  const {tab1, setSelected} = useContext(AppContext);

  const history = useHistory();

  const viewBrewery = (id: any) => {
    setSelected(tab1[id]);
    history.push(`/brewery/${tab1[id].name}`);
  }

  if(tab1.length) {
    return (
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Local</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar' placeholder='Search from Local Breweries'></IonSearchbar>
            <div className='local-results-count'>{tab1.length} Results</div>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            {Object.values(tab1).map((brewery :any, i :any) => {
              return(
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
  } else {
    return null;
  }
  
};

export default Tab5;
