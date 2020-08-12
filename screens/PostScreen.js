import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import CommentComponent from '../assets/components/CommentComponent';
import COLORS from '../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native';

const getComments = () => {
    return commentData;
}

const commentData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        username: 'u/crompton',
        time: '43 minutes ago',
        karma: '1854 points',
        commentText: 'Greenwood is the one that can get easy goals. The number of amazing chances he got against cardiff and in preseason are not by luck. He knows exactly where and when to be in the final third.'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53vDvSDvcsd',
        username: 'u/fuckyoudylan',
        time: '35 minutes ago',
        karma: '541 points',
        commentText: 'Greenwood is the one that can get easy goals. The number of amazing chances he got against cardiff and in preseason are not by luck. He knows exactly where and when to be in the final third.'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3asdfasdgad',
        username: 'u/blahblah',
        time: '9 minutes ago',
        karma: '985 points',
        commentText: 'Greenwood is the one that can get easy goals. The number of amazing chances he got against cardiff and in preseason are not by luck. He knows exactly where and when to be in the final third.'
    },
];

const PostScreen = ({ route, navigation }) => {
    const { item } = route.params;

    const renderItem = ({ item }) => (
        <TouchableScale
            tension={300}
            friction={20}
            activeScale={.95}
            onPress={() => navigation.navigate('PostScreen', {
                item: item,
            })}
        >
            <CommentComponent item={item}/>
        </TouchableScale>
    );
    return (
        <View style={styles.container}>
            <PostCard item={item} cStyle={styles}/>
            <FlatList
                decelerationRate={0.998}
                showsVerticalScrollIndicator={false}
                data={getComments()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
    },
    card: {
        minWidth: '100%',
        borderWidth: 0,
        borderColor: COLORS.gray01,
        borderRadius: 16,
        paddingBottom: 20,
        marginBottom: 16,
    },
    Image: {
        height: 220,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export default PostScreen;