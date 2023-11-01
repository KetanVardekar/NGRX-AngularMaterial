export interface Associate {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  address: string;
  group: string;
  status: boolean;
}
export interface AssociateModel {
  list: Associate[];
  associateobj: Associate;
  errormessage: string;
}
