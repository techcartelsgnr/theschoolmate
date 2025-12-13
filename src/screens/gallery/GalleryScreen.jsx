import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FontSizes } from '../../theme/theme';
import { useSelector } from 'react-redux';
import commanServices from '../../redux/services/commanServices';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const GalleryScreen = () => {
  const navigation = useNavigation();
  const { token } = useSelector(state => state.auth);

  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // FULL SCREEN VIEW STATES
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ----------------------------
  // Fetch Gallery API
  // ----------------------------
  useEffect(() => {
    if (!token) return;
    loadGallery();
  }, [token]);

  const loadGallery = () => {
    commanServices
      .getSchoolGallery(token)
      .then(res => setGallery(res.images))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    commanServices
      .getSchoolGallery(token)
      .then(res => setGallery(res.images))
      .catch(err => console.log(err))
      .finally(() => setRefreshing(false));
  };

  // ----------------------------
  // Full Screen Swipe Handling
  // ----------------------------
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 70) {
        // Swipe Right
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
      } else if (gestureState.dx < -70) {
        // Swipe Left
        if (currentIndex < gallery.length - 1)
          setCurrentIndex(currentIndex + 1);
      }
    },
  });

  const openFullScreen = index => {
    setCurrentIndex(index);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const renderGalleryItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.galleryItem, index % 3 !== 2 && styles.itemSpacing]}
      onPress={() => openFullScreen(index)}
    >
      <Image source={{ uri: item.img }} style={styles.galleryImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="dark-content" />

      {/* HEADER */}
      <View style={styles.headerAtten}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitleAtten}>Gallery</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* GALLERY GRID */}
      {!isFullScreen && (
        <>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginTop: 40 }}
            />
          ) : (
            <FlatList
              data={gallery}
              renderItem={renderGalleryItem}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              contentContainerStyle={styles.galleryContainer}
              refreshing={refreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}

      {/* -----------------------------
         FULL SCREEN IMAGE VIEWER 
         ----------------------------- */}
      {isFullScreen && (
        <View style={styles.fullScreenContainer} {...panResponder.panHandlers}>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeFullScreen}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Image */}
          <Image
            source={{ uri: gallery[currentIndex].img }}
            style={styles.fullScreenImage}
          />

          {/* Left Navigation */}
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.leftNav}
              onPress={() => setCurrentIndex(currentIndex - 1)}
            >
              <Ionicons name="chevron-back" size={40} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Right Navigation */}
          {currentIndex < gallery.length - 1 && (
            <TouchableOpacity
              style={styles.rightNav}
              onPress={() => setCurrentIndex(currentIndex + 1)}
            >
              <Ionicons name="chevron-forward" size={40} color="#fff" />
            </TouchableOpacity>
          )}

          {/* Counter */}
          <Text style={styles.counter}>
            {currentIndex + 1} / {gallery.length}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

// -------------------------------------------------

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
    backgroundColor: COLORS.whiteBackground,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  headerTitleAtten: {
    fontSize: FontSizes.normal,
    fontFamily: 'Quicksand-Bold',
    color: COLORS.textDark,
  },

  galleryContainer: {
    padding: 10,
  },

  galleryItem: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },

  itemSpacing: {
    marginRight: 4,
  },

  galleryImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },

  // FULL SCREEN MODE
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullScreenImage: {
    width,
    height,
    resizeMode: 'contain',
  },

  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 99,
  },

  leftNav: {
    position: 'absolute',
    left: 10,
    top: height / 2 - 20,
  },

  rightNav: {
    position: 'absolute',
    right: 10,
    top: height / 2 - 20,
  },

  counter: {
    position: 'absolute',
    bottom: 30,
    fontSize: FontSizes.normal,
    color: '#fff',
  },
});

export default GalleryScreen;
