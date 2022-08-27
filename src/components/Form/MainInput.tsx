import { forwardRef, ForwardRefRenderFunction } from "react";
import { FormControl, Input } from "native-base";

import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

interface InputProps extends IInputProps {
  value: string;
  required?: boolean;
  label?: string;
  error?: string;
  handleChangeText: (text: string) => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { value, required, label, error = null, handleChangeText, ...rest },
  ref
) => {
  return (
    <FormControl w="100%" isRequired={required} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        value={value}
        variant="underlined"
        onChangeText={handleChangeText}
        ref={ref}
        {...rest}
      />
      {error ? (
        <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
      ) : (
        <></>
      )}
    </FormControl>
  );
};

export const MainInput = forwardRef(InputBase);
