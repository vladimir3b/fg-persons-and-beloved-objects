import { IObject } from './object.interface';

export class BelovedObject implements IObject {

  /**
   * Properties
   */
  constructor(
    public id: string,
    public age: number,
    public color: string,
    public type: string,
    public about: string,
    public personId: string,
  ) {}

}
