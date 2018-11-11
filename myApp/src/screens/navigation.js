import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

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
                bottomTabs: {
                    id: 'BottomTabsId',
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'FindPlace',
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
                                            name: 'SharePlace',
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
        });
    });
}