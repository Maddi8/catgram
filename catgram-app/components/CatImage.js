import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import CustomText from './CustomText';

const copyToClipboard = async (link) => {
    await Clipboard.setStringAsync(link);
  };

const CatImage = ({ image }) => {
    return (
        <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
            <TouchableOpacity style={{ width: 300, height: 300 }} onPress={() => copyToClipboard(image.src.medium)}>
                <Image
                    source={{ uri: image.src.medium }}
                    style={{ width: 300, height: 300 }}
                />
            </TouchableOpacity>
            <CustomText>
                {image.alt}
            </CustomText>
        </View>
    );
};

export default CatImage;
