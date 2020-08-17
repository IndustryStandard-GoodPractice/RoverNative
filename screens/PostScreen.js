import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import CommentComponent from '../assets/components/CommentComponent';
import COLORS from '../global-styles/COLORS';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar,
    Dimensions
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
        commentText: 'Greenwood is the one that can get easy goals. The number of amazing chances he got against cardiff and in preseason are not by luck. He knows exactly where and when to be in the final third.',
        subComment:
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3adgdabgfbgfda',
            username: 'u/crompton',
            time: '43 minutes ago',
            karma: '1854 points',
            commentText: 'test sub comment',
            subComment:
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3adgdabgfbgfda',
                username: 'u/crompton',
                time: '43 minutes ago',
                karma: '1854 points',
                commentText: 'test sub comment'
            }
        }
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53vDvSDvcsd',
        username: 'u/fuckyoudylan',
        time: '35 minutes ago',
        karma: '541 points',
        commentText: 'Most come up as arrogant really..but some are appreciable though..Thiago Silva is one..so highly underrated...no one talks about him in the top 5 CB of the decade..but for me he is immense..we all know what happened to Brazil when he was suspended..also Navas is there..dont know if he will play against Leipzig.. would be ironic for Buffon though if Psg wins..but yeah.. Psg is the last team I would want to win from these 4'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3asdfasdgad',
        username: 'u/blahblah',
        time: '9 minutes ago',
        karma: '985 points',
        commentText: 'Greenwood is the one that can get easy goals. The number of amazing chances he got against cardiff and in preseason are not by luck. He knows exactly where and when to be in the final third.'
    },
];

const cardWidth = Dimensions.get('screen').width;

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={100} />
        <Transition.Change />
        <Transition.Out type='fade' durationMs={100} />
    </Transition.Together>
);

const PostScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const shadowOpacity = 0.01;
    const ref = React.useRef();

    const renderItem = ({ item }) => (
        <CommentComponent item={item} forwardedRef={ref} />
    );
    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
        >
            <StatusBar translucent animated backgroundColor="transparent" barStyle='dark-content' />
            <FlatList
                contentContainerStyle={styles.FlatList}
                decelerationRate={0.998}
                showsVerticalScrollIndicator={false}
                data={getComments()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={<PostCard item={item} cStyle={styles} navigation={navigation} shadowOpacity={shadowOpacity} />}
            />
        </Transitioning.View>
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
        backgroundColor: 'white',
    },
    card: {
        width: cardWidth,
        borderWidth: 0,
        borderColor: COLORS.gray01,
        borderRadius: 0,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    Image: {
        height: 220,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    FlatList: {
        marginTop: 80,
        paddingBottom: 100
    }
});

export default PostScreen;