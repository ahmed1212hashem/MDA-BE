import mongoose from 'mongoose';
import nanoid from '../../../common/utils/nanoID/index.js';

const lessonSchema = new mongoose.Schema(
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
    lessonTitle: {
        type: String,
        required: true
    },
    lessonDuration: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    lessonOrder: {
        type: Number,
        required: true
    },
    courseId:{
        type:String,
        ref: 'courses'

    }
  },
  { timestamps: true }
);

const Lesson = mongoose.model('lessons', lessonSchema);

export default Lesson;
