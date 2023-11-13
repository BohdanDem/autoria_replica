import { CarWatch } from "../models/CarWatch.model";
import { ICarWatch } from "../types/car.watch.type";

class CarWatchRepository {
  public async post(dto: ICarWatch): Promise<ICarWatch> {
    return await CarWatch.create(dto);
  }

  public async getCarWatch(id: string): Promise<number> {
    // const queryStr = JSON.stringify(query);
    // const queryObj = JSON.parse(
    //   queryStr.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`),
    // );
    //
    // const { sort } = queryObj;
    // let sortedBy: number = 0;
    //
    // if (sort) {
    //   switch (sort) {
    //     case ECarWatchSort.DAY:
    //       sortedBy = 1;
    //       break;
    //     case ECarWatchSort.WEEK:
    //       sortedBy = 7;
    //       break;
    //     case ECarWatchSort.Month:
    //       sortedBy = 30;
    //       break;
    //   }
    // }
    // console.log(sortedBy);

    const watch = await CarWatch.find({
      _carId: id,
    });
    return watch.length;
  }
}

export const carWatchRepository = new CarWatchRepository();
