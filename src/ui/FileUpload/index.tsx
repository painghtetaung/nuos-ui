import { FilePlus, XIcon } from "lucide-react";
import { File } from "magick-icons";
import React, { createContext, useCallback, useContext, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { truncateFileNameMid } from "@/utils";
import { Separator } from "@/registry/ui/separator";
import { Button } from "@/ui/Button";

// Constants
const FILE_SIZE_LIMIT_MB = 3; // 3MB
const DEFAULT_MAX_FILES = 10;

const ACCEPTED_FILE_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/msword": [".doc"],
  "image/*": [".png", ".jpg", ".jpeg", ".gif"],
};

// Context type
interface FileUploadContextType {
  errorMessage: string;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  isFocused: boolean;
  getRootProps: any;
  getInputProps: any;
  handleRemoveFile: (fileName: string) => void;
  openFileDialog: () => void;
  showFileList?: boolean;
  acceptedFiles: File[];
}

// Create context
const FileUploadContext = createContext<FileUploadContextType | undefined>(
  undefined
);

// Context hook
export const useFileUpload = () => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error("FileUpload components must be used within FileUpload");
  }
  return context;
};

// Error message mapping
const getErrorMessage = (code: string, fileSizeLimit: number): string => {
  const errorMessages: Record<string, string> = {
    "file-invalid-type":
      "Invalid file type. Only PDF, DOC, DOCX, and images are accepted.",
    "file-too-large": `File size exceeds ${fileSizeLimit}MB limit.`,
    "too-many-files": "Too many files selected.",
  };
  return errorMessages[code] || "An error occurred with the file upload.";
};

interface FileUploadProps {
  onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
  onDelete?: () => void;
  maxFiles?: number;
  isMultiple?: boolean;
  children: React.ReactNode;
  label?: string;
  CustomFileList?: React.ComponentType;
  fileSizeLimit?: number;
  acceptedFileTypes?: Record<string, string[]>;
  // Add react-hook-form props
  name?: string;
  value?: File[] | File;
  onChange?: (files: File[] | File | null) => void;
  onBlur?: () => void;
  disabled?: boolean;
  hasValidationError?: boolean;
  showFileList?: boolean;
}

// Main component
const FileUpload = ({
  onDrop,
  onDelete,
  maxFiles,
  isMultiple = false,
  children,
  label,
  CustomFileList,
  fileSizeLimit = FILE_SIZE_LIMIT_MB,
  acceptedFileTypes = ACCEPTED_FILE_TYPES,
  name,
  value,
  onChange,
  onBlur,
  disabled,
  hasValidationError,
  showFileList = false,
}: FileUploadProps) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Convert MB to bytes for useDropzone
  const fileSizeLimitInBytes =
    (fileSizeLimit ?? FILE_SIZE_LIMIT_MB) * 1024 * 1024;

  // Derive acceptedFiles from value prop (controlled mode)
  const acceptedFiles = React.useMemo(() => {
    if (value === undefined) {
      return [];
    }
    if (isMultiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value as File] : [];
  }, [value, isMultiple]);

  const handleRejectedFiles = useCallback(
    (rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length === 0) {
        setErrorMessage("");
        return;
      }

      const error = rejectedFiles[0].errors[0];
      setErrorMessage(getErrorMessage(error.code, fileSizeLimit));
    },
    [fileSizeLimit]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFocused,
    open,
  } = useDropzone({
    onDrop: (accepted: File[], rejected: FileRejection[]) => {
      handleRejectedFiles(rejected);
      // Just pass the accepted files directly to parent - no internal state
      onDrop(accepted, rejected);

      // Call react-hook-form onChange if provided
      if (onChange) {
        if (isMultiple) {
          // For multiple, merge with existing value if provided
          const existingFiles = Array.isArray(value) ? value : [];
          const mergedFiles = [...existingFiles, ...accepted].filter(
            (file, index, self) =>
              index === self.findIndex((f) => f.name === file.name)
          );
          onChange(mergedFiles.length > 0 ? mergedFiles : null);
        } else {
          onChange(accepted.length > 0 ? accepted[0] : null);
        }
      }
    },
    accept: acceptedFileTypes,
    maxFiles: isMultiple ? maxFiles || DEFAULT_MAX_FILES : 1,
    maxSize: fileSizeLimitInBytes || FILE_SIZE_LIMIT_MB,
    noClick: false,
    disabled,
  });

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      // Remove file from value prop (controlled mode)
      if (onChange) {
        if (isMultiple) {
          const existingFiles = Array.isArray(value) ? value : [];
          const updatedFiles = existingFiles.filter(
            (file) => file.name !== fileName
          );
          onChange(updatedFiles.length > 0 ? updatedFiles : null);
        } else {
          onChange(null);
        }
      }

      // Call onDrop with updated files for parent component
      const existingFiles = Array.isArray(value) ? value : [];
      const updatedFiles = existingFiles.filter(
        (file) => file.name !== fileName
      );
      onDrop(updatedFiles, []);
      onDelete?.();
    },
    [value, onDrop, onDelete, onChange, isMultiple]
  );

  return (
    <FileUploadContext.Provider
      value={{
        errorMessage:
          errorMessage || (hasValidationError ? "This field is required" : ""),
        isDragActive,
        isDragAccept,
        isDragReject,
        isFocused,
        getRootProps,
        getInputProps: () => ({
          ...getInputProps(),
          name,
          onBlur,
          "aria-invalid": hasValidationError || !!errorMessage,
        }),
        handleRemoveFile,
        openFileDialog: open,
        acceptedFiles,
      }}
    >
      <div className="relative w-full space-y-1">
        <div className="flex flex-col gap-1">
          <label htmlFor={name}>{label}</label>
          {children || <FileUpload.DropZone fileSizeLimit={fileSizeLimit} />}
          {CustomFileList ? (
            <CustomFileList />
          ) : showFileList ? (
            <FileUpload.FileList />
          ) : null}
        </div>
        <FileUpload.ErrorMessage />
      </div>
    </FileUploadContext.Provider>
  );
};

