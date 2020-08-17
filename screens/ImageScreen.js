import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {
    View,
    StyleSheet,
    StatusBar
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, useCode, block, cond, eq, } from 'react-native-reanimated';
import { onGestureEvent, useVector, vec, transformOrigin, timing, spring } from 'react-native-redash';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const ImageScreen = ({ route, navigation }) => {
    const { item } = route.params;

    const state = new Value(State.UNDETERMINED);
    const gestureScale = new Value(1);
    const focal = useVector(0, 0)
    const origin = useVector(0, 0)
    const gestureHandler = onGestureEvent({
        state,
        scale: gestureScale,
        focalX: focal.x,
        focalY: focal.y
    })
    const scale = cond(
        eq(state, State.END),
        spring({
            from: gestureScale, to: 1, velocity: 1, config: {
                damping: 18,
                mass: 1,
                stiffness: 150,
            }
        }),
        gestureScale
    )
    useCode(() => block([
        cond(eq(state, State.BEGAN), vec.set(origin, focal))
    ]), [focal, origin, state])
    return (
        <View style={styles.container}>
            <StatusBar translucent animated backgroundColor="transparent" barStyle='light-content' />
            <PinchGestureHandler {...gestureHandler}>
                <Animated.View style={{
                    width: '100%',
                    height: '100%'
                }}>
                    <AnimatedFastImage
                        style={[
                            styles.Image,
                            {
                                transform: [...transformOrigin(origin, { scale })]
                            }
                        ]}
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