import React, { useContext } from 'react';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab4.css';
import { AppContext } from '../App';

const Tab4: React.FC = () => {
  const { selected } = useContext(AppContext);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons>
              <IonBackButton defaultHref='/brewery/:id'></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