// Add new interface for render props
interface SimpleUploadRenderProps {
  acceptedFiles: File[];
  isFocused: boolean;
  openFileDialog: () => void;
}

interface SimpleUploadProps {
  children?: React.ReactNode;
  className?: string;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  render?: (props: SimpleUploadRenderProps) => React.ReactNode;
  variant?: "default" | "custom";
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

const SimpleUpload = ({
  children,
  className,
  buttonProps,
  render,
  wrapperProps,
}: SimpleUploadProps) => {
  const {
    openFileDialog,
    getInputProps,
    getRootProps,
    acceptedFiles,
    isFocused,
    errorMessage,
  } = useFileUpload();

  // Check if there's any error (validation or file upload error)
  const hasError = !!errorMessage;

  // If children are provided, render custom UI
  if (children) {
    return (
      <div className={className} onClick={openFileDialog} {...wrapperProps}>
        <input {...getInputProps()} />
        {children}
      </div>
    );
  }

  // If render prop is provided, render custom component
  if (render) {
    return (
      <div
        className={className}
        {...getRootProps()}
        onClick={(e) => {
          e.stopPropagation();
          openFileDialog();
        }}
        {...wrapperProps}
      >
        <input {...getInputProps()} />
        {typeof render === "function"
          ? render({
              acceptedFiles,
              isFocused,
              openFileDialog,
            })
          : render}
      </div>
    );
  }

  // Default button UI
  return (
    <div className={`flex items-center gap-2 ${className}`} {...wrapperProps}>
      <input {...getInputProps()} />

      <Button
        type="button"
        onClick={openFileDialog}
        {...buttonProps}
        className={`${hasError ? "border-input-border-destructiveDefault hover:border-input-border-destructiveHover" : "border-input-border-primaryDefault hover:border-input-border-primaryHover"} text-body-sm! flex w-full items-center justify-start gap-2 rounded-lg border px-3 py-2 shadow-none`}
      >
        <p className="text-element-inverse-default! w-[77px] font-semibold">
          Choose file
        </p>
        <p className="text-element-inverse-disabled">No file chosen</p>
      </Button>
    </div>
  );
};

interface DropZoneRenderProps {
  isDragging: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  acceptedFiles: File[];
  isFocused: boolean;
  openFileDialog: () => void;
}

interface DropZoneProps {
  children?: React.ReactNode;
  className?: string;
  render?: (props: DropZoneRenderProps) => React.ReactNode;
  variant?: "default" | "custom";
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  fileSizeLimit?: number;
}

// Modify DropZone component
const DropZone = ({
  children,
  className,
  render,
  variant = "default",
  wrapperProps,
  // fileSizeLimit = FILE_SIZE_LIMIT_MB,
}: DropZoneProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    isFocused,
    openFileDialog,
    errorMessage,
  } = useFileUpload();

  // Check if there's any error (validation or file upload error)
  const hasError = !!errorMessage;

  // If children are provided, render custom UI
  if (children) {
    return (
      <div
        {...getRootProps()}
        className={`cursor-pointer ${className}`}
        {...wrapperProps}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    );
  }

  // If render prop is provided, use custom render function
  if (render) {
    return (
      <div
        {...getRootProps()}
        className={`cursor-pointer ${className}`}
        {...wrapperProps}
      >
        <input {...getInputProps()} />
        {render({
          isDragging: isDragActive,
          isDragAccept,
          isDragReject,
          acceptedFiles,
          isFocused,
          openFileDialog,
        })}
      </div>
    );
  }

