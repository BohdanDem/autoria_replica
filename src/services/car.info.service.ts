import { carInfoRepository } from "../repositories/car.info.repository";

class CarInfoService {
  public async getWatchCount(id: string): Promise<number> {
    const car = await carInfoRepository.getCarWatch(id);
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
