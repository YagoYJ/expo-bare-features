import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useState,
} from "react";
import { Camera, CameraType } from "expo-camera";

import { CameraContextData } from "./types";

const CameraContext = createContext<CameraContextData>({} as CameraContextData);

const CameraProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState<number | CameraType>(CameraType.back);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [record, setRecord] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function takePicture() {
    if (camera) {
      // Se quiser uma uri local, basta passar null dentro de takePictureAsync
      const base64 = await camera.takePictureAsync({
        base64: true,
      });

      setImage(base64.uri);
    }
  }

  async function startRecord() {
    setIsRecording(true);

    const video = await camera.recordAsync(null);

    setRecord(video.uri);
  }

  function stopRecord() {
    camera.stopRecording();
    setIsRecording(false);
  }

  function updateCamera(ref: Camera) {
    setCamera(ref);
  }

  function clearImage() {
    setImage(null);
  }

  function clearRecord() {
    setRecord(null);
  }

  return (
    <CameraContext.Provider
      value={{
        type,
        isRecording,
        image,
        record,
        permission,
        requestPermission,
        toggleCameraType,
        startRecord,
        stopRecord,
        takePicture,
        updateCamera,
        clearImage,
        clearRecord,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};

const useCamera = (): CameraContextData => {
  const context = useContext(CameraContext);

  if (!context || Object.keys(context).length < 1) {
    throw new Error("useCamera must be used within a Camera Provider");
  }

  return context;
};

export { CameraProvider, useCamera };
