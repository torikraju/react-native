import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/Helper/registerScreens';
import {goToLoginPage} from './src/Helper/navigation';


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    goToLoginPage();
});
