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

import { buttonSchema } from "./button";
import {
  cardSchema,
  cardHeaderSchema,
  cardTitleSchema,
  cardDescriptionSchema,
  cardContentSchema,
  cardFooterSchema,
} from "./card";

export const componentSchemas = {
  button: buttonSchema,
  card: cardSchema,
  "card-header": cardHeaderSchema,
  "card-title": cardTitleSchema,
  "card-description": cardDescriptionSchema,
  "card-content": cardContentSchema,
  "card-footer": cardFooterSchema,
} as const;
