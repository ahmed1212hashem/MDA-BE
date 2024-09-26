import CourseSchema from '../schema/index.js';

class Course {
  async find(selectors = {}, options = {}) {
    const result = await CourseSchema.find(selectors,{},options)
    .sort('-updatedAt')
    .lean()
    .maxTimeMS(60000);
    return result;
  }

  async findOne(selector = {}, projection = {}) {
    const result = await CourseSchema.findOne(selector).select(projection).lean();
    return result;
  }
  async findOneAndIncludePopulate(selector = {}, projection = {}) {
    const result = await CourseSchema.findOne(selector).select(projection);
    return result;
  }

  async count(selectors = {}) {
    const result = await CourseSchema.countDocuments(selectors).maxTimeMS(60000);
    return result;
  }

  async create(payload) {
    const result = await CourseSchema.create(payload);
    return result;
  }

  async update(selector = {}, newParams, options = {}) {
    const result = await CourseSchema.findOneAndUpdate(selector, newParams, {
      runValidators: true,
      new: true,
      ...options
    });
    return result;
  }

  async updateMany(selector, newParams, options = {}) {
    const result = await CourseSchema.updateMany(selector, newParams, options);
    return result;
  }
  async delete(selector, options = {}) {
    const result = await CourseSchema.deleteOne(selector, options);
    return result;
  }

  async deleteMany(selector, options = {}) {
    const result = await CourseSchema.deleteMany(selector, options);
    return result;
  }

  async aggregate(pipeline, options = {}) {
    const result = await CourseSchema.aggregate(pipeline, { maxTimeMS: 60000 })
      .sort(options.sort || 'createdAt')
      .skip(options.skip || 0)
      .limit(options.limit || 200);
    return result;
  }
}

export default new Course();
