import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { useEffect, useState } from "react"
import CatImage from '../components/CatImage';

const ip = 'machines ip here'

async function getImages() {
    const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP || ip}:5178/getimages`)
    if (!response.ok) {
        throw new Error("Failed to fetch images")
    }
    const data = await response.json()
    const photos = data.photos
    return photos
}

export default function App() {
    const [images, setImages] = useState([])

    const newImages = (newImgs) => {
        setImages((prevImages) => [...prevImages, ...newImgs]);
    };


    const endReached = () => {
        getImages().then((photos) => {
            newImages(photos)
        })
    };

    useEffect(() => {
        getImages().then((photos) => {
            newImages(photos)
        })
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                style={{ width: '100%' }}
                renderItem={({ item }) => <CatImage image={item} />}
                keyExtractor={item => item.id}
                onEndReached={endReached}
                onEndReachedThreshold={0.1}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7F1',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
