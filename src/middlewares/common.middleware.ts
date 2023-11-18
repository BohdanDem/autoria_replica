import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import mongoose from "mongoose";

import { EEmailAction } from "../enums/email.action.enum";
import { ApiError } from "../errors/api.error";
import { emailService } from "../services/email.service";
import { ICar } from "../types/car.type";

class CommonMiddleware {
  public isIdValid(id: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const Id = req.params[id];

        if (!mongoose.isObjectIdOrHexString(Id)) {
          throw new ApiError("Not valid ID", 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.body);

        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.body = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public isQueryValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error, value } = validator.validate(req.query);

        if (error) {
          throw new ApiError(error.message, 400);
        }

        req.query = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async checkCarPostBadWords(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const isBadWords: string[] = await commonMiddleware.getBadWords(req.body);
      if (isBadWords.length !== 0) {
        req.body.isActive = false;
        req.body.badWordsCheckCount = 0;
        res.locals.warning =
          "Bad words are present in the advertisement! Please change this one.";
      } else req.body.isActive = true;

      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkCarUpdateBadWords(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const car = req.res.locals as ICar;
      const id = car.id;

      if (car.badWordsCheckCount >= 3) {
        await emailService.sendMail(
          "bogdandemchuk.1@gmail.com",
          EEmailAction.BlockADVERT,
          { id },
        );

        throw new ApiError(
          "Access denied! You can not create the advert with bad words on autoria-replica platform",
          403,
        );
      }

      const isBadWords: string[] = await commonMiddleware.getBadWords(req.body);
      if (isBadWords.length !== 0) {
        req.body.isActive = false;
        req.body.badWordsCheckCount = car.badWordsCheckCount + 1;
        res.locals.warning =
          "Bad words are present in the advertisement! Please change this one.";
      } else req.body.isActive = true;

      next();
    } catch (e) {
      next(e);
    }
  }

  private async getBadWords(dto: Partial<ICar>): Promise<string[]> {
    const badWordsList = ["fuck", "bitch", "bastard", "asshole"];
    let isBadWords: string[] = [];

    const data = dto as Record<string, string | undefined | null>;
    for (const dataKey in data) {
      if (typeof data[dataKey] === "string") {
        const fieldArray = data[dataKey].split(" ");
        const hasBadWords = fieldArray.filter((element: string) =>
          badWordsList.includes(element),
        );
        isBadWords = [...isBadWords, ...hasBadWords];
      }
    }
    return isBadWords;
  }
}

export const commonMiddleware = new CommonMiddleware();
