import mongoose from 'mongoose';
import { USER_ROLES } from '../../../common/helpers/constants.js';
import nanoid from '../../../common/utils/nanoID/index.js';
import { PREDEFINED_COURSES } from '../helpers/constants.js';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid()
    },
    fullName: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.ADMIN
    },
    isActive: {
      type: Boolean,
      default: true
    },
    gradesAssigned:[{
      type: Number,
    }],
    coursesAssigned:[{
      type: String,
      enum: Object.values(PREDEFINED_COURSES)
    }],
    gradeLevel:{
      type:String
    },
    isVerified: {
      type: Boolean,
      default: true
    },
    verificationCode: {
      type: String
    },
    verificationCodeTTL: {
      type: String
    },
    resetPasswordCode: {
      type: String
    },
    resetPasswordCodeTTL: {
      type: String
    }
    
  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema);

export default User;
