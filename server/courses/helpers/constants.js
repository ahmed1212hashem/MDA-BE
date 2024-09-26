export const CONTROLLERS = {
    LIST_COURSES: 'admin:list',
    GET_COURSE: 'admin:get',
    CREATE_COURSE: 'admin:create',
    UPDATE_COURSE: 'admin:update',
    DELETE_COURSE: 'admin:delete',
    COUNT_COURSES: 'admin:count'
  };
  
  export const coursesErrors = Object.freeze({
    COURSE_NOT_FOUND: {
      code: 103,
      message: 'course not found'
    }
  });
  