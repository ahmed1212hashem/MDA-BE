import CourseModel from '../models/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { coursesErrors } from '../helpers/constants.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

const { BAD_REQUEST } = StatusCodes;

class CourseService {
  async listCourses(query) {
    try {
      const options = getPaginationAndSortingOptions(query);
      const courses = await CourseModel.find(query, options, null);
      return { courses, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getCourse(courseId, options) {
    try {
      const course = await CourseModel.findOneAndIncludePopulate({ _id: courseId }, options);
      if (!course)
        throw new ErrorResponse(
          coursesErrors.COURSE_NOT_FOUND.message,
          BAD_REQUEST,
          coursesErrors.COURSE_NOT_FOUND.code
        );
      return course;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createCourse( courseData) {
    try {
      const course = await CourseModel.create(courseData);
      return course;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateCourse(courseId, courseData) {
    try {
      const course = await CourseModel.findOne({ _id: courseId });
      if (!course)
        throw new ErrorResponse(
          coursesErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          coursesErrors.PRODUCT_NOT_FOUND.code
        );
      const updatedCourse = await CourseModel.update(
        { _id: courseId },
        courseData
      );
      return updatedCourse;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteCourse(courseId, mcId) {
    try {
      const course = await CourseModel.findOne({ _id: courseId });
      if (!course)
        throw new ErrorResponse(
          coursesErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          coursesErrors.PRODUCT_NOT_FOUND.code
        );

      const deletedCourse = await CourseModel.delete({
        _id: courseId
      });

      return deletedCourse;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }


  async countCourses() {
    try {
      const count = await CourseModel.count();
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new CourseService();
