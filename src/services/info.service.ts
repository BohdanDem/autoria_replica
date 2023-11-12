import SMTPTransport from "nodemailer/lib/smtp-transport";

import { EEmailAction } from "../enums/email.action.enum";
import { emailService } from "./email.service";

class InfoService {
  public async post(brand: string): Promise<SMTPTransport.SentMessageInfo> {
    return await emailService.sendMail(
      "bogdandemchuk.1@gmail.com",
      EEmailAction.AddCAR,
      { brand },
    );
  }
}
export const infoService = new InfoService();
