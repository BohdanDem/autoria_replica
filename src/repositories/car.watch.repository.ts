import { ECarWatchSort } from "../enums/car.watch.sort.enum";
import { CarWatch } from "../models/CarWatch.model";
import { ICarWatch } from "../types/car.watch.type";
import { IQuery } from "../types/pagination.type";

class CarWatchRepository {
  public async post(dto: ICarWatch): Promise<ICarWatch> {
    return await CarWatch.create(dto);
  }

  public async getCarWatch(id: string, query: IQuery): Promise<number> {
    const queryStr = JSON.stringify(query);
    const queryObj = JSON.parse(
      queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    );

    const { sort } = queryObj;
    let sortedBy: number = 0;

    if (sort) {
      switch (sort) {
        case ECarWatchSort.DAY:
          sortedBy = 1;
          break;
        case ECarWatchSort.WEEK:
          sortedBy = 7;
          break;
        case ECarWatchSort.Month:
          sortedBy = 30;
          break;
      }
    }
    const date = new Date();
    date.setDate(date.getDate() - sortedBy);

    const watch = await CarWatch.find({
      _carId: id,
      createdAt: { $gte: date },
    });
    return watch.length;
  }
}

export const carWatchRepository = new CarWatchRepository();
