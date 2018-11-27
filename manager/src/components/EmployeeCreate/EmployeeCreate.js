import React, {Component} from 'react';
import {Picker, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

import {Card, CardSection, Input, Button} from '../common/index';
import {employeeUpdate} from '../../store/actions/index';


class EmployeeCreate extends Component {
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='Name'
                        placeholder='Jane'
                        value={this.props.name}
                        onChangeText={value => this.props.onEmployeeUpdate({prop: 'name', value})}/>
                </CardSection>

                <CardSection>
                    <Input
                        label='Phone'
                        placeholder='555-555-555'
                        value={this.props.phone}
                        onChangeText={value => this.props.onEmployeeUpdate({prop: 'phone', value})}/>
                </CardSection>

                <CardSection>
                    <Picker
                        selectedValue={this.props.shift}
                        style={{height: 50, width: 100, flex: 1}}
                        onValueChange={(value) => this.props.onEmployeeUpdate({prop: 'shift', value})}>
                        <Picker.Item label="Sunday" value="sunday"/>
                        <Picker.Item label="Monday" value="monday"/>
                        <Picker.Item label="Tuesday" value="tuesday"/>
                        <Picker.Item label="Wednesday" value="wednesday"/>
                        <Picker.Item label="Thursday" value="thursday"/>
                        <Picker.Item label="Friday" value="friday"/>
                        <Picker.Item label="Saturday" value="saturday"/>
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button> Create</Button>
                </CardSection>

            </Card>
        );
    }
}

export const styles = StyleSheet.create({
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
});

const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm;
    return {
        name: name,
        phone: phone,
        shift: shift
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEmployeeUpdate: (text) => dispatch(employeeUpdate(text))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
