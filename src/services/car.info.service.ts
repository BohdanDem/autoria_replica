import { carInfoRepository } from "../repositories/car.info.repository";
import { carWatchRepository } from "../repositories/car.watch.repository";

class CarInfoService {
  public async getWatchCount(id: string): Promise<any> {
    return await carWatchRepository.getCarWatch(id);
  }

  public async getMiddleCarPriceByRegion(dto: string): Promise<number> {
    return await carInfoRepository.getMiddleCarPriceByRegion(dto);
  }

  public async getMiddleCarPriceByCountry(dto: string): Promise<number> {
    return await carInfoRepository.getMiddleCarPriceByCountry(dto);
  }
}

export const carInfoService = new CarInfoService();