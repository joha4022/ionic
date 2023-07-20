import React, { createContext, useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Redirect, Route } from 'react-router-dom';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { beerOutline, locationOutline, searchOutline, starOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';
import Tab5 from './pages/Tab5'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

export const AppContext = createContext<any>(undefined);

const App: React.FC = () => {
  const [selected, setSelected] = useState(false);
  const [location, setLocation] = useState({ lat: 0, log: 0 });
  const [tab1, setTab1] = useState<any[]>([]);
  const [search, setSearch] = useState(false);
  const [favs, setFavs] = useState([]);

  const fetchBars = (value, key) => {
    if(key === 'Enter') {
      fetch(`https://api.openbrewerydb.org/v1/breweries/search?query=${value}`)
      .then(res=>res.json())
      .then(data=> {
        setSearch(data);
      })
    }
  }

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
        fetch(`https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${log}`)
          .then(res => res.json())
          .then(data => {
            setTab1(data);
            console.log(data)
          })
      })

    if(localStorage.getItem('favs')!== null) {
      setFavs(JSON.parse(localStorage.getItem('favs')!))
    }
  }, [])

  const favCheck = (selected, favButton) => {
    console.log(JSON.parse(localStorage.getItem('favs')!))
    if(localStorage.getItem('favs')) {
      for(const fav of JSON.parse(localStorage.getItem('favs')!)) {
        if(selected.id === fav.id) {
          console.log('found a match')
          console.log(favButton.dataset)
          favButton.dataset.on = 'on';
          console.log(favButton.dataset)
          break;
        } else  { 
          favButton.dataset.on = 'off';
        }
      }
    }
  }

  return (
    <AppContext.Provider value={{ selected, setSelected, tab1, setTab1, setLocation, search, setSearch, fetchBars, favs, setFavs, favCheck}}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/beer-beer">
                <Tab1 />
              </Route>
              <Route path="/brewery/:id" component={Tab4}></Route>
              <Route exact path="/discover">
                <Tab2 />
              </Route>
              <Route path="/favorites">
                <Tab3 />
              </Route>
              <Route path="/local">
                <Tab5 />
              </Route>
              <Route exact path="/">
                <Redirect to="/beer-beer" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/beer-beer">
                <IonIcon aria-hidden="true" icon={beerOutline} />
                <IonLabel>Beer Beer</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab5" href="/local">
                <IonIcon aria-hidden="true" icon={locationOutline} />
                <IonLabel>Local</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/discover">
                <IonIcon aria-hidden="true" icon={searchOutline} />
                <IonLabel>Discover</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/favorites">
                <IonIcon aria-hidden="true" icon={starOutline} />
                <IonLabel>Favorites</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  )
}
export default App;
