import { useState } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Feather } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Input,
  Radio,
  Select,
  Switch,
  TextArea,
  VStack,
} from "native-base";

type FormData = {
  inputWithValidation: string;
  radioGroup: string;
  select: string;
  switch: boolean;
  textarea: string;
};

const initialFormDataValues: FormData = {
  inputWithValidation: "",
  radioGroup: "",
  select: "",
  switch: false,
  textarea: "",
};

const selectItems = [
  {
    label: "UX Research",
    value: "ux",
  },
  {
    label: "Web Development",
    value: "web",
  },
  {
    label: "Cross Platform Development",
    value: "cross",
  },
  {
    label: "UI Designing",
    value: "ui",
  },
  {
    label: "Backend Development",
    value: "backend",
  },
];

export function FormExample() {
  const [formData, setFormData] = useState<FormData>(initialFormDataValues);
  const [errors, setErrors] = useState({});

  function validate() {
    if (formData.inputWithValidation === undefined) {
      setErrors({
        ...errors,
        inputWithValidation: "inputWithValidation is required",
      });
      return false;
    } else if (formData.inputWithValidation.length < 3) {
      setErrors({
        ...errors,
        inputWithValidation: "InputWithValidation is too short",
      });
      return false;
    }

    return true;
  }

  function handleSubmit() {
    validate()
      ? Alert.alert("Form data", JSON.stringify(formData, null, 2))
      : console.log("Validation Failed");
  }

  return (
    <KeyboardAwareScrollView>
      <VStack width="100%" p={8}>
        <FormControl isRequired isInvalid={"name" in errors}>
          <VStack space={5}>
            <Box>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Input with validation
              </FormControl.Label>
              <Input
                placeholder="John"
                onChangeText={(value) =>
                  setFormData({ ...formData, inputWithValidation: value })
                }
              />
              {"name" in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </Box>
            <Box>
              <FormControl.Label
                isRequired={false}
                _text={{
                  bold: true,
                }}
              >
                Radio Group
              </FormControl.Label>

              <Radio.Group
                name="radioGroup"
                accessibilityLabel="Favorite number"
                value={formData.radioGroup}
                onChange={(nextValue) => {
                  setFormData({
                    ...formData,
                    radioGroup: nextValue,
                  });
                }}
              >
                <Radio value="one" my={1}>
                  One
                </Radio>
                <Radio value="two" my={1}>
                  Two
                </Radio>
              </Radio.Group>
            </Box>
            <Box>
              <FormControl.Label
                isRequired={false}
                _text={{
                  bold: true,
                }}
              >
                Radio Group
              </FormControl.Label>

              <Select
                selectedValue={formData.select}
                placeholder="Select Example"
                _selectedItem={{
                  _text: { color: "#fff" },
                  bg: "indigo.600",
                  endIcon: <Feather name="check" size={24} color="white" />,
                }}
                mt={1}
                onValueChange={(itemValue) =>
                  setFormData({
                    ...formData,
                    select: itemValue,
                  })
                }
              >
                {selectItems.map((item) => (
                  <Select.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Select>
            </Box>

            <Box>
              <FormControl.Label
                isRequired={false}
                _text={{
                  bold: true,
                }}
              >
                Textarea
              </FormControl.Label>
              <TextArea
                autoCompleteType=""
                value={formData.textarea}
                onChangeText={(value) =>
                  setFormData({
                    ...formData,
                    textarea: value,
                  })
                }
                h={20}
                placeholder="Text Area Placeholder"
              />
            </Box>

            <Box>
              <FormControl.Label
                isRequired={false}
                _text={{
                  bold: true,
                }}
              >
                Switch
              </FormControl.Label>
              <Switch
                value={formData.switch}
                onToggle={() =>
                  setFormData({ ...formData, switch: !formData.switch })
                }
                offTrackColor="indigo.100"
                onTrackColor="indigo.200"
                onThumbColor="indigo.500"
                offThumbColor="indigo.50"
                mr="auto"
              />
            </Box>
          </VStack>
        </FormControl>
        <Button onPress={handleSubmit} mt="5" colorScheme="indigo">
          Submit
        </Button>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
