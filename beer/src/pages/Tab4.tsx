import React, { useContext, useEffect } from 'react';
import { IonBackButton, IonButtons, IonContent, IonPage, IonToolbar, IonTitle, IonIcon, IonHeader } from '@ionic/react';
import './Tab4.css';
import * as L from 'leaflet';
import { AppContext } from '../App';
import { star } from 'ionicons/icons';
import { useLocation } from 'react-router';


const Tab4: React.FC = () => {
  const { selected, favCheck, favs, setFavs } = useContext(AppContext);

  useEffect(() => {
    if (selected) {
      document.querySelector('.map-section')!.innerHTML = "<div id='map'></div>"
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
        favCheck(selected, document.querySelector('.favbutton'));
        map.invalidateSize();
      }, 300);
    }
  }, [])

  const addFav = (target) => {
    if (target.dataset.on === 'off') {
      //add to favorites
      const currentFav = [...favs];
      currentFav.push(selected);
      setFavs(currentFav);
      localStorage.setItem('favs', JSON.stringify(currentFav));
      setTimeout(function () {
        target.dataset.on = 'on';
      }, 100)
    } else if (target.dataset.on === 'on') {
      // remove from favorites
      const currentFav = [...favs];
      for (const fav of currentFav) {
        if (fav.id === selected.id) {
          const index = currentFav.indexOf(fav);
          currentFav.splice(index, 1);
          setFavs(currentFav);
          localStorage.setItem('favs', JSON.stringify(currentFav));
        }
      }
      target.dataset.on = 'off';
    }
  }

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large" className='title'>Beer Beer</IonTitle>
        </IonToolbar>
        <IonToolbar className='toolbar-detail-page'>
          <IonButtons>
            <IonBackButton defaultHref='/'></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className='map-section'></div>
        <div className='info-section'>
          <div className='type-save'>
            <div className='type' data-type={selected.brewery_type.toUpperCase()}>{selected.brewery_type.toUpperCase()}</div>
            <div className='save'>
              <IonIcon slot="icon-only" icon={star} className='favbutton' data-on='off' onClick={(e) => { addFav(e.currentTarget); }}></IonIcon>
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
