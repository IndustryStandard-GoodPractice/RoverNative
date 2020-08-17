import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';

const CommentComponent = ({ item, count, forwardedRef }) => {
    let [toggle, setToggle] = React.useState(false);

    if (item.subComment != null) {
        return (
            <TouchableScale
                tension={300}
                friction={20}
                activeScale={.95}
                onPress={() => {
                    forwardedRef.current.animateNextTransition();
                    setToggle(toggle = !toggle);
                    console.log(toggle)
                }}
            >
                <View style={[styles.commentContainer]}>
                    <View style={styles.commentInfo}>
                        <Text style={styles.infoText}>{item.username}</Text>
                        <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>
                        {item.commentText}
                    </Text>
                    {toggle == true && (
                        <View style={[styles.contentContain]}>
                            <CommentComponent item={item.subComment} count={count + 1} forwardedRef={forwardedRef}></CommentComponent>
                        </View>
                    )}
                </View>
            </TouchableScale>
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