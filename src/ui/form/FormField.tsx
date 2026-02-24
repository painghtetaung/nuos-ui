import * as React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import {
  BaseFormControl,
  BaseFormField,
  BaseFormItem,
  BaseFormLabel,
  BaseFormMessage,
} from "@/ui/form/Base";
import { cn } from "@/utils";
import type { Input } from "@/ui/Input";

export type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  isShowError?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  field: {
    name: Path<T>;
    label?: string;
    required?: boolean;
    optional?: boolean;
    render: React.ReactNode;
  };
  className?: string;
};

export const FormField = <T extends FieldValues>({
  control,
  field,
  isShowError,
  onBlur,
  className,
}: FormFieldProps<T>) => {
  return (
    <BaseFormField
      key={field.name}
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <BaseFormItem className={cn("w-full", className)}>
          {field.label && (
            <BaseFormLabel className="gap-1">
              {field.label}
              {field.required && (
                <span className="text-element-inverse-red">*</span>
              )}
              {field.optional && (
                <span className="text-title-sm!">(Optional)</span>
              )}
            </BaseFormLabel>
          )}
          <BaseFormControl>
            {React.isValidElement(field.render)
              ? React.cloneElement(
                  field.render as React.ReactElement<
                    React.ComponentProps<typeof Input>
                  >,
                  {
                    ...formField,
                    onBlur: (e) => {
                      formField.onBlur();
                      onBlur?.(e);
                    },
                  }
                )
              : field.render}
          </BaseFormControl>
          {isShowError && <BaseFormMessage />}
        </BaseFormItem>
      )}
    />
  );
};
