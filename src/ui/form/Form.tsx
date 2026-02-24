import type React from "react";
import { createContext } from "react";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
  useFormContext,
} from "react-hook-form";
import { cn } from "@/utils";
import { BaseForm } from "@/ui/form/Base";
import { FormField } from "@/ui/form/FormField";
import { Input } from "@/ui/Input";
import { PasswordInput } from "@/ui/PasswordInput";
import { SelectInput } from "@/ui/SelectInput";
import TextareaInput from "@/ui/TextAreaInput";
import { Checkbox } from "@/ui/Checkbox";
import { Combobox } from "@/ui/Combobox";
import { DatePickerInput } from "@/ui/DatePickerInput";
import { FileUploadField } from "@/ui/FileUpload";
import { MultiSelect } from "@/ui/MultiSelect";
import { OTPInput } from "@/ui/OTPInput";
import { Radio } from "@/ui/Radio";
import { Switch } from "@/ui/Switch";
import { TimePicker } from "@/ui/TimePicker";

const FormMethodsContext = createContext<UseFormReturn<FieldValues> | null>(
  null
);

type FormProps<T extends FieldValues> = {
  id: string;
  formMethods: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  className?: string;
  children: React.ReactNode;
};

function Form<T extends FieldValues>({
  id,
  formMethods,
  onSubmit,
  className,
  children,
}: FormProps<T>) {
  return (
    <FormMethodsContext.Provider
      value={formMethods as UseFormReturn<FieldValues>}
    >
      <BaseForm {...formMethods}>
        <form
          id={id}
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className={className}
          noValidate
        >
          {children}
        </form>
      </BaseForm>
    </FormMethodsContext.Provider>
  );
}

Form.InputField = function InputField<T extends FieldValues = FieldValues>({
  name,
  label,
  isShowError = false,
  required = false,
  ...props
}: {
  name: FieldPath<T>;
  isShowError?: boolean;
  label?: string;
  required?: boolean;
} & React.ComponentProps<typeof Input>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      className="w-full"
      control={control}
      isShowError={isShowError}
      onBlur={props.onBlur}
      field={{
        name,
        label,
        required,
        render: <Input {...props} inputClassName={props.inputClassName} />,
      }}
    />
  );
};

Form.PasswordField = function PasswordField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  ...props
}: { name: FieldPath<T> } & React.ComponentProps<typeof PasswordInput>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      className="w-full"
      control={control}
      field={{
        name,
        label,
        render: <PasswordInput {...props} />,
      }}
    />
  );
};

Form.SelectInputField = function SelectInputField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  required,
  ...props
}: { name: FieldPath<T>; label?: string } & React.ComponentProps<
  typeof SelectInput
>) {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      field={{
        name,
        required,
        label,
        render: <SelectInput {...props} />,
      }}
    />
  );
};

Form.MultiSelectField = function MultiSelectField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  ...props
}: { name: FieldPath<T>; label?: string } & Omit<
  React.ComponentProps<typeof MultiSelect>,
  "selected" | "onChange"
>) {
  const { control, watch, setValue } = useFormContext<T>();
  const selectedValues = watch(name) || [];

  return (
    <FormField
      control={control}
      field={{
        name,
        label,
        render: (
          <MultiSelect
            {...props}
            selected={selectedValues}
            onChange={(selected) =>
              setValue(name, selected as PathValue<T, Path<T>>)
            }
          />
        ),
      }}
    />
  );
};

Form.TextareaField = function TextareaField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  optional = false,
  ...props
}: { name: FieldPath<T>; optional?: boolean } & React.ComponentProps<
  typeof TextareaInput
>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      field={{
        name,
        label,
        optional,
        render: <TextareaInput {...props} />,
      }}
    />
  );
};

Form.FileUploadField = function FileUploadFieldComponent<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  isMultiple,
  maxFiles,
  children,
  CustomFileList,
  onChange: customOnChange,
  ...props
}: {
  name: FieldPath<T>;
  label?: string;
  isMultiple?: boolean;
  maxFiles?: number;
  children?: React.ReactNode;
  CustomFileList?: React.ComponentType;
  onChange?: (files: File[] | File | null) => void;
} & Omit<
  React.ComponentProps<typeof FileUploadField>,
  "hookedForm" | "field" | "onChange"
