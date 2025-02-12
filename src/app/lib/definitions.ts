export type ModuleForm = {
  _id: string;
  module_name: string;
  module_code: string;
  description?: string;
  icon: string;
  base_price: number;
  status: 'active' | 'inactive';
};
