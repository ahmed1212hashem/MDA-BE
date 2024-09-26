export const CONTROLLERS = {
    LIST_LESSONS: 'admin:list',
    GET_LESSON: 'admin:get',
    CREATE_LESSON: 'admin:create',
    UPDATE_LESSON: 'admin:update',
    DELETE_LESSON: 'admin:delete',
    COUNT_LESSONS: 'admin:count',
    REORDER_LESSONS:'adim:reorder'
  };
  
  export const lessonsErrors = Object.freeze({
    LESSON_NOT_FOUND: {
      code: 103,
      message: 'lesson not found'
    }
  });
  