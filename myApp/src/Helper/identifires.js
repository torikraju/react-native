import {Platform} from 'react-native';

export const NAVIGATION_IDENTIFIER = {
    SIDE_DRAWER_ID: 'sideMenu',
    SIDE_DRAWER_BUTTON_ID: 'sideDrawerButton',
    BOTTOM_TABS_ID: 'BottomTabsId'
}

export const SCREEN_NAMES = {
    Login: 'Login',
    FindPlace: 'FindPlace',
    SharePlace: 'SharePlace',
    PlaceDetail: 'PlaceDetails',
    SideDrawer: 'SideDrawer'
}


export const ICONS = {
    map_icon: Platform.OS === 'android' ? 'md-map' : 'ios-map',
    map_share: Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
    menu: Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
    log_out: Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out',
    trash: Platform.OS === 'android' ? 'md-trash' : 'ios-trash'
};

export const DIMENSIONS = {
    portrait: 'portrait',
    landscape: 'landscape',
    height: 500
};


