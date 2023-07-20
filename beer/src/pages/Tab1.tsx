import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonGrid, IonRow, IonCol, IonNavLink } from '@ionic/react';
import './Tab1.css';
import React, { useEffect, useState, useContext } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { useHistory } from 'react-router';
import { AppContext } from '../App';





const Tab1: React.FC = () => {
  const [location, setLocation] = useState({ lat: 0, log: 0 });
  const [tab1, setTab1] = useState<any[]>([]);
  const { setSelected } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then(data => {
        setLocation({
          lat: data.coords.latitude,
          log: data.coords.longitude
        })
        console.log(data)
        return data.coords
      })
      .then(coords => {
        const lat = coords.latitude;
        const log = coords.longitude;
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${log}&per_page=6`)
          .then(res => res.json())
          .then(data => {
            setTab1(data);
            console.log(data)
          })
      })
  }, [])

  const viewBrewery = (id: any) => {
    setSelected(tab1[id]);
    history.push(`/brewery/${tab1[id].name}`);
    console.log(id);
  }

  if (tab1.length) {
    return (
      <IonPage>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='title'>Beer Beer</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar className='search-bar'></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonGrid>
            <IonRow>
              <IonCol className='special-col'>Discover all local breweries</IonCol>
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
    return null;
  }
};

export default Tab1;
