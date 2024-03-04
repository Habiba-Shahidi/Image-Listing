import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const ImageListScreen = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = async newOffset => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', newOffset.toString());
      formData.append('type', 'popular');

      console.log('Form data', formData);
      const response = await axios.post(
        'http://dev3.xicom.us/xttest/getdata.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('Response From Api', response.data.images);
      if (
        response.status === 200 &&
        response.data &&
        response.data.status === 'success'
      ) {
        const newImages = await Promise.all(
          response.data.images.map(async image => {
            const dimensions = await getImageDimensions(image.xt_image);
            return {
              id: image.id,
              imageUrl: image.xt_image,
              dimensions,
            };
          }),
        );

        const uniqueNewImages = newImages.filter(
          newImage => !images.some(image => image.id === newImage.id),
        );
        setImages(prevImages => [...prevImages, ...uniqueNewImages]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageDimensions = imageUrl => {
    return new Promise((resolve, reject) => {
      Image.getSize(
        imageUrl,
        (width, height) => {
          resolve({width, height});
        },
        error => {
          console.error('Error getting image dimensions:', error);
          reject(error);
        },
      );
    });
  };

  const loadMoreImages = () => {
    if (!loading) {
      const newOffset = offset + 1;
      setOffset(newOffset);
      fetchImages(newOffset);
    }
  };

  useEffect(() => {
    fetchImages(offset);
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleImageTap(item)}>
      {item.dimensions ? (
        <Image
          source={{uri: item.imageUrl}}
          style={[
            {
              aspectRatio: item.dimensions.width / item.dimensions.height,
            },
            styles.imageStyle,
          ]}
        />
      ) : (
        <View style={styles.dimensionLoadingContainer}>
          <Text style={styles.dimensionLoadingText}>
            Image Dimensions Loading...
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const handleImageTap = selectedImage => {
    navigation.navigate('DetailsScreen', {item: selectedImage});
  };

  return (
    <View style={styles.mainContainer}>
      {images.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <Button title="Click to Load More" onPress={loadMoreImages} />
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default ImageListScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 5,
  },
  loadingText: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'blue',
    fontSize: 20,
  },
  imageStyle: {
    marginTop: 5,
    marginBottom: 10,
  },
  dimensionLoadingContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  dimensionLoadingText: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'blue',
    fontSize: 20,
  },
});
