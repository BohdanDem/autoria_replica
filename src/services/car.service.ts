import { UploadedFile } from "express-fileupload";

import { EFileTypes } from "../enums/avatar.file.type.enum";
import { ECurrency } from "../enums/currency.enum";
import { ApiError } from "../errors/api.error";
import { Currency } from "../models/Currency.model";
import { carRepository } from "../repositories/car.repository";
import { carWatchRepository } from "../repositories/car.watch.repository";
import { userRepository } from "../repositories/user.repository";
import { ICar } from "../types/car.type";
import { ICarFullCost, ICurrency, IPrice } from "../types/currency.type";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { s3Service } from "./s3.service";

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
    const user = await userRepository.findById(userId);
    if (user.role === "seller" && user.accountType === "base") {
      if (user.postedCarCount >= 1) {
        throw new ApiError(
          "You can place only one advertisement! To post more please buy premium account",
          403,
        );
      }
      user.postedCarCount += 1;
      await userRepository.put(userId, user);
    }
    const carFullCost: ICarFullCost = await this.getFullCarCost(dto);
    dto.carFullCost = carFullCost;
    return await carRepository.post(dto, userId);
  }

  public async getCar(carId: string): Promise<ICar> {
    const car = await carRepository.findById(carId);
    const carWatch = {
      _carId: car._id,
      brand: car.brand,
      carModel: car.carModel,
    };
    await carWatchRepository.post(carWatch);
    return car;
  }

  public async delete(id: string): Promise<number> {
    const deletedCount = await carRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("Car not found", 404);
    }
    return deletedCount;
  }

  public async put(id: string, dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.put(id, dto);
  }

  public async uploadAvatar(avatar: UploadedFile, id: string): Promise<ICar> {
    const car = await carRepository.findById(id);

    if (car.avatar) {
      await s3Service.deleteFile(car.avatar);
    }

    const filePath = await s3Service.uploadFile(avatar, EFileTypes.Car, id);

    const updatedCar = await carRepository.updateOneById(id, {
      avatar: filePath,
    });

    return updatedCar;
  }

  private async getFullCarCost(dto: ICar): Promise<ICarFullCost> {
    const currency: ICurrency = await Currency.findOne();
    const cost: Partial<IPrice> = {};

    switch (dto.currency) {
      case ECurrency.USD:
        cost.UAH_Price = Number(
          (dto.price * +currency.USD_UAH_sale).toFixed(2),
        );
        cost.USD_Price = Number(dto.price.toFixed(2));
        cost.EUR_Price = Number(
          (
            dto.price *
            (+currency.USD_UAH_sale / +currency.EUR_UAH_sale)
          ).toFixed(2),
        );
        break;
      case ECurrency.EUR:
        cost.UAH_Price = Number(
          (dto.price * +currency.EUR_UAH_sale).toFixed(2),
        );
        cost.USD_Price = Number(
          (
            dto.price *
            (+currency.EUR_UAH_sale / +currency.USD_UAH_sale)
          ).toFixed(2),
        );
        cost.EUR_Price = Number(dto.price.toFixed(2));
        break;
      case ECurrency.UAH:
        cost.UAH_Price = Number(dto.price.toFixed(2));
        cost.EUR_Price = Number(
          (dto.price / +currency.EUR_UAH_sale).toFixed(2),
        );
        cost.USD_Price = Number(
          (dto.price / +currency.USD_UAH_sale).toFixed(2),
        );
        break;
    }
    const carFullCost = {
      exchangeCurrency: {
        EUR_UAH_buy: currency.EUR_UAH_buy,
        EUR_UAH_sale: currency.EUR_UAH_sale,
        USD_UAH_buy: currency.USD_UAH_buy,
        USD_UAH_sale: currency.USD_UAH_sale,
      },
      cost,
    };
    return carFullCost;
  }
}

export const carService = new CarService();
