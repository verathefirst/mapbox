import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {MarkerAnimated, PROVIDER_DEFAULT, Marker,UrlTile,Polyline} from 'react-native-maps';

function App(): React.JSX.Element {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
console.log('routeCoordinates',routeCoordinates);

  const origin = { latitude: 21.030722, longitude: 105.780051 };

  const destination = { latitude: 21.036589, longitude: 105.794960 };
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?geometries=geojson`
        );
        const data = await response.json();
            console.log('data',data);
            
        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => ({
            latitude: coord[1],
            longitude: coord[0],
          }));
          setRouteCoordinates(coordinates);
        } else {
          console.error('No routes found');
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    fetchRoute();
  },[]);
  return (
        // <MapView
        //     // style={styles.map}
        //     style={{ flex: 1 }}
        //     mapType="none"
        //     // provider={null}
        //     showsUserLocation={true}
        //     showsTraffic={true}
        //     userLocationCalloutEnabled
        //     initialRegion={{
        //       latitude: 21.030643,
        //       longitude: 105.780387,
        //       latitudeDelta: 0.0922,
        //       longitudeDelta: 0.0421,
        //     }}
        // >
        //   <UrlTile  zIndex={-1}  urlTemplate={'https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=$f6b00bdc-e9cd-4905-843d-de79c055e203'}  />
        //   {/*<SafeAreaView >*/}
        //   {/*<Text>Maker</Text>*/}
        //   <MarkerAnimated
        //       coordinate={{latitude: 21.030643, longitude:105.780387 }}
        //   />
        //   <MarkerAnimated
        //       coordinate={{latitude: 21.029311, longitude: 105.780114 }}
        //   />
        //   {/*</SafeAreaView>*/}
        // </MapView>
        <View style={styles.container}>
       <MapView
          // mapType="none"
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        <Marker coordinate={origin} title="Origin" id='1'/>
        <Marker coordinate={destination} title="Destination" id='2' />

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="blue"
            strokeWidth={3}
          />
        )}
      </MapView>
      </View>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
