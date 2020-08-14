import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native';

const ImageScreen = ({ route, navigation }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <StatusBar translucent animated backgroundColor="transparent" barStyle='light-content'/>
            <FastImage
                style={styles.Image}
                source={{
                    uri: item.image
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    Image: {
        flex: 1,
    },
});

export default ImageScreen;