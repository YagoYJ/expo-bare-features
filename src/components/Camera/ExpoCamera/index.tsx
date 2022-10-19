import { Camera } from "expo-camera";
import { IconButton, Stack } from "native-base";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useCamera } from "../../../contexts/Camera";

export function ExpoCamera() {
  const {
    type,
    isRecording,
    startRecord,
    stopRecord,
    takePicture,
    toggleCameraType,
    updateCamera,
  } = useCamera();

  return (
    <Camera type={type} ref={(ref) => updateCamera(ref)} style={{ flex: 1 }}>
      <Stack
        p="5"
        mt="auto"
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        bg="rgba(0, 0, 0, 0.6)"
      >
        {isRecording ? (
          <IconButton
            onPress={stopRecord}
            colorScheme="red"
            variant="solid"
            size="lg"
            rounded="full"
            _icon={{
              as: Ionicons,
              name: "stop-sharp",
            }}
          />
        ) : (
          <IconButton
            onPress={startRecord}
            colorScheme="red"
            variant="solid"
            size="lg"
            rounded="full"
            _icon={{
              as: MaterialCommunityIcons,
              name: "record-circle",
            }}
          />
        )}

        <IconButton
          onPress={takePicture}
          colorScheme="indigo"
          variant="solid"
          size="lg"
          rounded="full"
          _icon={{
            as: Feather,
            name: "camera",
          }}
        />

        <IconButton
          onPress={toggleCameraType}
          variant="ghost"
          size="lg"
          _icon={{
            color: "#fff",
            as: Ionicons,
            name: "ios-camera-reverse-outline",
          }}
        />
      </Stack>
    </Camera>
  );
}
