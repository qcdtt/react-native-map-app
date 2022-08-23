import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBar: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#808080',
        borderRadius: 10,
        padding: 20,
        height: 40,
        fontSize: 18,
    },
    emptyListMsgContainer: {
        marginTop: 40,
    },
    emptyListMsgText: {
        fontSize: 18,
        textAlign: 'center',
    },
    resetButton: {
        margin: 10,
    },
});

export default styles;