import express from 'express';
import { CONTROLLERS } from '../helpers/constants.js';
import Controller from '../controllers/index.js';
import validationSchemas from '../validations/index.js';
import validateRequest from '../../../common/middleware/requestValidation/index.js';
import Authenticate from '../../../common/middleware/authentication/index.js';
import Authorization from '../../../common/middleware/authorization/index.js';
import Permissions from '../permissions.js';

const router = express.Router();

// List Lessons
router.get(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.LIST_LESSONS]),
  validateRequest(validationSchemas[CONTROLLERS.LIST_LESSONS]),
  Controller[CONTROLLERS.LIST_LESSONS]
);

// Get Lesson Count
router.get(
  '/count',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.COUNT_LESSONS]),
  validateRequest(validationSchemas[CONTROLLERS.COUNT_LESSONS]),
  Controller[CONTROLLERS.COUNT_LESSONS]
);

// Get Lesson by ID
router.get(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.GET_LESSON]),
  validateRequest(validationSchemas[CONTROLLERS.GET_LESSON]),
  Controller[CONTROLLERS.GET_LESSON]
);

// Create Lesson
router.post(
  '/',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.CREATE_LESSON]),
  validateRequest(validationSchemas[CONTROLLERS.CREATE_LESSON]),
  Controller[CONTROLLERS.CREATE_LESSON]
);

// Reorder Lessons
router.put(
    '/reorder',
    Authenticate,
    Authorization.Authorize(Permissions[CONTROLLERS.REORDER_LESSONS]),
    validateRequest(validationSchemas[CONTROLLERS.REORDER_LESSONS]),
    Controller[CONTROLLERS.REORDER_LESSONS]
  );
  
// Update Lesson
router.put(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.UPDATE_LESSON]),
  validateRequest(validationSchemas[CONTROLLERS.UPDATE_LESSON]),
  Controller[CONTROLLERS.UPDATE_LESSON]
);

// Delete Lesson
router.delete(
  '/:id',
  Authenticate,
  Authorization.Authorize(Permissions[CONTROLLERS.DELETE_LESSON]),
  Controller[CONTROLLERS.DELETE_LESSON]
);


export default router;
