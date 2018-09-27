import { Function } from './function';

export interface UserRole {
  id: number;
  name: string;
  description: string;
  locked: boolean;
  roleFunctions: UserRoleFunctions[];

}

export interface UserRoleFunctions {
  id: number;
  function: Function;
  canView: boolean;
  canCreate: boolean;
  canModify: boolean;
  canDelete: boolean;
}
