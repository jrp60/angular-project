// @ts-check

import { MapasService } from ".././mapas.service";
import { Marcador } from "../../interfaces/marcador.interface";

describe("MapasService", () => {
  let service: MapasService;

  beforeEach(() => {
    localStorage.clear(); // reset before each test
    service = new MapasService();
  });

  it("should create the service", () => {
    expect(service).toBeTruthy();
  });

  it("should insert a new marcador", () => {
    const marcador: Marcador = {
      position: { lat: 1, lng: 2 },
      options: { titulo: "Test Marker", draggable: true },
    };

    const initialLength = service.marcadores.length;
    service.insertarMarcador(marcador);
    expect(service.marcadores.length).toBe(initialLength + 1);
    expect(service.marcadores.at(-1)).toEqual(marcador);
  });

  it("should delete a marcador", () => {
    const initialLength = service.marcadores.length;
    service.borrarMarcador(0);
    expect(service.marcadores.length).toBe(initialLength - 1);
  });

  it("should save and load marcadores from localStorage", () => {
    const marcador: Marcador = {
      position: { lat: 1, lng: 2 },
      options: { titulo: "Saved Marker", draggable: true },
    };

    service.insertarMarcador(marcador);

    const savedData = localStorage.getItem("marcadores");
    expect(savedData).toBeTruthy();

    const newService = new MapasService();
    newService.cargarMarcadores();

    expect(newService.marcadores.length).toBeGreaterThan(0);
  });
});
