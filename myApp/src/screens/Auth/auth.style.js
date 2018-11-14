import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    backgroundImage: {
        width: '100%',
        flex: 1
        // height:'100%'
    },
    passwordContainer: {
        flexDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
        justifyContent: 'space-between'
    },
    passwordWrapper: {
        width: Dimensions.get('window').height > 500 ? '100%' : '45%'
    }
});
