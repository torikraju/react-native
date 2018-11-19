import {Navigation} from 'react-native-navigation';

import {NAVIGATION_IDENTIFIER, SCREEN_NAMES} from './identifires';
import {iconsMap} from '../Helper/iconHelper';
import {ICONS} from '../Helper/identifires';

export const goToLoginPage = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'Login',
                    }
                }
            ],
        }
    }
});

export const goToBothPlace = () => Navigation.setRoot({
    root: {
        sideMenu: {
            left: {
                component: {
                    name: SCREEN_NAMES.SideDrawer,
                    id: NAVIGATION_IDENTIFIER.SIDE_DRAWER_ID
                }
            },
            center: {
                bottomTabs: {
                    id: NAVIGATION_IDENTIFIER.BOTTOM_TABS_ID,
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: SCREEN_NAMES.FindPlace,
                                            options: {
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Find Place',
                                                    icon: iconsMap[ICONS.map_icon]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: SCREEN_NAMES.SharePlace,
                                            options: {
                                                bottomTab: {
                                                    text: 'Share Place',
                                                    fontSize: 12,
                                                    icon: iconsMap[ICONS.map_share]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }

        }
    }
});


Navigation.events().registerNavigationButtonPressedListener((event) => {
    if (event.buttonId === NAVIGATION_IDENTIFIER.SIDE_DRAWER_BUTTON_ID) {
        Navigation.mergeOptions(NAVIGATION_IDENTIFIER.SIDE_DRAWER_ID, {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });
    }


});

