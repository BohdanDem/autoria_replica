import { configs } from "../configs/config";
import { ICar } from "../types/car.type";
import { IPresenter } from "../types/common.type";

class CarPresenter implements IPresenter<ICar, Partial<ICar>> {
  present(data: ICar): Partial<ICar> {
    return {
      _id: data._id,
      brand: data.brand,
      carModel: data.carModel,
      year: data.year,
      price: data.price,
      currency: data.currency,
      region: data.region,
      isActive: data.isActive,
      badWordsCheckCount: data.badWordsCheckCount,
      carFullCost: data.carFullCost,
      description: data.description,
      _userId: data._userId,
      avatar: `${configs.AWS_S3_URL}/${data.avatar}`,
    };
  }
}

export const carPresenter = new CarPresenter();
