import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, } from 'react-native';
import { SearchBar, SegmentedControl, } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import PlaceItem from '../../components/PlaceItem/PlaceItem';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace, getHistory } from '../../actions/place';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

const Home = () => {
    const navigation = useNavigation();
    const { places } = useSelector(state => state);
    const dispatch = useDispatch();

    const [fetchFlag, setFetchFlag] = useState(false);
    const [showResults, setShowResults] = useState(true);
    const [showHistory, setShowHistory] = useState(false);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [place, setPlace] = useState(null);


    useFocusEffect(
        React.useCallback(() => {
            setSearch('');
            setSearchResults([]);
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

    const resetHistory = () => {
        dispatch(resetHistory());
    }

    return (
        <View style={styles.container}>
            {showResults ? (
                <SearchBar
                    style={styles.searchBar}
                    value={search}
                    placeholder='Search place'
                    onCancel={() => setSearch('')}
                    onChange={(value) => {
                        if (showResults == false) {
                            setShowResults(true);
                            setShowHistory(false);
                        }
                        autocomplete(value)
                    }}
                    cancelText='X'
                />
            ) : ''}
            <SegmentedControl
                values={['Search Results', 'History']}
                tintColor={'#1253bc'}
                style={{ height: 40, }}
                onValueChange={() => {
                    setShowResults(!showResults);
                    setShowHistory(!showHistory);
                    if (showHistory) {
                        setSearch('');
                        setSearchResults([]);
                    }
                }}
            />
            {
                (showResults || search && showHistory == false) ? (
                    <FlatList
                        data={searchResults}
                        ListEmptyComponent={() => (
                            <View style={styles.emptyListMsgContainer}>
                                <Text style={styles.emptyListMsgText}>There is no matched place.</Text>
                            </View>
                        )}
                        renderItem={({ item }) => <PlaceItem item={item} type='Results' />}
                        keyExtractor={item => item.name}
                    />
                ) : ''
            }
            {
                showHistory && places.loading == false ? (
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
                ) : ''
            }
        </View>
    );
}

export default Home;