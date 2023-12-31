import { ObjectId } from "mongodb";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { ITokenPayload, ITokensPair } from "../types/token.types";
import { IUser, IUserCredentials } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(dto: IUser, userRole: string): Promise<IUser> {
    try {
      await this.isEmailUniq(dto.email);
      const hashedPassword = await passwordService.hash(dto.password);

      const role = userRole.split("/").pop();

      if (role === "seller_base") {
        dto.role = "seller";
        dto.accountType = "base";
        dto.postedCarCount = 0;
      } else if (role === "seller_premium") {
        dto.role = "seller";
        dto.accountType = "premium";
      } else dto.role = role;

      const user = await userRepository.register({
        ...dto,
        password: hashedPassword,
      });
      return user;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(dto: IUserCredentials): Promise<ITokensPair> {
    try {
      const user = await userRepository.getOneByParams({ email: dto.email }, [
        "password",
        "role",
        "userName",
        "accountType",
      ]);
      if (!user) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const isMatched = await passwordService.compare(
        dto.password,
        user.password,
      );
      if (!isMatched) {
        throw new ApiError("Invalid credentials provided", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        userId: user._id.toString(),
        userName: user.userName,
        role: user.role,
        accountType: user.accountType,
      });

      await tokenRepository.create({
        ...tokensPair,
        _userId: user._id,
      });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokensPair> {
    try {
      const tokensPair = tokenService.generateTokenPair({
        userId: payload.userId,
        role: payload.role,
        userName: payload.userName,
        accountType: payload.accountType,
      });

      await Promise.all([
        await tokenRepository.create({
          ...tokensPair,
          _userId: new ObjectId(payload.userId),
        }),
        await tokenRepository.deleteOne({ refreshToken }),
      ]);

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  private async isEmailUniq(email: string): Promise<void> {
    const user = await userRepository.getOneByParams({ email });
    if (user) {
      throw new ApiError("The user with this email already exist", 409);
    }
  }
}

export const authService = new AuthService();
