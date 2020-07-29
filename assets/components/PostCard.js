import * as React from 'react';
import COLORS from '../../global-styles/COLORS';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

const PostCard = () => {
    return (
        <View style={styles.card}>
            <Image
                style={styles.Image}
                source={require('../images/test.jpg')}
            />
            <View style={styles.infoContain}>
                <View style={styles.subredditContain}>
                    <Text style={styles.subredditText}>r/blahblah</Text>
                    <Text style={styles.infoText}>imgur.com</Text>
                </View>
                <Text style={styles.titleText}>Strange man opens a lot of boxes - Bad Unboxing Fan Mail</Text>
                <View style={styles.bottomInfoContain}>
                    <View>
                        <Text style={styles.infoText}>u/jackson</Text>
                        <Text style={styles.infoText}>1 hour ago</Text>
                    </View>
                    <View>
                        <Text style={styles.infoText}>28.3k points</Text>
                        <Text style={styles.infoText}>1418 comments</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Image: {
        flex: 1,
        maxHeight: 200,
        maxWidth: '100%',
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

export default PostCard;