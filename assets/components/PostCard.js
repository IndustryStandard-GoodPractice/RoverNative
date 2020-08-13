import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import FastImage from 'react-native-fast-image';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const PostCard = ({item, cStyle, navigation}) => {
    return (
        <View style={cStyle.card}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ImageScreen', {
                    item: item,
                })}
            >
                <FastImage
                    style={cStyle.Image}
                    source={{
                        uri: item.image
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
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
                    <View style={styles.karmaText}>
                        <Text style={styles.infoText}>{item.karma}</Text>
                        <Text style={styles.infoText}>{item.comments}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    },
    karmaText: {
        alignItems: 'flex-end'
    }
});

export default PostCard;