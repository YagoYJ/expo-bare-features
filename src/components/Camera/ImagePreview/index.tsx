import { Button, Image, Stack } from "native-base";

import { useCamera } from "../../../contexts/Camera";

export function ImagePreview() {
  const { image, clearImage } = useCamera();

  return (
    <Stack flex={1} alignItems="center" justifyContent="center">
      <Image
        source={{
          uri: image,
        }}
        alt="Picture"
        size="2xl"
        borderRadius={20}
      />

      <Button mt="10" onPress={clearImage}>
        Take another picture
      </Button>
    </Stack>
  );
}
