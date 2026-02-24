export { uiNodeSchema } from "./ui-node";
export { buttonSchema } from "./button";
export {
  cardSchema,
  cardHeaderSchema,
  cardTitleSchema,
  cardDescriptionSchema,
  cardContentSchema,
  cardFooterSchema,
} from "./card";
export {
  formSchema,
  inputFieldSchema,
  passwordFieldSchema,
  textareaFieldSchema,
  selectFieldSchema,
  checkboxFieldSchema,
  radioFieldSchema,
  switchFieldSchema,
  dateFieldSchema,
  timeFieldSchema,
  comboboxFieldSchema,
  multiSelectFieldSchema,
  otpFieldSchema,
  fileUploadFieldSchema,
} from "./form";

import { buttonSchema } from "./button";
import {
  cardSchema,
  cardHeaderSchema,
  cardTitleSchema,
  cardDescriptionSchema,
  cardContentSchema,
  cardFooterSchema,
} from "./card";
import {
  formSchema,
  inputFieldSchema,
  passwordFieldSchema,
  textareaFieldSchema,
  selectFieldSchema,
  checkboxFieldSchema,
  radioFieldSchema,
  switchFieldSchema,
  dateFieldSchema,
  timeFieldSchema,
  comboboxFieldSchema,
  multiSelectFieldSchema,
  otpFieldSchema,
  fileUploadFieldSchema,
} from "./form";

export const componentSchemas = {
  button: buttonSchema,
  card: cardSchema,
  "card-header": cardHeaderSchema,
  "card-title": cardTitleSchema,
  "card-description": cardDescriptionSchema,
  "card-content": cardContentSchema,
  "card-footer": cardFooterSchema,
  form: formSchema,
  "input-field": inputFieldSchema,
  "password-field": passwordFieldSchema,
  "textarea-field": textareaFieldSchema,
  "select-field": selectFieldSchema,
  "checkbox-field": checkboxFieldSchema,
  "radio-field": radioFieldSchema,
  "switch-field": switchFieldSchema,
  "date-field": dateFieldSchema,
  "time-field": timeFieldSchema,
  "combobox-field": comboboxFieldSchema,
  "multi-select-field": multiSelectFieldSchema,
  "otp-field": otpFieldSchema,
  "file-upload-field": fileUploadFieldSchema,
} as const;
