import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/NavigationHelper/registerScreens';


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Login',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Login',
                                        animate: true,
                                        alignment: 'center'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
});