import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import commanServices from '../redux/services/commanServices';

export default function BasicSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [sliderImages, setSliderImages] = useState([]);

  const { token } = useSelector(state => state.auth);

  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight * 0.25;

  // -----------------------------
  // 🔥 Fetch Slider Images (API)
  // -----------------------------
  useEffect(() => {
    if (!token) return;

    console.log("Slider → Token:", token);

    commanServices
      .getSlider(token)
      .then((res) => {
        console.log("Slider API Response:", res);

        if (res.images && res.images.length > 0) {
          setSliderImages(res.images);
        }
      })
      .catch((error) => {
        console.error("Error fetching slider images:", error);
      });
  }, [token]);

  // -----------------------------
  // 🔥 Auto Scroll
  // -----------------------------
  useEffect(() => {
    if (sliderImages.length === 0) return;

    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % sliderImages.length;
          const targetX = nextIndex * windowWidth;
          scrollViewRef.current.scrollTo({ x: targetX, animated: true });
          return nextIndex;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages, windowWidth]);

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <View style={[styles.scrollContainer, { height: windowHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.scrollViewStyle}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          {sliderImages.map((slider, index) => (
            <View key={index} style={{ width: windowWidth }}>
              <Image
                source={{ uri: slider.img }}
                style={styles.card}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {sliderImages.map((_, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const dotColor = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: ['#aaa', '#000', '#aaa'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.normalDots, { width, backgroundColor: dotColor }]}
            />
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    borderRadius: 10,
  },
  scrollContainer: {
    shadowOffset: { width: 10, height: -10 },
    shadowOpacity: 1,
  },
  card: {
    flex: 1,
    marginBottom: 0,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
