import { carInfoRepository } from "../repositories/car.info.repository";
import { carWatchRepository } from "../repositories/car.watch.repository";
import { IAvgCarPrice } from "../types/car.info.type";
import { ICarPrice } from "../types/car.watch.type";
import { IQuery } from "../types/pagination.type";

class CarInfoService {
  public async getWatchCount(id: string, query: IQuery): Promise<number> {
    return await carWatchRepository.getCarWatch(id, query);
  }

  public async getMiddleCarPriceByRegion(
    dto: ICarPrice,
  ): Promise<IAvgCarPrice> {
    return await carInfoRepository.getMiddleCarPriceByRegion(dto);
  }

  public async getMiddleCarPriceByCountry(dto: string): Promise<IAvgCarPrice> {
    return await carInfoRepository.getMiddleCarPriceByCountry(dto);
  }
}

export const carInfoService = new CarInfoService();
