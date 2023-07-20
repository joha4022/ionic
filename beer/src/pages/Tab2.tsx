import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid } from '@ionic/react';
import './Tab2.css';
import { AppContext } from '../App';

const Tab2: React.FC = () => {
  const { search, setSelected, fetchBars } = useContext(AppContext);

  const history = useHistory();

  const viewBrewery = (id: any) => {
    setSelected(search[id]);
    history.push(`/brewery/${search[id].name}`);
  }

  if (search) {
    return (
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Discover</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar' onKeyUp={(e) => { fetchBars(e.currentTarget.value, e.key); if (e.key === 'Enter') { history.push('/discover'); e.currentTarget.value = '' } }}></IonSearchbar>
            <div className='local-results-count'>{search.length} Results</div>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            {Object.values(search).map((brewery: any, i: any) => {
              return (
                <div key={i} id={i} className='local-row' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>
                  <div className='local-type' data-type={brewery.brewery_type.toUpperCase()}>{brewery.brewery_type.toUpperCase()}</div>
                  <div className='local-name'>{brewery.name}</div>
                  <div className='local-city'>{brewery.city}, {brewery.state}</div>
                </div>
              )
            })}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Discover</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar' onKeyUp={(e) => { fetchBars(e.currentTarget.value, e.key); if (e.key === 'Enter') { history.push('/discover'); e.currentTarget.value = '' } }}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
        </IonContent>
      </IonPage>
    )
  }

};

export default Tab2;
