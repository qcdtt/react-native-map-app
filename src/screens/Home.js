import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Pressable, } from 'react-native';
import { SearchBar } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import PlaceItem from '../components/PlaceItem';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace, getHistory } from '../actions/place';
import { useFocusEffect } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const { places } = useSelector(state => state);
    const dispatch = useDispatch();

    const [fetchFlag, setFetchFlag] = useState(false);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [place, setPlace] = useState(null);


    useFocusEffect(
        React.useCallback(() => {
            dispatch(getHistory());
            return () => {
            };
        }, [])
    );

    useEffect(() => {
        dispatch(searchPlace());
        console.log('places: ' + JSON.stringify(places));
        setFetchFlag(true);
    }, [dispatch]);

    useEffect(() => {
        dispatch(getHistory());
        console.log('history: ' + JSON.stringify(places.searchHistory));
    }, [fetchFlag]);

    const autocomplete = (input) => {
        if (input) {
            const newData = places.places.filter(
                function (item) {
                    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                    const textData = input.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setSearchResults(newData);
            setSearch(input);
        } else {
            setSearchResults([]);
            setSearch(input);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder='Search place'
                value={search}
                onChangeText={(value) => autocomplete(value)}
            />
            <FlatList
                data={searchResults}
                // data={places!=null?place:[]}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListMsgContainer}>
                        <Text style={styles.emptyListMsgText}>There is no matched places.</Text>
                    </View>
                )}
                renderItem={({ item }) => <PlaceItem item={item} type='Results' />}
                keyExtractor={item => item.name}
            />
            <FlatList
                data={places.searchHistory}
                ListEmptyComponent={() => (
                    <View style={styles.emptyListMsgContainer}>
                        <Text style={styles.emptyListMsgText}>No search history.</Text>
                    </View>
                )}
                renderItem={({ item }) => <PlaceItem item={item} type='History' />}
                keyExtractor={item => item.name}
            />
        </View>
    );
}

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
        padding: 10,
        fontSize: 18,
    },
    emptyListMsgContainer: {
        marginTop: 15,
    },
    emptyListMsgText: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default Home;