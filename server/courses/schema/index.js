import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';
import { PREDEFINED_COURSES } from '../../users/helpers/constants.js';

const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    pdfLink: {
        type: String,
        required: false
    },
    youtubeLink: {
        type: String,
        required: false
    },
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    courseCategory:{
        type: String,
        enum: Object.values(PREDEFINED_COURSES)
      },
      gradeLevel:{
        type:String
      },
  },
  { timestamps: true }
);

const Course = mongoose.model('courses', courseSchema);

export default Course;
