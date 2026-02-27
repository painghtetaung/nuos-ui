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
export { textSchema, titleSchema, labelSchema } from "./text";
export {
  badgeSchema,
  tagSchema,
  chipSchema,
  alertSchema,
  skeletonSchema,
  progressIndicatorSchema,
} from "./display";
export { avatarSchema, avatarListItemSchema, mediaSchema } from "./media";
export {
  gridSchema,
  accordionSchema,
  accordionItemSchema,
  accordionTriggerSchema,
  accordionContentSchema,
  tabsSchema,
  wrapperCardSchema,
  gradientContainerSchema,
  carouselSchema,
  carouselContentSchema,
  carouselItemSchema,
} from "./layout";
export {
  toggleSchema,
  sliderSchema,
  searchInputSchema,
  iconButtonSchema,
  linkButtonSchema,
  buttonLinkSchema,
  selectHoverSchema,
} from "./interactive";
export { breadcrumbSchema, tooltipSchema } from "./navigation";
export { tableSchema } from "./data";
export {
  sheetSchema,
  sheetTriggerSchema,
  sheetContentSchema,
  sheetHeaderSchema,
  sheetFooterSchema,
  sheetTitleSchema,
  sheetDescriptionSchema,
  dropdownMenuSchema,
  dropdownMenuTriggerSchema,
  dropdownMenuContentSchema,
  dropdownMenuItemSchema,
  dropdownMenuSeparatorSchema,
  dropdownMenuLabelSchema,
  popoverSchema,
  popoverTriggerSchema,
  popoverContentSchema,
  contextMenuSchema,
  contextMenuTriggerSchema,
  contextMenuContentSchema,
  contextMenuItemSchema,
  contextMenuSeparatorSchema,
} from "./overlay";

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
import { textSchema, titleSchema, labelSchema } from "./text";
import {
  badgeSchema,
  tagSchema,
  chipSchema,
  alertSchema,
  skeletonSchema,
  progressIndicatorSchema,
} from "./display";
import { avatarSchema, avatarListItemSchema, mediaSchema } from "./media";
import {
  gridSchema,
  accordionSchema,
  accordionItemSchema,
  accordionTriggerSchema,
  accordionContentSchema,
  tabsSchema,
  wrapperCardSchema,
  gradientContainerSchema,
  carouselSchema,
  carouselContentSchema,
  carouselItemSchema,
} from "./layout";
import {
  toggleSchema,
  sliderSchema,
  searchInputSchema,
  iconButtonSchema,
  linkButtonSchema,
  buttonLinkSchema,
  selectHoverSchema,
} from "./interactive";
import { breadcrumbSchema, tooltipSchema } from "./navigation";
import { tableSchema } from "./data";
import {
  sheetSchema,
  sheetTriggerSchema,
  sheetContentSchema,
  sheetHeaderSchema,
  sheetFooterSchema,
  sheetTitleSchema,
  sheetDescriptionSchema,
  dropdownMenuSchema,
  dropdownMenuTriggerSchema,
  dropdownMenuContentSchema,
  dropdownMenuItemSchema,
  dropdownMenuSeparatorSchema,
  dropdownMenuLabelSchema,
  popoverSchema,
  popoverTriggerSchema,
  popoverContentSchema,
  contextMenuSchema,
  contextMenuTriggerSchema,
  contextMenuContentSchema,
  contextMenuItemSchema,
  contextMenuSeparatorSchema,
} from "./overlay";

export const componentSchemas = {
  // Button
  button: buttonSchema,

  // Card
  card: cardSchema,
  "card-header": cardHeaderSchema,
  "card-title": cardTitleSchema,
  "card-description": cardDescriptionSchema,
  "card-content": cardContentSchema,
  "card-footer": cardFooterSchema,

  // Form
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

  // Text
  text: textSchema,
  title: titleSchema,
  label: labelSchema,

  // Display
  badge: badgeSchema,
  tag: tagSchema,
  chip: chipSchema,
  alert: alertSchema,
  skeleton: skeletonSchema,
  "progress-indicator": progressIndicatorSchema,

  // Media
  avatar: avatarSchema,
  "avatar-list-item": avatarListItemSchema,
  media: mediaSchema,

  // Layout
  grid: gridSchema,
  accordion: accordionSchema,
  "accordion-item": accordionItemSchema,
  "accordion-trigger": accordionTriggerSchema,
  "accordion-content": accordionContentSchema,
  tabs: tabsSchema,
  "wrapper-card": wrapperCardSchema,
  "gradient-container": gradientContainerSchema,
  carousel: carouselSchema,
  "carousel-content": carouselContentSchema,
  "carousel-item": carouselItemSchema,

  // Interactive
  toggle: toggleSchema,
  slider: sliderSchema,
  "search-input": searchInputSchema,
  "icon-button": iconButtonSchema,
  "link-button": linkButtonSchema,
  "button-link": buttonLinkSchema,
  "select-hover": selectHoverSchema,

  // Navigation
  breadcrumb: breadcrumbSchema,
  tooltip: tooltipSchema,

  // Data
  table: tableSchema,

  // Overlay
  sheet: sheetSchema,
  "sheet-trigger": sheetTriggerSchema,
  "sheet-content": sheetContentSchema,
  "sheet-header": sheetHeaderSchema,
  "sheet-footer": sheetFooterSchema,
  "sheet-title": sheetTitleSchema,
  "sheet-description": sheetDescriptionSchema,
  "dropdown-menu": dropdownMenuSchema,
  "dropdown-menu-trigger": dropdownMenuTriggerSchema,
  "dropdown-menu-content": dropdownMenuContentSchema,
  "dropdown-menu-item": dropdownMenuItemSchema,
  "dropdown-menu-separator": dropdownMenuSeparatorSchema,
  "dropdown-menu-label": dropdownMenuLabelSchema,
  popover: popoverSchema,
  "popover-trigger": popoverTriggerSchema,
  "popover-content": popoverContentSchema,
  "context-menu": contextMenuSchema,
  "context-menu-trigger": contextMenuTriggerSchema,
  "context-menu-content": contextMenuContentSchema,
  "context-menu-item": contextMenuItemSchema,
  "context-menu-separator": contextMenuSeparatorSchema,
} as const;
