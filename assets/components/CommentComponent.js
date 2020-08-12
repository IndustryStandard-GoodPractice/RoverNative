import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';

const CommentComponent = ({ item }) => {
    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentInfo}>
                <Text style={styles.infoText}>{item.username}</Text>
                <Text style={styles.infoText}>{item.karma} ⋅ {item.time}</Text>
            </View>
            <Text>
            {item.commentText}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    commentContainer: {
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.025)',
        borderRadius: 8,
        marginBottom: 12,
    },
    commentInfo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 12,
        color: COLORS.black50,
    }
});

export default CommentComponent;