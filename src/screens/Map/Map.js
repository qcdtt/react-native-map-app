import React from 'react';
import { View, } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import styles from './styles';

const Map = ({ route }) => {
    const { place } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: parseFloat(place.latitude),
                        longitude: parseFloat(place.longitude),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: parseFloat(place.latitude),
                            longitude: parseFloat(place.longitude)
                        }}
                        title={place.name}
                    />
                </MapView>
            </View>
        </View>
    );
}

export default Map;