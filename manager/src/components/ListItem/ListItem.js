import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';


class ListItem extends Component {

    onRowPress = () => {
        Actions.employeeEdit({employee: this.props.employee});
    };

    render() {
        const {name} = this.props.employee;
        return (
            <TouchableOpacity onPress={this.onRowPress}>
                <View style={styles.row}>
                    <View style={styles.row_cell_timeplace}>
                        <Text style={styles.row_time}>{name}</Text>
                    </View>
                </View>
            </TouchableOpacity>

        )
            ;
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
    },
    row: {
        elevation: 1,
        borderRadius: 2,
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'row',  // main axis
        justifyContent: 'flex-start', // main axis
        alignItems: 'center', // cross axis
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 16,
        marginLeft: 14,
        marginRight: 14,
        marginTop: 0,
        marginBottom: 6,
    },
    row_cell_timeplace: {
        flex: 1,
        flexDirection: 'column',
    },
    row_time: {
        color: 'black',
        textAlignVertical: 'bottom',
        includeFontPadding: false,
        flex: 0,
        fontSize: 20
    },
});


export default ListItem;
