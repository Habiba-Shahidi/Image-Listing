import React, { useState, useEffect, useRef } from 'react';
import { View, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';

const ImageListScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
 

  const fetchImages = async (newOffset) => {
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
        }
      );

      console.log('Response From Api', response);
      if (response.status === 200 && response.data && response.data.status === 'success') {
        const newImages = response.data.images.map(image => ({
          id: image.id,
          imageUrl: image.xt_image,
        }));
       
        const uniqueNewImages = newImages.filter(newImage => !images.some(image => image.id === newImage.id));
        setImages((prevImages) => [...prevImages, ...uniqueNewImages]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
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

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleImageTap(item)}>
      <Image source={{ uri: item.imageUrl }} style={{ height: undefined, width: '100%', aspectRatio: 1 }} />
    </TouchableOpacity>
  );

  const handleImageTap = (selectedImage) => {
    navigation.navigate('DetailsScreen', { item: selectedImage });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Load More" onPress={loadMoreImages} />
    </View>
  );
};

export default ImageListScreen;










