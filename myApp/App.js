import {Navigation} from 'react-native-navigation';

import {registerScreens} from './src/Helper/registerScreens';


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Login',
                            id: 'login',
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
