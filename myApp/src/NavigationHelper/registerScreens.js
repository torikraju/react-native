import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import configureStore from '../store/configureStore';

const store = configureStore();

export function registerScreens() {
    Navigation.registerComponentWithRedux('Login', () => require('../screens/Auth/auth').default, Provider, store);
    Navigation.registerComponentWithRedux('FindPlace', () => require('../screens/FindPlace/FindPlace').default, Provider, store);
    Navigation.registerComponentWithRedux('SharePlace', () => require('../screens/SharePlace/SharePlace').default, Provider, store);
    Navigation.registerComponentWithRedux('PlaceDetails', () => require('../screens/PlaceDetail/PlaceDetail').default, Provider, store);
}