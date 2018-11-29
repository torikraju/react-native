import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Card, CardSection, Button} from '../common/index';
import {employeeCreate} from '../../store/actions/index';
import EmployeeFrom from '../EmployeeFrom/EmployeeFrom';

class EmployeeCreate extends Component {
    onButtonPress = () => {
        const {name, phone, shift} = this.props;
        this.props.onEmployeeCreate({name, phone, shift: shift || 'sunday'});
    };

    render() {
        return (
            <Card>
                <EmployeeFrom {...this.props}/>
                <CardSection>
                    <Button onPress={this.onButtonPress}> Create</Button>
                </CardSection>
            </Card>
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
        onEmployeeCreate: (data) => dispatch(employeeCreate(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
