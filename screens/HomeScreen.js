import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import COLORS from '../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import Logo from '../assets/images/logo.svg';
import MoreButton from '../assets/images/moreButton.svg';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const getPosts = () => {
    return DATA;
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Scumbags who do this to their license plates should have their license revoked.......make them re-do the drivers test with all the 16 year olds',
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
        title: 'Where can I buy this new execution?',
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
        title: 'A wedding pic of two U.S. citizens madly in love... We celebrated our 21st anniversary last week',
        subreddit: 'r/reddevils',
        source: 'reddit.com',
        username: 'u/noahson',
        time: '12 hour ago',
        karma: '2.3k points',
        comments: '18 comments',
        image: 'https://gmsrp.cachefly.net/images/20/05/11/9726ed329d7dde972a396fd7132c68be/960.jpg',
    },
];

const headerHeight = 80;
const iconSize = 35;
const clampHeight = 180;
const cardWidth = Dimensions.get('screen').width - 28;
const statusHeight = getStatusBarHeight();

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HomeScreen = ({ navigation }) => {
    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, clampHeight)
    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, headerHeight, clampHeight],
        outputRange: [0, 0, -headerHeight],
    })
    const opacityY = Animated.interpolate(scrollY, {
        inputRange: [0, 60],
        outputRange: [1, 0]
    })
    const textY = Animated.interpolate(scrollY, {
        inputRange: [0, headerHeight],
        outputRange: [0, -headerHeight + 50]
    })
    const shadowOpacity = 0.07;
    const renderItem = ({ item }) => (
        <TouchableScale
            tension={300}
            friction={20}
            activeScale={.95}
            style={{ overflow: 'visible' }}
            onPress={() => navigation.navigate('PostScreen', {
                item: item,
            })}
        >
            <PostCard item={item} cStyle={styles} navigation={navigation} shadowOpacity={shadowOpacity} />
        </TouchableScale>
    );
    return (
        <View style={styles.container}>
            <StatusBar translucent animated backgroundColor="transparent" barStyle='dark-content' />
            <Animated.View style={[styles.header, { transform: [{ translateY: headerY }] }]}>
                <View style={styles.headerRow}>
                    <Logo width={iconSize} height={iconSize} />
                    <TouchableOpacity>
                        <MoreButton width={iconSize} height={iconSize} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Animated.View style={[styles.textContainer, { opacity: opacityY }, { transform: [{ translateY: textY }] }]}>
                <Text style={styles.headerTopText}>There have been about</Text>
                <Text style={styles.headerBottomText}>800 posts in the last hour</Text>
            </Animated.View>
            <AnimatedFlatList
                contentContainerStyle={styles.FlatList}
                decelerationRate={0.998}
                showsVerticalScrollIndicator={false}
                data={getPosts()}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                renderScrollComponent={props => {
                    return (
                        <Animated.ScrollView
                            {...props}
                            scrollEventThrottle={16}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                { useNativeDriver: true },
                            )}
                        />
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: headerHeight,
        paddingTop: statusHeight,
        paddingBottom: 20,
        paddingHorizontal: 16,
        justifyContent: 'center',
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 20
    },
    headerTopText: {
        fontSize: 20,
        fontWeight: '300'
    },
    headerBottomText: {
        fontSize: 25
    },
    textStyle: {
        fontSize: 14,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    FlatList: {
        paddingBottom: 30,
        paddingHorizontal: 8,
        paddingTop: headerHeight * 2 + 8,
        overflow: 'visible'
    },
    card: {
        flexGrow: 1,
        width: cardWidth,
        borderWidth: 0,
        borderColor: COLORS.gray01,
        borderRadius: 16,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    Image: {
        height: 240,
        width: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    textContainer: {
        position: 'absolute',
        top: headerHeight + 8,
        width: '100%',
        paddingHorizontal: 16
    }
});

export default HomeScreen;