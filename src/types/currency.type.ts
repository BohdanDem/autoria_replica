export interface ICurrency {
  EUR_UAH_buy: string;
  EUR_UAH_sale: string;
  USD_UAH_buy: string;
  USD_UAH_sale: string;
}

export interface IPrice {
  UAH_Price: number;
  EUR_Price: number;
  USD_Price: number;
}

export interface ICarFullCost {
  exchangeCurrency: ICurrency;
  cost: Partial<IPrice>;
}
