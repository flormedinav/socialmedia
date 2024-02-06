export const TYPE_THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const GLOBAL_CONSTANST = {
  NAME_SOCIAL_MEDIA: "SocialMedia",
};

export const MEDIA_QUERY_MIN_WIDTH = {
  1000: "(min-width: 1000px)",
  600: "(min-width: 600px)",
};

export const NAVBAR_CONSTANTS = {
  PLACEHOLDER_SEARCH: "Buscar usuario",
  LOG_OUT: "Cerrar sesión",
};

export const TYPE_PAGE_IN_LOGIN = {
  LOGING: "login",
  REGISTER: "register",
};

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
  },
  NAME: {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    EMAIL: "email",
    PASSWORD: "password",
    LOCATION: "location",
    OCUPATION: "ocupation",
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
