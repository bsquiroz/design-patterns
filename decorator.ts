// Clase principal (componente base)
class Hotel {
  protected costo: number;
  protected descripcion: string;

  constructor(costo: number, descripcion: string) {
    this.costo = costo;
    this.descripcion = descripcion;
  }

  calcularCosto(): number {
    return this.costo;
  }

  getDescripcion(): string {
    return this.descripcion;
  }
}

// Interfaz del Decorador
abstract class Alquilable extends Hotel {
  protected hotel: Hotel;

  constructor(hotel: Hotel) {
    super(hotel.calcularCosto(), hotel.getDescripcion());
    this.hotel = hotel;
  }

  abstract calcularCosto(): number;
  abstract getDescripcion(): string;
}

// Decorador concreto: PrimeraLineaPlaya
class PrimeraLineaPlaya extends Alquilable {
  constructor(hotel: Hotel) {
    super(hotel);
  }

  calcularCosto(): number {
    return this.hotel.calcularCosto() + 50; // Incrementa el costo base en 50
  }

  getDescripcion(): string {
    return `${this.hotel.getDescripcion()} con vista a la playa`;
  }
}

// Decorador concreto: Doble
class Doble extends Alquilable {
  constructor(hotel: Hotel) {
    super(hotel);
  }

  calcularCosto(): number {
    return this.hotel.calcularCosto() + 30; // Incrementa el costo base en 30
  }

  getDescripcion(): string {
    return `${this.hotel.getDescripcion()} habitación doble`;
  }
}

// Decorador concreto: VIP
class VIP extends Alquilable {
  constructor(hotel: Hotel) {
    super(hotel);
  }

  calcularCosto(): number {
    return this.hotel.calcularCosto() + 100; // Incrementa el costo base en 100
  }

  getDescripcion(): string {
    return `${this.hotel.getDescripcion()} habitación VIP`;
  }
}

// Ejecución de código
const hotelBase = new Hotel(200, "Habitación básica");
console.log(
  `Descripción: ${hotelBase.getDescripcion()}, Costo: ${hotelBase.calcularCosto()}`
);

const hotelPlaya = new PrimeraLineaPlaya(hotelBase);
console.log(
  `Descripción: ${hotelPlaya.getDescripcion()}, Costo: ${hotelPlaya.calcularCosto()}`
);

const hotelDoble = new Doble(hotelPlaya);
console.log(
  `Descripción: ${hotelDoble.getDescripcion()}, Costo: ${hotelDoble.calcularCosto()}`
);

const hotelVip = new VIP(hotelDoble);
console.log(
  `Descripción: ${hotelVip.getDescripcion()}, Costo: ${hotelVip.calcularCosto()}`
);
