import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, Spacing } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const GalleryScreen = () => {
  const navigation = useNavigation();
  // ----------------------------
  // Replace API with LOCAL IMAGES
  // ----------------------------
  const localGallery = [
    {
      id: 1,
      title: 'Image 1',
      file_path: require('../../../assets/homeicon/dashboard.png'),
    },
    {
      id: 2,
      title: 'Image 2',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 3,
      title: 'Image 3',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 4,
      title: 'Image 4',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 5,
      title: 'Image 5',
      file_path: require('../../../assets/homeicon/dashboard.png'),
    },
    {
      id: 6,
      title: 'Image 1',
      file_path: require('../../../assets/homeicon/dashboard.png'),
    },
    {
      id: 7,
      title: 'Image 2',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 8,
      title: 'Image 3',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 9,
      title: 'Image 4',
      file_path: require('../../../assets/homeicon/gallery.png'),
    },
    {
      id: 10,
      title: 'Image 5',
      file_path: require('../../../assets/homeicon/dashboard.png'),
    },
  ];

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openImage = item => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const handleDownload = () => {
    if (!selectedImage) return;

    Alert.alert(
      'Download Image',
      `Do you want to download "${selectedImage.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () =>
            Alert.alert('Success', 'Image downloaded successfully!'),
        },
      ],
    );
  };

  const renderGalleryItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.galleryItem, index % 3 !== 2 && styles.itemSpacing]}
      onPress={() => openImage(item)}
    >
      <Image source={item.file_path} style={styles.galleryImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />

      <View style={{ flex: 1, backgroundColor: COLORS.whiteBackground }}>
        <View style={styles.headerAtten}>
          <TouchableOpacity
            style={styles.backButtonAtten}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitleAtten}>Gallery</Text>
          <View style={{ width: '15%' }} />
        </View>

        <FlatList
          data={localGallery}
          renderItem={renderGalleryItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.galleryContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Image Modal */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeImage}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackground}
              onPress={closeImage}
            />

            <View style={styles.modalContent}>
              {selectedImage && (
                <>
                  <View style={styles.modalImageContainer}>
                    <Image
                      source={selectedImage.file_path}
                      style={styles.modalImage}
                    />
                  </View>

                  <View style={styles.imageInfo}>
                    <View style={styles.textContainer}>
                      <Text style={styles.modalTitle}>
                        {selectedImage.title}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={handleDownload}
                    >
                      <Text style={styles.downloadButtonText}>⬇️ Download</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// -----------------------------------------------------
// Styles
// -----------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerAtten: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.whiteBackgroundBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  backButtonAtten: { padding: 4 },

  headerTitleAtten: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },
  galleryContainer: {
    padding: 10,
    backgroundColor: COLORS.whiteBackground,
  },
  galleryItem: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.whiteBackground,
    // elevation: 1,
  },
  itemSpacing: {
    marginRight: 4,
  },
  galleryImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.gray,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.85,
    backgroundColor: COLORS.whiteBackground,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalImageContainer: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  textContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.whiteBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GalleryScreen;
