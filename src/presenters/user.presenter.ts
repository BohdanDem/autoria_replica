import { configs } from "../configs/config";
import { IPresenter } from "../types/common.type";
import { IUser } from "../types/user.type";

class UserPresenter implements IPresenter<IUser, Partial<IUser>> {
  present(data: IUser): Partial<IUser> {
    return {
      _id: data._id,
      userName: data.userName,
      role: data.role,
      accountType: data.accountType,
      age: data.age,
      genders: data.genders,
      email: data.email,
      avatar: `${configs.AWS_S3_URL}/${data.avatar}`,
    };
  }
}

export const userPresenter = new UserPresenter();
