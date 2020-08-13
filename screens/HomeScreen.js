import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import COLORS from '../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar
} from 'react-native';

const getPosts = () => {
    return DATA;
}

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First',
      subreddit: 'r/funny',
      source: 'imgur.com',
      username: 'u/jackson',
      time: '1 hour ago',
      karma: '28.3k points',
      comments: '1418 comments',
      image: 'https://unsplash.it/400/400?image=1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      subreddit: 'r/art',
      source: 'gfycat.com',
      username: 'u/robson',
      time: '2 hour ago',
      karma: '54.1k points',
      comments: '17818 comments',
      image: 'https://i.redd.it/1on44xh8hyd51.jpg',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      subreddit: 'r/reddevils',
      source: 'reddit.com',
      username: 'u/noahson',
      time: '12 hour ago',
      karma: '2.3k points',
      comments: '18 comments',
      image: 'https://gmsrp.cachefly.net/images/20/05/11/9726ed329d7dde972a396fd7132c68be/960.jpg',
    },
];

const HomeScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <TouchableScale
            tension={300}
            friction={20}
            activeScale={.95}
            onPress={() => navigation.navigate('PostScreen', {
                item: item,
            })}
        >
            <PostCard item={item} cStyle={styles} navigation={navigation}/>
        </TouchableScale>
    );
    return (
        <View style={styles.container}>
            <StatusBar translucent animated backgroundColor="transparent" barStyle='dark-content'/>
            <FlatList
                contentContainerStyle={styles.FlatList}
                decelerationRate={0.998}
                showsVerticalScrollIndicator={false}
                data={getPosts()}
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
    FlatList: {
        marginTop: 30,
        marginBottom: 30
    },
    card: {
        flex: 1,
        minWidth: '100%',
        borderWidth: 1,
        borderColor: COLORS.gray01,
        borderRadius: 16,
        paddingBottom: 20,
        marginBottom: 16
    },
    Image: {
        height: 180,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
});

export default HomeScreen;