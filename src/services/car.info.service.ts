import { carInfoRepository } from "../repositories/car.info.repository";
import { carRepository } from "../repositories/car.repository";

class CarInfoService {
  public async getWatchCount(id: string): Promise<number> {
    const car = await carRepository.findById(id);
    return car.advertWatchCount;
  }

  public async getMiddleCarPriceByRegion(dto: string): Promise<number> {
    return await carInfoRepository.getMiddleCarPriceByRegion(dto);
  }

  public async getMiddleCarPriceByCountry(): Promise<number> {
    return await carInfoRepository.getMiddleCarPriceByCountry();
  }
}

export const carInfoService = new CarInfoService();
