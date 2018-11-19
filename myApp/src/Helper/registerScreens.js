import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import configureStore from '../store/configureStore';
import {SCREEN_NAMES} from '../Helper/identifires';

const store = configureStore();

export function registerScreens() {
    Navigation.registerComponentWithRedux(SCREEN_NAMES.Login, () => require('../screens/Auth/auth').default, Provider, store);
    Navigation.registerComponentWithRedux(SCREEN_NAMES.FindPlace, () => require('../screens/FindPlace/FindPlace').default, Provider, store);
    Navigation.registerComponentWithRedux(SCREEN_NAMES.SharePlace, () => require('../screens/SharePlace/SharePlace').default, Provider, store);
    Navigation.registerComponentWithRedux(SCREEN_NAMES.PlaceDetail, () => require('../screens/PlaceDetail/PlaceDetail').default, Provider, store);
    Navigation.registerComponentWithRedux(SCREEN_NAMES.SideDrawer, () => require('../screens/SideDrawer/SideDrawer').default, Provider, store);
}
