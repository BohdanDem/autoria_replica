import { ECurrency } from "../enums/currency.enum";
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

  public async getMiddleCarPriceByCountry(dto: string): Promise<number> {
    let filterBy;

    switch (dto) {
      case ECurrency.USD:
        filterBy = "$carFullCost.cost.USD_Price";
        break;
      case ECurrency.EUR:
        filterBy = "$carFullCost.cost.EUR_Price";
        break;
      case ECurrency.UAH:
        filterBy = "$carFullCost.cost.UAH_Price";
        break;
    }

    const avgPrice: IAvgCarPrice[] = await Car.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: `${filterBy}` },
        },
      },
    ]);
    return avgPrice[0]?.avg;
  }
}

export const carInfoRepository = new CarInfoRepository();
