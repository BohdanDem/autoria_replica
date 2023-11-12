export interface ICurrency {
  EUR_UAH_buy: string;
  EUR_UAH_sale: string;
  USD_UAH_buy: string;
  USD_UAH_sale: string;
}

export interface IPrice {
  UAH_Price?: string;
  EUR_Price?: string;
  USD_Price?: string;
}

export interface ICarFullCost {
  exchangeCurrency: ICurrency;
  cost: Partial<IPrice>;
}
