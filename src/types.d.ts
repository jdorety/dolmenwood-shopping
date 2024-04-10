declare interface GameItem {
  name: string;
  weight: number;
  description?: string;
  cost?: number;
}

declare interface Container extends GameItem {
  capacity: string;
}
