import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import MapView, {MarkerAnimated, UrlTile} from 'react-native-maps';

function App(): React.JSX.Element {
  return (
        <MapView
            // style={styles.map}
            style={{ flex: 1 }}
            mapType="none"
            // provider={null}
            showsUserLocation={true}
            showsTraffic={true}
            userLocationCalloutEnabled
            initialRegion={{
              latitude: 21.030643,
              longitude: 105.780387,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
          <UrlTile  zIndex={-1}  urlTemplate={'https://tiles.stadiamaps.com/styles/osm_bright.json?api_key=$f6b00bdc-e9cd-4905-843d-de79c055e203'}  />
          {/*<SafeAreaView >*/}
          {/*<Text>Maker</Text>*/}
          <MarkerAnimated
              coordinate={{latitude: 21.030643, longitude:105.780387 }}
          />

          <MarkerAnimated
              coordinate={{latitude: 21.029311, longitude: 105.780114 }}
          />
          {/*</SafeAreaView>*/}
        </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
