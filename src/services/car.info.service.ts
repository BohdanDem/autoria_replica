import { carRepository } from "../repositories/car.repository";

class CarInfoService {
  public async getWatchCount(id: string): Promise<number> {
    const car = await carRepository.findById(id);
    return car.advertWatchCount;
  }
}

export const carInfoService = new CarInfoService();
