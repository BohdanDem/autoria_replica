import { FilterQuery } from "mongoose";

import { Car } from "../models/Car.model";
import { ICar } from "../types/car.type";
import { IQuery } from "../types/pagination.type";

class CarRepository {
  public async getAll(query: IQuery): Promise<[ICar[], number]> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const { page, limit, sortedBy, ...searchObject } = queryObj;

    const skip = +limit * (+page - 1);

    return await Promise.all([
      Car.find(searchObject).limit(+limit).skip(skip).sort(sortedBy),
      Car.find().count(searchObject),
    ]);
  }

  public async post(dto: ICar, userId: string): Promise<ICar> {
    return await Car.create({ ...dto, _userId: userId });
  }

  public async findById(id: string): Promise<ICar> {
    return await Car.findById(id);
  }

  public async getOneByParams(params: FilterQuery<ICar>): Promise<ICar> {
    return await Car.findOne(params);
  }

  public async delete(id: string): Promise<any> {
    const { deletedCount } = await Car.deleteOne({ _id: id });
    return deletedCount;
  }

  public async put(id: string, dto: Partial<ICar>): Promise<ICar> {
    return await Car.findByIdAndUpdate(id, dto, {
      returnDocument: "after",
    }).populate("_userId");
  }
}

export const carRepository = new CarRepository();
