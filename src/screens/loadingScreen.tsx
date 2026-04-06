import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Rotation animation for the loader
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation for the text
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Background gradient circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      <Animated.View
        style={[
          styles.contentBox,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Custom Loader */}
        <View style={styles.loaderContainer}>
          <Animated.View
            style={[
              styles.outerCircle,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.outerCircleSegment1} />
            <View style={styles.outerCircleSegment2} />
            <View style={styles.outerCircleSegment3} />
          </Animated.View>
          
          <Animated.View
            style={[
              styles.innerCircle,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          >
            <View style={styles.innerCircleDot} />
          </Animated.View>

          {/* PDF Icon in center */}
          <View style={styles.centerIcon}>
            <Text style={styles.pdfText}>PDF</Text>
          </View>
        </View>

        {/* Title with pulse animation */}
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          Warming up servers...
        </Animated.Text>

        <Text style={styles.subtitle}>
          Hold on a moment while we get everything ready for you 🚀
        </Text>

        {/* Loading dots */}
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, { opacity: pulseAnim }]} />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: pulseAnim.interpolate({
                  inputRange: [1, 1.05],
                  outputRange: [0.5, 1],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: pulseAnim.interpolate({
                  inputRange: [1, 1.05],
                  outputRange: [0.3, 0.8],
                }),
              },
            ]}
          />
        </View>

        {/* Brand name */}
        <Text style={styles.brandName}>PdfxFools</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 152, 42, 0.1)',
    top: -100,
    left: -100,
  },
  circle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(253, 186, 116, 0.08)',
    bottom: -50,
    right: -50,
  },
  circle3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(254, 215, 170, 0.06)',
    top: '50%',
    right: -80,
  },
  contentBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loaderContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  outerCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleSegment1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'transparent',
    borderTopColor: '#ff982a',
    borderRightColor: '#ff982a',
  },
  outerCircleSegment2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'transparent',
    borderBottomColor: '#fdba74',
    borderLeftColor: '#fdba74',
    opacity: 0.6,
  },
  outerCircleSegment3: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: '#fed7aa',
    opacity: 0.4,
  },
  innerCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 152, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircleDot: {
    position: 'absolute',
    top: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff982a',
  },
  centerIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#ff982a',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#ff982a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  pdfText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subtitle: {
    color: '#999',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
    width: width * 0.8,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff982a',
  },
  brandName: {
    position: 'absolute',
    bottom: -60,
    color: '#ff982a',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
});