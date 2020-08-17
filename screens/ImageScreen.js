import * as React from 'react';
import FastImage from 'react-native-fast-image';
import {
    View,
    StyleSheet,
    StatusBar,
    Dimensions
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, useCode, block, cond, eq, set, } from 'react-native-reanimated';
import { onGestureEvent, useVector, vec, transformOrigin, timing, spring, translate, pinchActive, pinchBegan } from 'react-native-redash';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const ImageScreen = ({ route, navigation }) => {
    const { item } = route.params;

    const state = new Value(State.UNDETERMINED);
    const scale = new Value(1);
    const numberOfPointers = new Value(0);
    const focal = vec.createValue(0, 0)
    const origin = vec.createValue(0, 0)
    const translation = vec.createValue(0, 0)
    const gestureHandler = onGestureEvent({
        numberOfPointers,
        state,
        scale,
        focalX: focal.x,
        focalY: focal.y
    });
    const adjustedFocal = vec.add({ x: -width / 2, y: -height / 2 }, focal)
    useCode(() => block([
        cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
        cond(pinchActive(state, numberOfPointers), vec.set(translation, vec.minus(vec.sub(origin, adjustedFocal)))),
        cond(eq(state, State.END), [
            set(translation.x, spring({
                from: translation.x, to: 0, config: {
                    damping: 18,
                    mass: 1,
                    stiffness: 150,
                }
            })),
            set(translation.y, spring({
                from: translation.y, to: 0, config: {
                    damping: 18,
                    mass: 1,
                    stiffness: 150,
                }
            })),
            set(scale, spring({
                from: scale, to: 1, config: {
                    damping: 18,
                    mass: 1,
                    stiffness: 150,
                }
            })),
        ])
    ]), [origin, state, scale, translation, adjustedFocal, numberOfPointers])
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
                                transform: [
                                    ...transformOrigin(origin, { scale }),
                                    ...translate(translation)
                                ]
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