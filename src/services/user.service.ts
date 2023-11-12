import { UploadedFile } from "express-fileupload";

import { EFileTypes } from "../enums/avatar.file.type.enum";
import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";
import { IPaginationResponse, IQuery } from "../types/pagination.type";
import { IUser } from "../types/user.type";
import { s3Service } from "./s3.service";

class UserService {
  public async getAll(query: IQuery): Promise<IPaginationResponse<IUser>> {
    try {
      const [users, itemsCount] = await userRepository.getAll(query);

      return {
        page: +query.page,
        limit: +query.limit,
        itemsCount,
        itemsFound: users.length,
        data: users,
      };
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getUser(userId: string): Promise<IUser> {
    return await userRepository.findById(userId);
  }

  public async delete(id: string): Promise<any> {
    const deletedCount = await userRepository.delete(id);

    if (!deletedCount) {
      throw new ApiError("User not found", 404);
    }

    return deletedCount;
  }

  public async put(id: string, dto: Partial<IUser>): Promise<IUser> {
    return await userRepository.put(id, dto);
  }

  public async uploadAvatar(avatar: UploadedFile, id: string): Promise<IUser> {
    const user = await userRepository.findById(id);

    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    const filePath = await s3Service.uploadFile(avatar, EFileTypes.User, id);

    const updatedUser = await userRepository.updateOneById(id, {
      avatar: filePath,
    });

    return updatedUser;
  }
}

export const userService = new UserService();