>) {
  const { control, formState } = useFormContext<T>() as UseFormReturn;
  const fieldError = formState.errors[name];
  const hasValidationError = !!fieldError;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: formField }) => (
        <div className="space-y-1">
          {label && (
            <label htmlFor={name} className="font-medium">
              {label}
            </label>
          )}
          <FileUploadField
            field={{ name, isMultiple, maxFiles, children }}
            CustomFileList={CustomFileList}
            hasValidationError={hasValidationError}
            value={formField.value || (isMultiple ? [] : undefined)}
            onChange={(files) => {
              // Update form field value
              formField.onChange(files);
              // Call custom onChange if provided
              if (customOnChange) {
                customOnChange(files);
              }
            }}
            onBlur={formField.onBlur}
            name={formField.name}
            {...props}
          />
        </div>
      )}
    />
  );
};

// Define DatePickerInputProps here since it's not exported
interface DatePickerInputProps extends React.ComponentProps<"button"> {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  placeholder?: string;
}

Form.DateInputField = function DateInputField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  disablePast,
  required,
  ...props
}: { name: FieldPath<T>; label?: string; required?: boolean } & Omit<
  DatePickerInputProps,
  "date" | "setDate"
> & {
    disablePast?: boolean;
    required?: boolean;
  }) {
  const { control, watch, setValue } = useFormContext<T>();
  const value = watch(name);
  return (
    <FormField
      control={control}
      field={{
        name,
        label,
        required,
        render: (
          <DatePickerInput
            {...props}
            date={value}
            setDate={(date) => setValue(name, date as PathValue<T, Path<T>>)}
            disablePast={disablePast}
          />
        ),
      }}
    />
  );
};

Form.TimeInputField = function TimeInputField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  ...props
}: { name: FieldPath<T>; label?: string } & React.ComponentProps<
  typeof TimePicker
>) {
  const { control, setValue } = useFormContext<T>();
  return (
    <FormField
      control={control}
      field={{
        name,
        label,
        render: (
          <TimePicker
            onValueChange={(value) => {
              setValue(name, value as any);
            }}
            {...props}
          />
        ),
      }}
    />
  );
};

Form.CheckboxField = function CheckboxField<
  T extends FieldValues = FieldValues,
>({
  name,
  label,
  ...props
}: { name: FieldPath<T> } & Omit<
  React.ComponentProps<typeof Checkbox>,
  "value"
>) {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      field={{
        name,
        render: <Checkbox value={name} label={label} {...props} />,
      }}
    />
  );
};

Form.OTPInputField = function OTPInputField<
  T extends FieldValues = FieldValues,
>({
  name,
  ...props
}: { name: FieldPath<T> } & React.ComponentProps<typeof OTPInput>) {
  const { control } = useFormContext<T>();
  return (
    <FormField
      className="w-full"
      control={control}
      field={{ name, render: <OTPInput {...props} /> }}
    />
  );
};

Form.RadioField = function RadioField<T extends FieldValues = FieldValues>({
  name,
  label,
  ...props
}: { name: FieldPath<T>; label?: string } & React.ComponentProps<
  typeof Radio
>) {
  const { control } = useFormContext<T>();
  const { setValue } = useFormContext<T>();
  return (
    <FormField
      control={control}
      field={{
        name,
        label,
        render: (
          <Radio
            {...props}
            onValueChange={(value) => setValue(name, value as any)}
          />
        ),
      }}
    />
  );
};

Form.ComboboxField = function ComboboxField<
  T extends FieldValues = FieldValues,
>({
  name,
  ...props
}: { name: FieldPath<T> } & Omit<
  React.ComponentProps<typeof Combobox>,
  "onChange"
>) {
  const { control, setValue, watch } = useFormContext<T>();
  const value = watch(name);
  return (
    <FormField
      control={control}
      field={{
        name,
        render: (
          <Combobox
            {...props}
            value={value || ""}
            onChange={(val) => setValue(name, val as PathValue<T, Path<T>>)}
          />
        ),
      }}
    />
  );
};


Form.SwitchField = function SwitchField<T extends FieldValues = FieldValues>({
  name,
  label,
  prefix,
  suffix,
  className,
  ...props
}: {
  name: FieldPath<T>;
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  className?: string;
} & Omit<React.ComponentProps<typeof Switch>, "checked" | "onCheckedChange">) {
  const { control, setValue, watch } = useFormContext<T>();
  const value = watch(name);
  return (
    <FormField
      control={control}
      className={cn("w-full", className)}
      field={{
        name,
        label,
        render: (
          <div className="flex items-center">
            {prefix && <span className="mr-2">{prefix}</span>}
            <Switch
              {...props}
              checked={!!value}
              onCheckedChange={(checked) =>
                setValue(name, checked as PathValue<T, Path<T>>)
              }
            />
            {suffix && <span className="ml-2">{suffix}</span>}
          </div>
        ),
      }}
    />
  );
};

export { Form };
