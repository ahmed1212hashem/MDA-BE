import Joi from 'joi';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_LESSONS]: {
    query: Joi.object()
      .keys({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        courseId: Joi.string().optional(),
      })
      .optional()
  },
  
  [CONTROLLERS.GET_LESSON]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },

  [CONTROLLERS.CREATE_LESSON]: {
    body: Joi.object().keys({
      pdfLink: Joi.string().uri().allow(null, ''),
      youtubeLink: Joi.string().uri().allow(null, ''),
      lessonTitle: Joi.string().required(),
      lessonDuration: Joi.number().required(),
      type: Joi.string().required(),
      description: Joi.string().allow(''),
      lessonOrder: Joi.number().optional(),
      courseId: Joi.string().required(),
    })
  },

  [CONTROLLERS.UPDATE_LESSON]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required(),
    body: Joi.object().keys({
      pdfLink: Joi.string().uri().allow(null, ''),
      youtubeLink: Joi.string().uri().allow(null, ''),
      lessonTitle: Joi.string(),
      lessonDuration: Joi.number(),
      type: Joi.string(),
      description: Joi.string().allow(''),
      lessonOrder: Joi.number().optional(),
      courseId: Joi.string().optional(),
    })
  },

  [CONTROLLERS.DELETE_LESSON]: {
    params: Joi.object()
      .keys({
        id: Joi.string().required()
      })
      .required()
  },
  [CONTROLLERS.COUNT_LESSONS]:{
  },

  [CONTROLLERS.REORDER_LESSONS]: {
    body: Joi.object().keys({
      courseId: Joi.string().required(),
      newOrder: Joi.array().items(Joi.string().required()).required()
    })
  }
};
