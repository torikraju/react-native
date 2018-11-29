import React, {Component} from 'react';
import {Picker, View} from 'react-native';
import {connect} from 'react-redux';

import {CardSection, Input} from "../common/index";
import {inputHandler} from '../../store/actions/index';

class EmployeeFrom extends Component {
    render() {
        return (
            <View>
                <CardSection>
                    <Input
                        label='Name'
                        placeholder='Jane'
                        value={this.props.name}
                        onChangeText={value => this.props.onInputHandler({prop: 'name', value})}/>
                </CardSection>

                <CardSection>
                    <Input
                        label='Phone'
                        placeholder='555-555-555'
                        value={this.props.phone}
                        onChangeText={value => this.props.onInputHandler({prop: 'phone', value})}/>
                </CardSection>

                <CardSection>
                    <Picker
                        selectedValue={this.props.shift}
                        style={{height: 50, width: 100, flex: 1}}
                        onValueChange={(value) => this.props.onInputHandler({prop: 'shift', value})}>
                        <Picker.Item label="Sunday" value="sunday"/>
                        <Picker.Item label="Monday" value="monday"/>
                        <Picker.Item label="Tuesday" value="tuesday"/>
                        <Picker.Item label="Wednesday" value="wednesday"/>
                        <Picker.Item label="Thursday" value="thursday"/>
                        <Picker.Item label="Friday" value="friday"/>
                        <Picker.Item label="Saturday" value="saturday"/>
                    </Picker>
                </CardSection>


            </View>
        );
    }
}

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
        onInputHandler: (text) => dispatch(inputHandler(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeFrom);
