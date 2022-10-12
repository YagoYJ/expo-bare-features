import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { FeatureItem } from "../components/FeaturesListItem";

export const featuresList: FeatureItem[] = [
  {
    label: "Form Example",
    navigateTo: "FormExample",
    icon: <AntDesign name="form" size={24} color="#fff" />,
  },
  {
    label: "Firebase Login",
    navigateTo: "FirebaseLogin",
    icon: <MaterialIcons name="login" size={24} color="#fff" />,
  },
];
