import { Router } from "express";

import UsersController from "../controllers/userController.js";
import authorizationMiddleware from "../middlewares/authorizationMiddleware.js";

const router = Router();
const controllers = new UsersController();

//Obtener información del usuario
router.get("/:userId", authorizationMiddleware, controllers.getUser);

//Buscar usuarios
router.get("/:userId/search", authorizationMiddleware, controllers.searchUsers);

//Obtener amigos de un usuario
router.get(
  "/:userId/friends",
  authorizationMiddleware,
  controllers.getUserFriends
);

// Añadir/quitar amigo
router.put(
  "/:userId/friends/:friendId",
  authorizationMiddleware,
  controllers.addRemoveFriend
);

// Eliminar amigo
router.delete(
  "/:userId/friends/:friendId",
  authorizationMiddleware,
  controllers.removeFriend
);

// Obtener solicitudes de amistad recibidas
router.get(
  "/:userId/friend-requests/received",
  authorizationMiddleware,
  controllers.getFriendRequestsReceived
);

// Obtener solicitudes de amistad enviadas
router.get(
  "/:userId/friend-requests/sent",
  authorizationMiddleware,
  controllers.getFriendRequestsSent
);

// Enviar solicitud de amistad
router.patch(
  "/:userId/friend-requests/:friendId",
  authorizationMiddleware,
  controllers.sendFriendRequest
);

// Responder a solicitud de amistad
router.patch(
  "/:userId/friend-requests/:friendRequestId/:status",
  authorizationMiddleware,
  controllers.respondToFriendRequest
);

// Cambiar estado de privacidad
router.patch(
  "/:userId/privacy-status/:isPrivate",
  authorizationMiddleware,
  controllers.changePrivacyStatus
);

export default router;
