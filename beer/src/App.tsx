import React, { createContext, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Redirect, Route } from 'react-router-dom';
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
import { beerOutline, ellipse, searchCircleOutline, searchOutline, square, starOutline, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';

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

  return (
    <AppContext.Provider value={{ selected, setSelected}}>
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
              <Route exact path="/">
                <Redirect to="/beer-beer" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/beer-beer">
                <IonIcon aria-hidden="true" icon={beerOutline} />
                <IonLabel>Beer Beer</IonLabel>
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
