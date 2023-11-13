import { Car } from "../models/Car.model";
import { IAvgCarPrice } from "../types/car.info.type";
import { ICar } from "../types/car.type";

class CarInfoRepository {
  public async getMiddleCarPriceByRegion(dto: string): Promise<number> {
    const avgPrice: IAvgCarPrice[] = await Car.aggregate([
      {
        $match: { region: `${dto}` },
      },
      {
        $group: {
          _id: null,
          avg: { $avg: `$price` },
        },
      },
    ]);
    return avgPrice[0]?.avg;
  }

  public async getMiddleCarPriceByCountry(): Promise<number> {
    const avgPrice: IAvgCarPrice[] = await Car.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: `$price` },
        },
      },
    ]);
    return avgPrice[0]?.avg;
  }

  public async getCarWatch(id: string): Promise<ICar> {
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

    return await Car.findById(id);
  }
}

export const carInfoRepository = new CarInfoRepository();
