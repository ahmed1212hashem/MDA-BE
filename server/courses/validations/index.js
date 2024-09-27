import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';
import { PREDEFINED_COURSES } from '../../users/helpers/constants.js';

export default {
  [CONTROLLERS.LIST_COURSES]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        courseCategory: Joi.string().optional(),
        gradeLevel: Joi.string().optional()
      })
      .optional()
  },
  
  [CONTROLLERS.GET_COURSE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.CREATE_COURSE]: {
    body: Joi.object().keys({
      courseName: Joi.string().required(),
      courseDescription: Joi.string().allow(''),
      property: Joi.string().uri().allow(null, ''),
      pdfLink: Joi.string().uri().allow(null, ''),
      gradeLevel: Joi.number().required(),
      courseCategory:Joi.string().valid(
        PREDEFINED_COURSES.ELA,
        PREDEFINED_COURSES.ELECTIVES,
        PREDEFINED_COURSES.MATH,
        PREDEFINED_COURSES.PHYSICAL_EDUCATION,
        PREDEFINED_COURSES.SOCIAL_STUDIES,
      ).required()
    })
  },

  [CONTROLLERS.UPDATE_COURSE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      courseName: Joi.string().optional(),
      courseDescription: Joi.string().allow('').optional(),
      youtubeLink: Joi.string().uri().allow(null, '').optional(),
      pdfLink: Joi.string().uri().allow(null, '').optional(),
      gradeLevel: Joi.number().optional(),
      courseCategory:Joi.string()  .valid(
        PREDEFINED_COURSES.ELA,
        PREDEFINED_COURSES.ELECTIVES,
        PREDEFINED_COURSES.MATH,
        PREDEFINED_COURSES.PHYSICAL_EDUCATION,
        PREDEFINED_COURSES.SOCIAL_STUDIES,
      )
    })
  },

  [CONTROLLERS.DELETE_COURSE]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
};
