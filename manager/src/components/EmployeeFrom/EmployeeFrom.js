import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {CardSection, Input} from "../common/index";
import {inputHandler} from '../../store/actions/index';
import {AppUtil} from "../../helper/AppUtil";
import {styles} from './EmployeeFrom.style';

class EmployeeFrom extends Component {

    state = {
        isDateTimePickerVisible: false
    };

    showDateTimePicker = () => this.setState({
        isDateTimePickerVisible: true
    });

    hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    handleDatePicked = (date) => {
        let value = AppUtil.convertDate(date);
        this.props.onInputHandler({prop: 'shift', value});
        this.hideDateTimePicker();
    };

    render() {
        const {pickerContainerStyle, buttonStyle, buttonTextStyle, textStyle} = styles;
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
                    <View style={pickerContainerStyle}>
                        <TouchableOpacity onPress={this.showDateTimePicker}>
                            <View style={buttonStyle}>
                                <Text style={buttonTextStyle}>Select Shift</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={textStyle}>{this.props.shift}</Text>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode='date'
                        />
                    </View>
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
