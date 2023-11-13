import { Car } from "../models/Car.model";
import { IAvgCarPrice } from "../types/car.info.type";

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
}

export const carInfoRepository = new CarInfoRepository();
