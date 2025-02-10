import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

interface IProps {
  isActive: boolean;
  closeCamera: () => void;
}

const CameraV2 = ({isActive, closeCamera}: IProps) => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef<Camera>(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  if (!hasPermission) {
    return <View>Please enable your camera</View>;
  }
  if (device == null) {
    return <View>No camera found</View>;
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        device={device}
        isActive={isActive}
        style={StyleSheet.absoluteFill}
        ref={camera}
      />
      <TouchableWithoutFeedback onPress={closeCamera}>
        <View style={styles.closeButton}>
          <FontAwesome5
            name="times"
            iconStyle="solid"
            color={'white'}
            size={24}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CameraV2;

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    aspectRatio: '1/1',
    margin: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgba(51, 51, 51, 0.75)',
  },
});
