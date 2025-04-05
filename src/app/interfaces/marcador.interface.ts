export interface Marcador {
  position: {
    lat: number;
    lng: number;
  };
  options: {
    draggable: boolean;
    titulo: string;
  };
  desc?: string;
}
