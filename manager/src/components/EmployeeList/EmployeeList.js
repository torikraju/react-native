import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';

import {fetchEmployees} from '../../store/actions/index';
import ListItem from '../ListItem/ListItem';


class EmployeeList extends Component {

    componentWillMount() {
        this.props.onFetchData();
    }


    render() {
        return (
            <View style={{
                flex: 1,
                padding: 8,
                flexDirection: 'column', // main axis
                justifyContent: 'center', // main axis
                alignItems: 'center', // cross axis
                backgroundColor: '#f2f0f0',
            }}>
                <FlatList
                    style={{
                        marginTop: 14,
                        alignSelf: "stretch",
                    }}
                    data={this.props.employees}
                    renderItem={(info) => (
                        <ListItem employee={info.item}/>
                    )}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employeeForm.employees
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: () => dispatch(fetchEmployees())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
