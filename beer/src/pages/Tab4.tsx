import React, { useContext, useEffect, useRef } from 'react';
import { IonBackButton, IonButtons, IonContent, IonPage, IonToolbar, IonButton, IonIcon } from '@ionic/react';
import './Tab4.css';
import * as L from 'leaflet';
import { AppContext } from '../App';
import { star } from 'ionicons/icons';


const Tab4: React.FC = () => {
  const { selected } = useContext(AppContext);

  useEffect(() => {
    if (selected) {
      const container = document.querySelector('#map')

      if (container != null) {
        // (container as HTMLInputElement)._leaflet_id = null;
        (container as HTMLInputElement | null)?.value
      }
      const map = L.map('map').setView([Number(selected.latitude), Number(selected.longitude)], 14);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const icon = L.icon({
        iconUrl: 'https://cdn2.iconfinder.com/data/icons/map-locations-colored-outlined-pixel-perfect/64/pin-map-location-08-512.png',
        iconSize: [60, 60],
        iconAnchor: [20, 60]
      })

      L.marker([Number(selected.latitude), Number(selected.longitude)], { icon: icon }).addTo(map)

      setTimeout(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [selected])

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonToolbar className='toolbar'>
          <IonButtons>
            <IonBackButton defaultHref='/tab1'></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <div className='map-section' id='map'></div>
        <div className='info-section'>
          <div className='type-save'>
            <div className='type' data-type={selected.brewery_type.toUpperCase()}>{selected.brewery_type.toUpperCase()}</div>
            <div className='save'>
                <IonIcon slot="icon-only" icon={star} className='favbutton'></IonIcon>
            </div>
          </div>
          <h1 className='name'>{selected.name}</h1>
          <a className='website' href={selected.website_url}>{selected.website_url}</a>
          <div className='location-box'>
            <div className='bold'>ADDRESS</div>
            <div>{selected.street}</div>
            <div>{selected.city}, {selected.state}</div>
            <div>{selected.postal_code}</div>
          </div>
          <div className='phone-number'>
            <div className='bold'>PHONE</div>
            {selected.phone}
          </div>
          <div className='phone-number'>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
