import React from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

import LoginForm from '../components/loginForm/LoginForm';
import EmployeeList from '../components/EmployeeList/EmployeeList';
import EmployeeCreate from '../components/EmployeeCreate/EmployeeCreate';

const RouterComponent = () => {
    return (
        <Router>
            <Scene key='root' titleStyle={styles.titleStyle} hideNavBar>
                <Scene key='auth'>
                    <Scene key='login' component={LoginForm} title='Login' initial={true}/>
                </Scene>
                <Scene key='main'>
                    <Scene rightTitle='Add' onRight={() => Actions.employeeCreate()} key='employeeList'
                           component={EmployeeList} title='Employee List'/>
                    <Scene key='employeeCreate' component={EmployeeCreate} title='Employee Create'/>
                </Scene>

            </Scene>
        </Router>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        textAlign: 'center',
        flex: 1
    }
});


export default RouterComponent;
