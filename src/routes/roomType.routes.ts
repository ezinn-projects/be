import { Router } from 'express'
import { UserRole } from '~/constants/enum'
import {
  addRoomTypeController,
  deleteManyRoomTypesController,
  deleteRoomTypeByIdController,
  getRoomTypeByIdController,
  getRoomTypesController,
  updateRoomTypeByIdController
} from '~/controllers/roomType.controller'

import multer from 'multer'
import { protect } from '~/middlewares/auth.middleware'
import { checkRoomTypeExists, checkRoomTypeIsNotExists, validateRoomTypeIds } from '~/middlewares/roomType.middleware'
import { wrapRequestHanlder } from '~/utils/handlers'

const roomTypeRouter = Router()

const upload = multer({ storage: multer.memoryStorage() })

/**
 * @description Get room types
 * @path /room-types
 * @method GET
 * @author QuangDoo
 */
roomTypeRouter.get('/', wrapRequestHanlder(getRoomTypesController))

/**
 * @description Get room type by id
 * @path /room-types/:roomTypeId
 * @method GET
 * @author QuangDoo
 */
roomTypeRouter.get('/:roomTypeId', checkRoomTypeIsNotExists, wrapRequestHanlder(getRoomTypeByIdController))

/**
 * @description Add room type
 * @path /room-types/add-room-type
 * @method POST
 * @body multipart/form-data
 * Fields: name, description, images, type
 * @author QuangDoo
 */
roomTypeRouter.post(
  '/add-room-type',
  protect([UserRole.Admin]),
  checkRoomTypeExists,
  upload.array('images', 5),
  wrapRequestHanlder(addRoomTypeController)
)

/**
 * @description Update room type by id
 * @path /room-types/:roomTypeId
 * @method PATCH
 * @author QuangDoo
 */
roomTypeRouter.patch(
  '/:roomTypeId',
  protect([UserRole.Admin]),
  checkRoomTypeIsNotExists,
  wrapRequestHanlder(updateRoomTypeByIdController)
)

/**
 * @description Delete room type by id
 * @path /room-types/:roomTypeId
 * @method DELETE
 * @author QuangDoo
 */
roomTypeRouter.delete(
  '/:roomTypeId',
  protect([UserRole.Admin]),
  checkRoomTypeIsNotExists,
  wrapRequestHanlder(deleteRoomTypeByIdController)
)

/**
 * @description Delete many room types
 * @path /room-types/delete-many
 * @method DELETE
 * @author QuangDoo
 */
roomTypeRouter.delete(
  '/delete-many',
  protect([UserRole.Admin]),
  validateRoomTypeIds,
  wrapRequestHanlder(deleteManyRoomTypesController)
)

export default roomTypeRouter
