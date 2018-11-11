import { Navigation } from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Login', () => require('./Auth/auth').default);
    Navigation.registerComponent('FindPlace', () => require('./FindPlace').default);
    Navigation.registerComponent('SharePlace', () => require('./SharePlace').default);
};