import React, {Component} from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './SideDrawer.style';
import {ICONS} from '../../Helper/identifires';

class SideDrawer extends Component {
    render() {
        return (
            <View style={[styles.container, {width: Dimensions.get('window').width * 0.8}]}>
                <TouchableOpacity>
                    <View style={styles.drawerIem}>
                        <Icon
                            name={ICONS.log_out}
                            size={30} color='#aaa'
                            style={styles.drawerIemIcon}
                        />
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}

export default SideDrawer;
