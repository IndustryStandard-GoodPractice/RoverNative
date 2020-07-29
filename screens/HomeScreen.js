import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Dimensions
} from 'react-native';

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
        <Text style={styles.textStyle}>{item.title}</Text>
    );
    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 16, paddingTop: 16}}>
            <View style={styles.card}>
                <Image
                    style={styles.Image}
                    source={require('../assets/images/test.jpg')}
                />
                <View style={styles.infoContain}>
                    <View style={styles.subredditContain}>
                        <Text>r/blahblah</Text>
                        <Text>imgur.com</Text>
                    </View>
                    <Text>Strange man opens a lot of boxes - Bad Unboxing Fan Mail</Text>
                    <View style={styles.bottomInfoContain}>
                        <View>
                            <Text>u/jackson</Text>
                            <Text>1 hour ago</Text>
                        </View>
                        <View>
                            <Text>28.3k points</Text>
                            <Text>1418 comments</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList
                contentContainerStyle={styles.FlatList}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
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
    },
    Image: {
        flex: 1,
        maxHeight: 200,
        maxWidth: '100%'
    },
    card: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingBottom: 16
    },
    subredditContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginTop: 8
    },
    bottomInfoContain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    infoContain: {
        paddingHorizontal: 16
    }
});

export default HomeScreen;