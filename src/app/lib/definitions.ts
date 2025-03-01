export type ModuleField = {
  _id: string;
  module_name: string;
  module_code: string;
  description?: string;
  icon: string;
  base_price: number;
  status: 'active' | 'inactive';
};

export type MasterField = {
  _id: string;
  master_name: string;
  master_code: string;
  master_group: string;
  description?: string;
  web_icon: string;
  app_icon: string;
  color: string;
  status: 'active' | 'inactive';
};

export type GroupedMasterData = {
  BUSINESS_TYPE: MasterField[];
  BUSINESS_CATEGORY: MasterField[];
};

export type IState = {
  name: string;
  code: string;
};

export type ICountry = {
  _id: string;
  country: string;
  code: string;
  states: IState[];
  currency: { code: string; symbol: string };
};

export type ICurrency = {
  code: string;
  symbol: string;
};
