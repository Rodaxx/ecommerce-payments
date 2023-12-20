import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  buy_order: string;
  @IsNotEmpty()
  session_id: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  return_url: string;
}

export class CommitTransactionDto {
  @IsNotEmpty()
  token: string;
}
