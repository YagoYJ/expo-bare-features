import { Box, Button, Heading, Stack } from "native-base";

import { ExpoCamera } from "../../components/Camera/ExpoCamera";
import { ImagePreview } from "../../components/Camera/ImagePreview";
import { VideoPreview } from "../../components/Camera/VideoPreview";

import { useCamera } from "../../contexts/Camera";

export function Camera() {
  const { permission, requestPermission, image, record } = useCamera();

  if (!permission) {
    return <Box />;
  }

  if (!permission.granted) {
    return (
      <Box flex={1} justifyContent="center" p="10">
        <Heading textAlign="center" mb="10">
          We need your permission to show the camera
        </Heading>
        <Button onPress={requestPermission}>Grant permission</Button>
      </Box>
    );
  }

  return (
    <Stack flex={1}>
      {image && <ImagePreview />}

      {record && <VideoPreview />}

      {!image && !record && <ExpoCamera />}
    </Stack>
  );
}
