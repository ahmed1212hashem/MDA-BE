import { StatusCodes } from 'http-status-codes';
import lessonService from '../services/lessonService.js';
import logger from '../../../common/utils/logger/index.js';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_LESSONS]: async (req, res, next) => {
    try {
      const data = await lessonService.listLessons(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_LESSON]: async (req, res, next) => {
    try {
      const data = await lessonService.getLesson(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_LESSONS]: async (req, res, next) => {
    try {
      const data = await lessonService.countLessons(req.query.courseId);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_LESSON]: async (req, res, next) => {
    try {
      const data = await lessonService.createLesson(req.user.id, req.body.courseId, req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  
  [CONTROLLERS.REORDER_LESSONS]: async (req, res, next) => {
    try {
      const data = await lessonService.reorderLessons(req.body.courseId, req.body.newOrder);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.UPDATE_LESSON]: async (req, res, next) => {
    try {
      const data = await lessonService.updateLesson(req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_LESSON]: async (req, res, next) => {
    try {
      const data = await lessonService.deleteLesson(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

};
