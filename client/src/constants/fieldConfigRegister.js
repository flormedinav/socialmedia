import { FORM_CONSTANTS } from "./global";

export const FIELD_CONFIG_REGISTER = [
  [
    {
      name: FORM_CONSTANTS.NAME.FIRST_NAME,
      label: FORM_CONSTANTS.LABELS.FIRST_NAME,
      type: FORM_CONSTANTS.TYPE.TEXT,
    },
    {
      name: FORM_CONSTANTS.NAME.LAST_NAME,
      label: FORM_CONSTANTS.LABELS.LAST_NAME,
      type: FORM_CONSTANTS.TYPE.TEXT,
    },
  ],
  [
    {
      name: FORM_CONSTANTS.NAME.LOCATION,
      label: FORM_CONSTANTS.LABELS.LOCATION,
      type: FORM_CONSTANTS.TYPE.TEXT,
    },
    {
      name: FORM_CONSTANTS.NAME.OCUPATION,
      label: FORM_CONSTANTS.LABELS.OCUPATION,
      type: FORM_CONSTANTS.TYPE.TEXT,
    },
  ],
  [
    {
      name: FORM_CONSTANTS.NAME.EMAIL,
      label: FORM_CONSTANTS.LABELS.EMAIL,
      type: FORM_CONSTANTS.TYPE.TEXT,
    },
    {
      name: FORM_CONSTANTS.NAME.PASSWORD,
      label: FORM_CONSTANTS.LABELS.PASSWORD,
      type: FORM_CONSTANTS.TYPE.PASSWORD,
    },
  ],
];
