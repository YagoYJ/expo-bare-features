import { useRef } from "react";
import { Box, Button } from "native-base";
import { Video } from "expo-av";

import { useCamera } from "../../../contexts/Camera";

export function VideoPreview() {
  const { record, clearRecord } = useCamera();
  const video = useRef(null);

  return (
    <Box w="100%" flex={1} p="5">
      <Video
        ref={video}
        style={{
          width: "100%",
          flex: 1,
        }}
        source={{
          uri: record,
        }}
        useNativeControls
      />

      <Button mt="10" onPress={clearRecord}>
        Record another video
      </Button>
    </Box>
  );
}
