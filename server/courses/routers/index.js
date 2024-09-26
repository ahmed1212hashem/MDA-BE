import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

// List Courses
router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_COURSES]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_COURSES]),
  Controller[CONTROLLERS.LIST_COURSES]
);

// Get Course Count
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_COURSES]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_COURSES]),
  Controller[CONTROLLERS.COUNT_COURSES]
);

// Get Course by ID
router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_COURSE]),
  validateRequest(validationSchemas[CONTROLLERS.GET_COURSE]),
  Controller[CONTROLLERS.GET_COURSE]
);

// Create Course
router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_COURSE]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_COURSE]),
  Controller[CONTROLLERS.CREATE_COURSE]
);


// Update Course
router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_COURSE]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_COURSE]),
  Controller[CONTROLLERS.UPDATE_COURSE]
);

// Delete Course
router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_COURSE]),
  Controller[CONTROLLERS.DELETE_COURSE]
);


export default router;
