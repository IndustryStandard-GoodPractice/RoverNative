import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import COLORS from '../global-styles/COLORS';
import TouchableScale from 'react-native-touchable-scale';
import Logo from '../assets/images/logo.svg';
import MoreButton from '../assets/images/moreButton.svg';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Expand from '../assets/images/expand.svg';
import Refresh from '../assets/images/refresh.svg';
import Filter from '../assets/images/filter.svg';
import Create from '../assets/images/create.svg';
import { BoxShadow } from 'react-native-shadow';
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, diffClamp, clamp, min } from 'react-native-redash';
import Animated, { Extrapolate, Value, event, block, cond, eq, set, add, and, Clock, clockRunning, stopClock, not, startClock, spring, multiply, abs, sub } from 'react-native-reanimated';

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
const bottomIconSize = 26;
const clampHeight = 180;
const cardWidth = Dimensions.get('screen').width - 28;
const screenHeight = Dimensions.get('screen').height;
const statusHeight = getStatusBarHeight();
const bottomNavHeight = 70;
const bottomNavWidth = cardWidth - 16;
const snapPoints = [-screenHeight + 250, 0];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const snapPoint = (
    points,
    value,
    velocity,
) => {
    const point = add(value, multiply(0.2, velocity));
    const diffPoint = (p) => abs(sub(point, p));
    const deltas = points.map((p) => diffPoint(p));
    const minDelta = min(...deltas);
    return points.reduce(
        (acc, p) => cond(eq(diffPoint(p), minDelta), p, acc),
        new Value()
    );
};
const withSpring = (
    value,
    gestureState,
    velocity,
    snapPoints,
    offset
) => {
    const clock = new Clock();
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };
    const config = {
        damping: 18,
        mass: 1,
        stiffness: 150,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
    }
    const isSpringInterrupted = and(
        eq(gestureState, State.BEGAN),
        clockRunning(clock)
    );
    const finishSpring = [set(offset, state.position), stopClock(clock)];

    return block([
        cond(isSpringInterrupted, finishSpring),
        cond(
            eq(gestureState, State.END),
            [
                cond(and(not(clockRunning(clock)), not(state.finished)), [
                    set(state.velocity, velocity),
                    set(state.time, 0),
                    set(config.toValue, snapPoint(snapPoints, value, velocity)),
                    startClock(clock)
                ]),
                spring(clock, state, config),
                cond(state.finished, finishSpring)
            ],
            [set(state.finished, 0), set(state.position, add(offset, value))]
        ),
        state.position
    ])
}

const HomeScreen = ({ navigation }) => {
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

    const shadowOpt = {
        width: bottomNavWidth,
        height: bottomNavHeight,
        color: COLORS.primary01,
        border: 20,
        radius: 35,
        opacity: .25,
        x: 0,
        y: 6,
    }
    const AnimatedBoxShadow = Animated.createAnimatedComponent(BoxShadow);

    const scrollY = new Animated.Value(0);
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, clampHeight)
    const headerY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, headerHeight, clampHeight],
        outputRange: [0, 0, -headerHeight],
    })
    const bottomNavY = Animated.interpolate(diffClampScrollY, {
        inputRange: [0, clampHeight],
        outputRange: [0, bottomNavHeight + 80],
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

    //bottomBar animations
    const state = new Value(State.UNDETERMINED);
    const translationY = new Value(0);
    const velocityY = new Value(0);
    const offsetY = new Value(0);
    const gestureHandler = onGestureEvent({
        state,
        translationY,
        velocityY
    })
    const translateY = withSpring(
        translationY,
        state,
        velocityY,
        snapPoints,
        offsetY,
    )

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

            <PanGestureHandler {...gestureHandler}>
                <Animated.View style={[styles.containBottom, { transform: [{ translateY: bottomNavY }] }]}>
                    <AnimatedBoxShadow setting={shadowOpt} style={[{ transform: [{ translateY: translateY }] }]}>
                        <View style={styles.bottomNavContainer}>
                            <View style={styles.rowContainer}>
                                <Expand width={bottomIconSize} height={bottomIconSize} />
                                <Text style={styles.bottomNavText}>frontpage</Text>
                            </View>
                            <View style={styles.bottomIconContain}>
                                <Refresh width={bottomIconSize} height={bottomIconSize} style={{ marginRight: 16 }} />
                                <Filter width={bottomIconSize} height={bottomIconSize} style={{ marginRight: 16 }} />
                            </View>
                            <View style={styles.FAB}>
                                <Create width={bottomIconSize} height={bottomIconSize} />
                            </View>
                        </View>
                    </AnimatedBoxShadow>
                </Animated.View>
            </PanGestureHandler>

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
                            bouncesZoom={false}
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
        height: Dimensions.get('screen').height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    FlatList: {
        paddingBottom: 30,
        paddingHorizontal: 8,
        paddingTop: headerHeight * 2 + 8,
        overflow: 'visible',
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
    },
    bottomNavContainer: {
        width: bottomNavWidth,
        backgroundColor: COLORS.primary01,
        height: bottomNavHeight,
        justifyContent: 'space-between',
        borderRadius: 100,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomNavText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 8
    },
    FAB: {
        position: 'absolute',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        bottom: 30,
        right: 30
    },
    containBottom: {
        position: 'absolute',
        bottom: 30,
        zIndex: 99,
    },
    bottomIconContain: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 73
    },
});

export default HomeScreen;