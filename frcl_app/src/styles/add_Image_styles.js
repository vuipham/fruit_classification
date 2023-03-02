import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20

    },
    choose_image: {
        backgroundColor: '#ffffff',
        marginBottom: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderWidth: 3,
        borderColor: '#B1B2FF'

    },
    image: {
        width: 320,
        height: 320,
        borderBottomWidth: 30,
        borderTopRightRadius: 27,
        borderTopLeftRadius: 27,

    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    button_library: {
        alignItems: "center",
        padding: 14,
        backgroundColor: '#E60965',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        minWidth: "50%",
        borderTopWidth: 3,
        borderRightWidth: 1.5,
        borderColor: '#B1B2FF'

    },
    text_library: {
        color: '#FFD6EC',
        fontWeight: 'bold',
        textTransform: 'uppercase',

    },
    button_camera: {
        alignItems: "center",
        padding: 14,
        backgroundColor: '#6C4AB6',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        minWidth: "50%",
        borderTopWidth: 3,
        borderLeftWidth: 1.5,
        borderColor: '#B1B2FF'

    },
    text_camera: {
        color: '#D2DAFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',

    },
    data_view_fruit_name: {
        padding: 14,
        backgroundColor: '#F5C7A9',
        alignItems: 'center',
    },
    text_fruit_name: {
        color: '#D1512D',
        fontWeight: 'bold',
        textTransform: 'uppercase',

    },
    data_view: {
        padding: 20,
        backgroundColor: '#D2DAFF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    text_describe: {
        color: '#50577A',
        justifyContent: 'space-evenly',
    },
    text_vitamin: {
        color: '#C060A1',
    },
    welcome_view: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5C7A9',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,

    },
    text_welcome: {
        color: '#50577A',
        justifyContent: 'space-evenly',

    }

});

export default styles;