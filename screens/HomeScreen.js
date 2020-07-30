import * as React from 'react';
import COLORS from '../global-styles/COLORS';
import FastImage from 'react-native-fast-image';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';

const getPosts = () => {
    return DATA;
}

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Strange man opens a lot of boxes - Bad Unboxing Fan Mail',
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

const HomeScreen = () => {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <FastImage
                style={styles.Image}
                source={{
                    uri: item.image
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.infoContain}>
                <View style={styles.subredditContain}>
                    <Text style={styles.subredditText}>{item.subreddit}</Text>
                    <Text style={styles.infoText}>{item.source}</Text>
                </View>
                    <Text style={styles.titleText}>{item.title}</Text>
                <View style={styles.bottomInfoContain}>
                    <View>
                        <Text style={styles.infoText}>{item.username}</Text>
                        <Text style={styles.infoText}>{item.time}</Text>
                    </View>
                    <View>
                        <Text style={styles.infoText}>{item.karma}</Text>
                        <Text style={styles.infoText}>{item.comments}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
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
        marginTop: 16
    },
    Image: {
        height: 180,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.gray01,
        borderRadius: 16,
        paddingBottom: 20,
        marginBottom: 16
    },
    subredditContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 16
    },
    bottomInfoContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    infoContain: {
        paddingHorizontal: 16
    },
    infoText: {
        color: COLORS.gray02
    },
    titleText: {
        fontSize: 16
    },
    subredditText: {
        color: COLORS.secondary01
    }
});

export default HomeScreen;