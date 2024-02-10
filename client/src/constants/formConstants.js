export const FORM_CONSTANTS = {
  DESCRIPTION_WELCOME: {
    LOGIN: "Hey, bienvenido de nuevo",
    REGISTER: "¡Forma parte de nuesta comunidad!",
  },
  LABELS: {
    FIRST_NAME: "Nombre",
    LAST_NAME: "Apellido",
    EMAIL: "Correo electrónico",
    PASSWORD: "Contraseña",
    LOCATION: "Ubicación",
    OCUPATION: "Ocupación",
    PICTURE: "Foto de perfil",
    UPLOAD_IMGAE: "Añade una foto de perfil aquí."
  },
  NAME: {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    PASSWORD: "password",
    LOCATION: "location",
    OCUPATION: "occupation",
    PICTURE: "picture",
  },
  TYPE: {
    PASSWORD: "password",
    TEXT: "text",
  },
  ERROR: {
    FIRST_NAME: {
      REQUIRED: "El nombre es requerido.",
    },
    LAST_NAME: {
      REQUIRED: "El apellido es requerido.",
    },
    EMAIL: {
      REQUIRED: "El correo electrónico es requerido.",
      INVALID_EMAIL: "El correo electrónico es inválido.",
    },
    PASSWORD: {
      REQUIRED: "La contraseña es requerida.",
      MIN_LENGTH: "La contraseña debe tener al menos 6 caracteres.",
    },
    LOCATION: {
      REQUIRED: "La ubicación es requerida.",
    },
    OCUPATION: {
      REQUIRED: "La ocupación es requerida.",
    },
    PICTURE: {
      REQUIRED: "La foto de perfil es requerida.",
    },
  },
};

export const FORM_BUTTON_CONSTANTS = {
  LOGIN: {
    TEXT: "Ingresar",
    QUESTION: "¿No tienes cuenta?",
    TEXT_REDIRECT: "Registrarse",
    PATH_REDIRECT: "/register",
  },
  REGISTER: {
    TEXT: "Crear cuenta",
    QUESTION: "¿Ya tienes cuenta?",
    TEXT_REDIRECT: "Ingresar",
    PATH_REDIRECT: "/",
  },
};

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
