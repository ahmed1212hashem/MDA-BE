import LessonSchema from '../schema/index.js';

class Lesson {
  async find(selectors = {}, options = {}) {
    const sortOptions={};
    sortOptions['lessonOrder'] = 1
    const result = await LessonSchema.find(selectors)
    .sort(sortOptions)
    .lean()
    .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await LessonSchema.findOne(selector).select(projection).lean();
    return result;
  }
  async findOneAndIncludePopulate(selector = {}, projection = {}) {
    const result = await LessonSchema.findOne(selector).select(projection);
    return result;
  }

  async count(selectors = {}) {
    const result = await LessonSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await LessonSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await LessonSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await LessonSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await LessonSchema.deleteOne(selector, options);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await LessonSchema.deleteMany(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await LessonSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Lesson();
