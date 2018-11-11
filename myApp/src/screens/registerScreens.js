import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import configureStore from '../store/configureStore';

const store = configureStore();

export function registerScreens() {
    Navigation.registerComponentWithRedux('Login', () => require('./Auth/auth').default, Provider, store);
    Navigation.registerComponentWithRedux('FindPlace', () => require('./FindPlace').default, Provider, store);
    Navigation.registerComponentWithRedux('SharePlace', () => require('./SharePlace').default, Provider, store);
};