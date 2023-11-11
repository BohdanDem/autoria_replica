import { ApiError } from "../errors/api.error";
import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";
import { IPaginationResponse, IQuery } from "../types/pagination.type";

class CarService {
  public async getAll(query: IQuery): Promise<IPaginationResponse<ICar>> {
    try {
      const [cars, itemsCount] = await carRepository.getAll(query);

      return {
        page: +query.page,
        limit: +query.limit,
        itemsCount,
        itemsFound: cars.length,
        data: cars,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async post(dto: ICar, userId: string): Promise<ICar> {
    return await carRepository.post(dto, userId);
  }

  public async getCar(carId: string): Promise<ICar> {
    return await carRepository.findById(carId);
  }

  public async delete(id: string): Promise<any> {
    const deletedCount = await carRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("Car not found", 404);
    }
    return deletedCount;
  }

  public async put(id: string, dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.put(id, dto);
  }
}

export const carService = new CarService();