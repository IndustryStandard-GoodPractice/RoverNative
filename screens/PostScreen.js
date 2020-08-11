import * as React from 'react';
import PostCard from '../assets/components/PostCard';
import COLORS from '../global-styles/COLORS';
import {
    View,
    StyleSheet,
} from 'react-native';

const PostScreen = ({ route, navigation }) => {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <PostCard item={item} cStyle={styles}/>
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
        paddingHorizontal: 0,
    },
    FlatList: {
        marginTop: 16
    },
    card: {
        flex: 1,
        minWidth: '100%',
        borderWidth: 0,
        borderColor: COLORS.gray01,
        borderRadius: 16,
        paddingBottom: 20,
        marginBottom: 16
    },
    Image: {
        height: 220,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
});

export default PostScreen;