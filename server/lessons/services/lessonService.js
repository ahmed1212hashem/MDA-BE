import LessonModel from '../models/index.js';
import ErrorResponse from '../../../common/utils/errorResponse/index.js';
import { lessonsErrors } from '../helpers/constants.js';
import { getPaginationAndSortingOptions } from '../../../common/utils/pagination/index.js';

import { StatusCodes } from 'http-status-codes';
import logger from '../../../common/utils/logger/index.js';

const { BAD_REQUEST } = StatusCodes;

class LessonService {
  async listLessons(query) {
    try {
      const options = getPaginationAndSortingOptions(query);
      let lessons;
      if(query.courseId){
        lessons = await LessonModel.find({ courseId:query.courseId }, options, null);
      }
      else{
       lessons = await LessonModel.find({  }, options, null);
      }
      return { lessons, options };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async getLesson(lessonId, options) {
    try {
      const lesson = await LessonModel.findOneAndIncludePopulate({ _id: lessonId }, options);
      if (!lesson)
        throw new ErrorResponse(
          lessonsErrors.LESSON_NOT_FOUND.message,
          BAD_REQUEST,
          lessonsErrors.LESSON_NOT_FOUND.code
        );
      return lesson;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async createLesson(userId, courseId, lessonData) {
    try {
      // Get the count of lessons in the course
      const lessonCount = await LessonModel.count({ courseId });
      lessonData['lessonOrder'] = lessonCount + 1; // Set default lesson order based on the count
      lessonData['courseId'] = courseId;

      const lesson = await LessonModel.create(lessonData);
      return lesson;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async updateLesson(lessonId, lessonData) {
    try {
      const lesson = await LessonModel.findOne({ _id: lessonId });
      if (!lesson)
        throw new ErrorResponse(
          lessonsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          lessonsErrors.PRODUCT_NOT_FOUND.code
        );
      const updatedLesson = await LessonModel.update(
        { _id: lessonId },
        lessonData
      );
      return updatedLesson;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async deleteLesson(lessonId, mcId) {
    try {
      const lesson = await LessonModel.findOne({ _id: lessonId });
      if (!lesson)
        throw new ErrorResponse(
          lessonsErrors.PRODUCT_NOT_FOUND.message,
          BAD_REQUEST,
          lessonsErrors.PRODUCT_NOT_FOUND.code
        );

      const deletedLesson = await LessonModel.delete({
        _id: lessonId
      });

      return deletedLesson;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async reorderLessons(courseId, newOrder) {
    try {
      for (const [index, lessonId] of newOrder.entries()) {
        await LessonModel.update(
          { _id: lessonId, courseId },
          { lessonOrder: index + 1 } 
        );
      }

      const lessons = await LessonModel.find({courseId}, {}, null);
      return lessons;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async countLessons(courseId) {
    try {
      const count = await LessonModel.count({ courseId });
      return count;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}

export default new LessonService();
