import Joi from 'joi';
import { CONTROLLERS, PREDEFINED_COURSES } from '../helpers/constants.js';
import { USER_ROLES } from '../../../common/helpers/constants.js';

export default {
  [CONTROLLERS.LIST_USERS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional()
      })
      .optional()
  },
  [CONTROLLERS.COUNT_USERS]: {},
  [CONTROLLERS.GET_USER]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.ADMIN_LOGIN]: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      rememberMe: Joi.boolean().optional().default(false)
    })
  },
  [CONTROLLERS.CREATE_USER]: {
    body: Joi.object().keys({
      fullName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid(
          USER_ROLES.ADMIN,
          USER_ROLES.TEACHER,
          USER_ROLES.STUDENT
        )
        .required()
    })
  },
  [CONTROLLERS.USER_LOGIN]: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      rememberMe: Joi.boolean().optional().default(false)
    })
  },
  [CONTROLLERS.SIGNUP]: {
    body: Joi.object().keys({
      fullName: Joi.string().required(),
      phoneNumber: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string()
        .valid(
          USER_ROLES.TEACHER,
          USER_ROLES.STUDENT
        )
        .required(),
        gradesAssigned:Joi.array().items(Joi.number()),
        coursesAssigned:Joi.array().items(Joi.string()  .valid(
          PREDEFINED_COURSES.ELA,
          PREDEFINED_COURSES.ELECTIVES,
          PREDEFINED_COURSES.MATH,
          PREDEFINED_COURSES.PHYSICAL_EDUCATION,
          PREDEFINED_COURSES.SOCIAL_STUDIES,
        )),
        gradeLevel:Joi.string()
    })
  },
  [CONTROLLERS.UPDATE_USER]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object()
      .keys({
        fullName: Joi.string().optional(),
        phoneNumber: Joi.string().optional(),
        password: Joi.string().optional(),
        email: Joi.string().optional(),
        isActive: Joi.boolean().optional(),
        role: Joi.string().forbidden(),
      })
      .required()
  },
  [CONTROLLERS.DEACTIVATE_USER]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.DELETE_USER]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.VERIFY_EMAIL]: {
    body: Joi.object()
      .keys({
        verificationCode: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.RESET_PASSWORD]: {
    body: Joi.object()
      .keys({
        email: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.RESET_PASSWORD_CODE_VERIFICATION]: {
    body: Joi.object()
      .keys({
        email: Joi.string().required(),
        resetPasswordCode: Joi.string().required()
      })
      .required()
  }
};
