import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';

import EmployeeFrom from '../EmployeeFrom/EmployeeFrom';
import {employeeCreate, inputHandler, employeeUpdate, employeeDelete} from "../../store/actions";
import {Card, CardSection, Button, Confirm} from '../common/index';

class EmployeeEdit extends Component {

    state = {
        showModal: false
    };

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.onInputHandler({prop, value});
        });
    }

    onButtonPress = () => {
        const {name, phone, shift} = this.props;
        this.props.onEmployeeEdit({name, phone, shift, uid: this.props.employee.key});
    };

    onTextPress = () => {
        const {phone, shift} = this.props;
        Communications.text(phone, `Your upcoming shift is on ${shift}`)
    };

    onToggleModal = () => {
        this.setState({showModal: !this.state.showModal});
    };

    onAccept = () => {
        this.props.onEmployeeDelete({uid: this.props.employee.key});
    };

    onDecline = () => {
        this.setState({showModal: false});
    };

    render() {
        return (
            <Card>
                <EmployeeFrom {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress}>Save Changes</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onTextPress}>Text Schedule</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onToggleModal}>Remove</Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onDecline={this.onDecline}
                    onAccept={this.onAccept}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    const {name, phone, shift} = state.employeeForm;
    return {name: name, phone: phone, shift: shift};
};

const mapDispatchToProps = dispatch => {
    return {
        onEmployeeCreate: (data) => dispatch(employeeCreate(data)),
        onInputHandler: (data) => dispatch(inputHandler(data)),
        onEmployeeEdit: (data) => dispatch(employeeUpdate(data)),
        onEmployeeDelete: (data) => dispatch(employeeDelete(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