  // Custom variant
  if (variant === "custom") {
    return (
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 transition-colors ${
          hasError
            ? "border-input-border-destructiveHover"
            : isDragActive
              ? "border-primary bg-primary/5"
              : "hover:border-primary/50 border-gray-300"
        } ${className}`}
        {...wrapperProps}
      >
        <input {...getInputProps()} />
        <div className="space-y-4 text-center">
          <div className="bg-primary/10 mx-auto w-fit rounded-full p-4">
            <FilePlus className="text-primary size-8" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-medium">
              {isDragActive ? "Drop files here" : "Drag & Drop files"}
            </p>
            <p className="text-muted-foreground text-sm">
              or click to select files
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      {...getRootProps()}
      className={`border-stroke-inverse-slate-04 rounded-unit-corner-radius-5xl cursor-pointer border border-dashed p-10 transition-colors focus:outline-none ${
        hasError
          ? "border-input-border-destructiveHover"
          : isDragActive
            ? "border-blue-500 bg-gray-600"
            : "bg-fill-inverse-slate-03 hover:bg-fill-inverse-slate-04"
      } ${className}`}
      {...wrapperProps}
    >
      <input {...getInputProps()} />
      <div className="text-muted-foreground w-full space-y-5 text-center">
        <File className="mx-auto size-[44px]" />
        <p
          className={`text-body-sm leading-body-sm ${isDragActive ? "text-gray-100" : "text-element-inverse-default"}`}
        >
          {isDragActive ? "Drop the file here..." : "Drag and Drop files here"}
        </p>
        <div className="gap-unit-10px flex w-full items-center justify-center">
          <Separator className="border-stroke-inverse-slate-03 max-w-[60px] flex-1" />
          <p className="text-caption leading-caption text-element-inverse-disabled font-medium">
            OR
          </p>
          <Separator className="border-stroke-inverse-slate-03 max-w-[60px] flex-1" />
        </div>
        <Button
          type="button"
          variant="secondary"
          className="mx-auto"
          onClick={(e) => {
            // Prevent the click from also triggering the dropzone root onClick,
            // which causes the file picker to open twice.
            e.stopPropagation();
            openFileDialog();
          }}
        >
          Browse file
        </Button>
      </div>
    </div>
  );
};

const FileList = () => {
  const { acceptedFiles, handleRemoveFile } = useFileUpload();

  if (acceptedFiles.length === 0) return null;

  return (
    <ul className="mb-1 space-y-1">
      {acceptedFiles.map((file) => (
        <li
          key={file.name}
          className="border-input-border-primaryDefault hover:border-input-border-primaryHover flex h-9 items-center justify-between rounded-lg border px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <p className="text-text-default w-[77px] font-semibold">Selected</p>
            <p>{truncateFileNameMid(file.name)}</p>
            <p className="text-caption text-text-inactive">
              {file.size < 1024 * 1024
                ? `${(file.size / 1024).toFixed(2)}KB`
                : `${(file.size / 1024 / 1024).toFixed(2)}MB`}
            </p>
          </div>
          <button
            onClick={() => handleRemoveFile(file.name)}
            className="hover:bg-button-bg-outlineHover cursor-pointer rounded"
          >
            <XIcon className="text-icon-default size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

const ErrorMessage = () => {
  const { errorMessage } = useFileUpload();

  if (!errorMessage) return null;

  return <p className="text-text-destructive mt-2 text-sm">{errorMessage}</p>;
};

FileUpload.DropZone = DropZone;
FileUpload.SimpleUpload = SimpleUpload;
FileUpload.FileList = FileList;
FileUpload.ErrorMessage = ErrorMessage;

export { FileUpload };

export type FieldProps = {
  name: string;
  label?: string;
  isMultiple?: boolean;
  maxFiles?: number;
  children?: React.ReactNode;
};

export const FileUploadField = ({
  field,
  CustomFileList,
  onChange,
  value,
  fileSizeLimit = FILE_SIZE_LIMIT_MB, // in MB
  acceptedFileTypes = ACCEPTED_FILE_TYPES,
  ...props
}: {
  field: {
    name: string;
    isMultiple?: boolean;
    maxFiles?: number;
    children?: React.ReactNode;
  };
  CustomFileList?: React.ComponentType;
  onChange?: (files: File[] | File | null) => void;
  value?: File[] | File;
  fileSizeLimit?: number; // in MB
  acceptedFileTypes?: Record<string, string[]>;
  // Add react-hook-form field props
  name?: string;
  onBlur?: () => void;
  disabled?: boolean;
  hasValidationError?: boolean;
} & Omit<React.ComponentProps<typeof FileUpload>, "onDrop" | "children">) => {
  return (
    <FileUpload
      onDrop={(acceptedFiles) => {
        if (onChange) {
          onChange(field.isMultiple ? acceptedFiles : acceptedFiles[0]);
        }
      }}
      isMultiple={field.isMultiple}
      maxFiles={field.maxFiles}
      CustomFileList={CustomFileList}
      fileSizeLimit={fileSizeLimit}
      acceptedFileTypes={acceptedFileTypes}
      value={value}
      onChange={onChange}
      hasValidationError={props.hasValidationError}
      {...props}
    >
      {field.children || (
          <FileUpload.DropZone fileSizeLimit={fileSizeLimit} />
        ) || <FileUpload.SimpleUpload />}
    </FileUpload>
  );
};

FileUploadField.SimpleUpload = SimpleUpload;
FileUploadField.DropZone = DropZone;
FileUploadField.FileList = FileList;
FileUploadField.ErrorMessage = ErrorMessage;
