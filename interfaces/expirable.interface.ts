export interface IExpirable {
  getExpiryDate(): Date;
  isExpired(currentDate?: Date): boolean;
}
