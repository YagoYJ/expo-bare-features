import { Camera, CameraType, PermissionResponse } from "expo-camera";

export type CameraContextData = {
  type: number | CameraType;
  image: string;
  record: string;
  isRecording: boolean;
  permission: PermissionResponse;
  requestPermission: () => Promise<PermissionResponse>;
  toggleCameraType: () => void;
  takePicture: () => Promise<void>;
  startRecord: () => Promise<void>;
  stopRecord: () => void;
  updateCamera: (ref: Camera) => void;
  clearImage: () => void;
  clearRecord: () => void;
};
