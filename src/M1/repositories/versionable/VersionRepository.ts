import * as mongoose from 'mongoose';

class VersionRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {
  private modelType: M;
  constructor(modelType) {
    this.modelType = modelType;
  }

  static generateObjectId() {
    return String(mongoose.Types.ObjectId());
  }

  async create(options, authId: any = {}): Promise<D> {
    const id = VersionRepository.generateObjectId();
    return await this.modelType.create({
      ...options,
      _id: id,
      createdBy: authId,
      originalId: id

    });

  }

  async count() {
    return await this.modelType.countDocuments();
  }

  async get(data: any): Promise<D> {
    const originalId = data.id;
    delete data.id;
    data = { ...data, originalId };
    return this.modelType.findOne({ ...data, deletedAt: undefined }).lean();
  }

  async delete(data: any): Promise<D> {
    const { id, authId } = data;
    const update = { deletedAt: new Date(), deletedBy: authId };
    return this.modelType.findOneAndUpdate({ originalId: id, deletedAt: undefined }, update, { new: true });

  }

  async  update(data: any, dataToUpdate: object): Promise<D> {
    const { id, authId } = data;
    const currentData = await this.modelType.findOne({ originalId: id, deletedAt: undefined }).lean();
    const newUpdatedData = Object.assign(currentData, dataToUpdate);
    const update = { updatedBy: authId, updatedAt: new Date() };
    delete newUpdatedData._id;
    await this.delete({ id, authId });
    return this.modelType.create({ ...newUpdatedData, ...update });
  }

  async list(query: any = {}, options: any = {}) {
    const { sortBy } = options;
    query.deletedAt = undefined;
    delete options.sortBy;
    options = { ...options, sort: sortBy};
    return this.modelType.find(query, undefined, options);

  }
}

export default VersionRepository;
