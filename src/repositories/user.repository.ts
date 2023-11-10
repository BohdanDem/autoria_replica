import { FilterQuery } from "mongoose";

import { User } from "../models/User.model";
import { IQuery } from "../types/pagination.type";
import { IUser, IUserCredentials } from "../types/user.type";

class UserRepository {
  public async getMany(query: IQuery): Promise<[IUser[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const { page, limit, sortedBy, ...searchObject } = queryObj;

    const skip = +limit * (+page - 1);

    return await Promise.all([
      User.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
      User.count(searchObject),
    ]);
  }

  public async findById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async getOneByParams(
    params: FilterQuery<IUser>,
    selection?: string[],
  ): Promise<IUser> {
    return await User.findOne(params, selection);
  }

  public async register(dto: IUserCredentials): Promise<IUser> {
    return await User.create(dto);
  }

  public async delete(id: string): Promise<any> {
    const { deletedCount } = await User.deleteOne({ _id: id });
    return deletedCount;
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    });
  }

  public async updateOneById(
    userId: string,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, {
      returnDocument: "after",
    });
  }

  public async setStatus(userId: string, status: any): Promise<void> {
    await User.updateOne({ _id: userId }, { $set: { status } });
  }
}

export const userRepository = new UserRepository();
