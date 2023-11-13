import { ECurrency } from "../enums/currency.enum";
import { Car } from "../models/Car.model";
import { IAvgCarPrice } from "../types/car.info.type";
import { ICarPrice } from "../types/car.watch.type";

class CarInfoRepository {
  public async getMiddleCarPriceByRegion(
    dto: ICarPrice,
  ): Promise<IAvgCarPrice> {
    const filterBy: string = await this.setFilter(dto.currency);

    const avgPrice: IAvgCarPrice[] = await Car.aggregate([
      {
        $match: { region: `${dto.region}` },
      },
      {
        $group: {
          _id: "car price by region",
          avg: { $avg: `${filterBy}` },
        },
      },
    ]);
    return avgPrice[0];
  }

  public async getMiddleCarPriceByCountry(dto: string): Promise<IAvgCarPrice> {
    const filterBy: string = await this.setFilter(dto);

    const avgPrice: IAvgCarPrice[] = await Car.aggregate([
      {
        $group: {
          _id: "car price by country",
          avg: { $avg: `${filterBy}` },
        },
      },
    ]);
    return avgPrice[0];
  }

  private async setFilter(dto: string): Promise<string> {
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
    return filterBy;
  }
}

export const carInfoRepository = new CarInfoRepository();
