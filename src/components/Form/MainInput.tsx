import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FormControl, Input } from "native-base";

import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

interface InputProps extends IInputProps {
  value: string;
  required?: boolean;
  label?: ReactNode;
  error?: string;
  helperText?: string;
  handleChangeText: (text: string) => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    value,
    required,
    label,
    error = null,
    helperText = null,
    handleChangeText,
    ...rest
  },
  ref
) => {
  return (
    <FormControl w="100%" isRequired={required} isInvalid={!!error}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        value={value}
        onChangeText={handleChangeText}
        ref={ref}
        size="lg"
        p="3"
        {...rest}
      />

      {helperText && (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      )}
      {error && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export const MainInput = forwardRef(InputBase);
