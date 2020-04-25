export interface IToilet {
  _id: number;
  name: string;
  location: {
    type: string;
    coordinates: number[];
  };
  distance: number;
}
