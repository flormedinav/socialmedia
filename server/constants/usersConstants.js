export const STATUS_FRIEND_REQUEST = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const STATUS_PRIVACY = {
  PUBLIC: "0",
  PRIVATE: "1",
};

export const USER_ERROR_MESSAGES = {
  USER_NOT_FOUND: "Usuario no encontrado.",
  FRIEND_NOT_FOUND: "Amigo no encontrado.",
  NOT_FRIENDS: "Los usuarios no son amigos.",
  FRIEND_REQUEST_EXISTS:
    "Ya hay una solicitud de amistad pendiente con este usuario.",
  FRIEND_REQUEST_SELF: "No se puede enviar solicitud a uno mismo.",
  ALREADY_FRIEND: "Este usuario ya es tu amigo.",
  FRIEND_REQUEST_NOT_FOUND: "No se pudo encontrar la solicitud de amistad.",
  FRIEND_NOT_REQUEST_RECEIVED: "Sin solicitudes.",
};

export const USER_SUCCESS_MESSAGES = {
  USER_FOUND: "Usuario encontrado.",
  FRIENDS_FOUND: "Amigos encontrados.",
  FRIEND_REMOVED: "Amigo eliminado.",
  FRIEND_UPDATED: "Lista de amigos actualizada.",
  FRIEND_REQUEST_RECEIVED:
    "Solicitudes de amistad recibidas obtenidas correctamente.",
  FRIEND_REQUEST_SENT:
    "Solicitudes de amistad enviadas obtenidas correctamente.",
  FRIEND_REQUEST_SENT_SUCCESS: "Solicitud de amistad enviada.",
  FRIEND_REQUEST_ACCEPTED: "Solicitud de amistad aceptada.",
  FRIEND_REQUEST_REJECTED: "Solicitud de amistad rechazada.",
  FRIEND_REQUEST_CANCELLED: "Solicitud de amistad cancelada.",
  PRIVACY_STATUS_UPDATED_PRIVATE: "Estado de privacidad actualizado a privado.",
  PRIVACY_STATUS_UPDATED_PUBLIC: "Estado de privacidad actualizado a público.",
  USER_SEARCH_SUCCESSFUL: "Búsqueda de usuarios realizada correctamente.",
};
