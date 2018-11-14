import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import {NAVIGATION_IDENTIFIER, SCREEN_NAMES} from './identifires';

export const goToFindPlace = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'FindPlace',
                    }
                }
            ],
        }
    }
});

export const goToBothPlace = () => {
    Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('ios-share-alt', 30)
    ]).then(sources => {
        Navigation.setRoot({
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
                                                            icon: sources[0]
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
                                                            icon: sources[1]
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
    });
};


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


// root: {
//     bottomTabs: {
//         id: 'BottomTabsId',
//             children: [
//             {
//                 stack: {
//                     children: [
//                         {
//                             component: {
//                                 name: 'FindPlace',
//                                 options: {
//                                     bottomTab: {
//                                         fontSize: 12,
//                                         text: 'Find Place',
//                                         icon: sources[0]
//                                     }
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             },
//             {
//                 stack: {
//                     children: [
//                         {
//                             component: {
//                                 name: 'SharePlace',
//                                 options: {
//                                     bottomTab: {
//                                         text: 'Share Place',
//                                         fontSize: 12,
//                                         icon: sources[1]
//                                     }
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
// }
