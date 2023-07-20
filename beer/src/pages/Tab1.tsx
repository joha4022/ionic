import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow, IonCol, IonSpinner } from '@ionic/react';
import './Tab1.css';
import React, { useEffect, useContext } from 'react';
// import { Geolocation } from '@capacitor/geolocation';
import { useHistory } from 'react-router';
import { AppContext } from '../App';





const Tab1: React.FC = () => {
  const { setSelected, tab1, fetchBars } = useContext(AppContext);

  const history = useHistory();

  const viewBrewery = (id: any) => {
    setSelected(tab1[id]);
    history.push(`/brewery/${tab1[id].name}`);
  }

  if (tab1.length) {
    return (
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Beer Beer</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar' onKeyUp={(e)=>{fetchBars(e.currentTarget.value, e.key);if(e.key === 'Enter'){history.push('/discover');e.currentTarget.value = ''}}}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol className='special-col' onClick={()=>{history.push('/local/')}}>Discover all local breweries</IonCol>
            </IonRow>
            <IonRow>
              <IonCol data-type={tab1[0].brewery_type} id='0' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[0].name}</IonCol>
              <IonCol data-type={tab1[1].brewery_type} id='1' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[1].name}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol data-type={tab1[2].brewery_type} id='2' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[2].name}</IonCol>
              <IonCol data-type={tab1[3].brewery_type} id='3' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[3].name}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol data-type={tab1[4].brewery_type} id='4' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[4].name}</IonCol>
              <IonCol data-type={tab1[5].brewery_type} id='5' onClick={(e) => { viewBrewery(e.currentTarget.id) }}>{tab1[5].name}</IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    )
  } else {
    return (
      <IonPage className='loading-ion-page'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Beer Beer</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar' onKeyUp={(e)=>{fetchBars(e.currentTarget.value, e.key);if(e.key === 'Enter'){history.push('/discover');e.currentTarget.value = ''}}}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <div className='loading-screen'>
          <div className='spinner-box'>
            <IonSpinner></IonSpinner>
          </div>
          <div className='loading-text'>Brewing...</div>
        </div>
      </IonPage>
    )
  }
};

export default Tab1;
