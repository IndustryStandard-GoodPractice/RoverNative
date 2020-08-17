import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value } from 'react-native-reanimated';
import { onGestureEvent, useVector } from 'react-native-redash';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const ImageScreen = ({ route, navigation }) => {
    const { item } = route.params;

    const state = new Value(State.UNDETERMINED);
    const scale = new Value(1);
    const focal = useVector(0, 0)
    const gestureHandler = onGestureEvent({
        state,
        scale,
        focalX: focal.x,
        focalY: focal.y
    })
    return (
        <View style={styles.container}>
            <StatusBar translucent animated backgroundColor="transparent" barStyle='light-content' />
            <PinchGestureHandler {...gestureHandler}>
                <Animated.View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <AnimatedFastImage
                        style={[styles.Image, {
                            transform: [{ scale }]
                        }]}
                        source={{
                            uri: item.image
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </Animated.View>
            </PinchGestureHandler>
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