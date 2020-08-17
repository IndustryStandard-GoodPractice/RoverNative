import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import useComponentSize from '../../functions/useComponentSize';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { onGestureEvent, mix, withTimingTransition } from 'react-native-redash';
import Animated, { not, useCode, set, cond, eq, Value, useValue, Easing, interpolate } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const CommentComponent = ({ item, count }) => {
    const [commentHeight, setCommentHeight] = React.useState(40);
    const [size, onLayout] = useComponentSize();

    React.useEffect(() => {
        setCommentHeight(size.height + 40)
        console.log(isOpen)
    }, [onLayout])

    const isOpen = useValue(0);
    const transition = withTimingTransition(isOpen, {
        duration: 250,
        easing: Easing.inOut(Easing.ease)
    });
    const state = useValue(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({ state });
    const height = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, 400]
    })

    useCode(() =>
        cond(eq(state, State.END), set(isOpen, not(isOpen))),
        [isOpen, state]
    );

    if (item.subComment != null) {
        return (
            <TapGestureHandler {...gestureHandler}>
                <Animated.View style={[styles.commentContainer]}>
                    <View style={styles.commentInfo}>
                        <Text style={styles.infoText}>{item.username}</Text>
                        <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>
                        {item.commentText}
                    </Text>
                    <Animated.View style={[styles.contentContain, { height }]}>
                        <View onLayout={onLayout}>
                            <CommentComponent item={item.subComment} count={count + 1}></CommentComponent>
                        </View>
                    </Animated.View>
                </Animated.View>
            </TapGestureHandler>
        );
    }
    else if (count >= 5) {
        return (
            <View style={styles.commentContainer}>
                <Text>see rest of comments</Text>
            </View>
        );
    }
    else {
        return (
            <View style={[styles.commentContainer]}>
                <View style={styles.commentInfo}>
                    <Text style={styles.infoText}>{item.username}</Text>
                    <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
                </View>
                <Text style={styles.commentText}>
                    {item.commentText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentContainer: {
        flexGrow: 1,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.025)',
        borderRadius: 8,
        marginBottom: 12,
        justifyContent: 'flex-start',
        overflow: 'hidden'
    },
    commentInfo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        overflow: 'visible',
        marginBottom: 4
    },
    infoText: {
        fontSize: 12,
        color: COLORS.black50,
    },
    commentText: {
        marginBottom: 12,
    },
    contentContain: {
        marginTop: 8
    }
});

export default CommentComponent;