import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

const CommentComponent = ({ item, count }) => {
    const [toggle, setToggle] = React.useState(1);
    if (item.subComment != null) {
        return (
            <TouchableScale
                tension={300}
                friction={20}
                activeScale={.95}
                onPress={() => {
                    setToggle(toggle === 1 ? 0 : 1)
                    console.log(toggle)
                }}
            >
                <View style={styles.commentContainer}>
                    <View style={styles.commentInfo}>
                        <Text style={styles.infoText}>{item.username}</Text>
                        <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
                    </View>
                    {toggle === 1 && (
                        <View>
                            <Text style={styles.commentText}>
                                {item.commentText}
                            </Text>
                            <CommentComponent item={item.subComment} count={count + 1}></CommentComponent>
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
            <TouchableScale
                tension={300}
                friction={20}
                activeScale={.95}
                onPress={() => navigation.navigate('PostScreen', {
                    item: item,
                })}
            >
                <View style={styles.commentContainer}>
                    <View style={styles.commentInfo}>
                        <Text style={styles.infoText}>{item.username}</Text>
                        <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
                    </View>
                    <Text style={styles.commentText}>
                        {item.commentText}
                    </Text>
                </View>
            </TouchableScale>
        );
    }
}

const styles = StyleSheet.create({
    commentContainer: {
        flexGrow: 1,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.025)',
        borderRadius: 8,
        marginBottom: 12,
        overflow: 'hidden'
    },
    commentInfo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 12,
        color: COLORS.black50,
    },
    commentText: {
        marginBottom: 12
    }
});

export default CommentComponent;