import { StatusCodes } from 'http-status-codes';
import CourseService from '../services/courseService.js';
import logger from '../../../common/utils/logger/index.js';
import { CONTROLLERS } from '../helpers/constants.js';

export default {
  [CONTROLLERS.LIST_COURSES]: async (req, res, next) => {
    try {
      const data = await CourseService.listCourses(req.query);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.GET_COURSE]: async (req, res, next) => {
    try {
      const data = await CourseService.getCourse(req.params.id);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  [CONTROLLERS.COUNT_COURSES]: async (req, res, next) => {
    try {
      const data = await CourseService.countCourses();
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.CREATE_COURSE]: async (req, res, next) => {
    try {
      const data = await CourseService.createCourse(req.body);
      res.status(StatusCodes.CREATED).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  

  [CONTROLLERS.UPDATE_COURSE]: async (req, res, next) => {
    try {
      const data = await CourseService.updateCourse(req.params.id, req.body);
      res.status(StatusCodes.OK).json({ success: true, data });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

  [CONTROLLERS.DELETE_COURSE]: async (req, res, next) => {
    try {
      const data = await CourseService.deleteCourse(req.params.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },

};
