import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommitTransactionDto, CreateTransactionDto } from './dto/payment.dto';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'createTransaction' })
  async createTransaction(data: CreateTransactionDto) {
    try {
      const url: string =
        process.env.WEBPAY_URL + process.env.WEBPAY_ENDPOINT_CREATE_TRANSACTION;
      const response = await axios.post(url, data, {
        headers: {
          'Tbk-Api-Key-Id': process.env.WEBPAY_KEY_ID,
          'Tbk-Api-Key-Secret': process.env.WEBPAY_KEY_SECRET,
          'Content-Type': 'application/json',
        },
      });
      return {
        url: response.data.url + '?token_ws=' + response.data.token,
      };
    } catch (error) {
      return {
        data: error.response.data,
      };
    }
  }

  @MessagePattern({ cmd: 'commitTransaction' })
  async commitTransaction(data: CommitTransactionDto) {
    try {
      const url: string =
        process.env.WEBPAY_URL +
        process.env.WEBPAY_ENDPOINT_COMMIT_TRANSACTION +
        data.token;
      console.log(url);
      const response = await axios.put(
        url,
        {},
        {
          headers: {
            'Tbk-Api-Key-Id': process.env.WEBPAY_KEY_ID,
            'Tbk-Api-Key-Secret': process.env.WEBPAY_KEY_SECRET,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return {
        data: error.response.data,
      };
    }
  }
}
