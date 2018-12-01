import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    pickerContainerStyle: {
        flex: 1,
        justifyContent: "center",
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    buttonTextStyle: {
        marginVertical: 10
    },
    textStyle:{
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    }
});


