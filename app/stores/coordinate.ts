import { create } from "zustand";

type TCoordinateStore = {
  latitude: number;
  longitude: number;
  update: (latitude: number, longitude: number) => void;
};

const coordinateStore = create<TCoordinateStore>((set) => ({
  latitude: 0,
  longitude: 0,
  update: (latitude: number, longitude: number) =>
    set(() => ({ latitude, longitude })),
}));

export default coordinateStore;
