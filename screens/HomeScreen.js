import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';
import PostCard from '../assets/components/PostCard';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
];

const HomeScreen = () => {
    const renderItem = ({ item }) => (
        <PostCard />
    );
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.FlatList}
                decelerationRate={0.998}
                showsVerticalScrollIndicator={false}
                data={DATA}
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
    }
});

export default HomeScreen;