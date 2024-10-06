// La interfaz de "implementación" declara métodos comunes a todas las clases concretas de implementación.
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

// La "abstracción" define la interfaz para la parte de "control".
class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}

// Se puede extender clases de la jerarquía de abstracción independientemente de las clases de dispositivo.
class AdvancedRemoteControl extends RemoteControl {
  mute(): void {
    this.device.setVolume(0);
  }
}

// Todos los dispositivos siguen la misma interfaz.
class Tv implements Device {
  private enabled: boolean = false;
  private volume: number = 50;
  private channel: number = 1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
    console.log("TV encendida");
  }

  disable(): void {
    this.enabled = false;
    console.log("TV apagada");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent)); // El volumen está entre 0 y 100
    console.log(`TV volumen ajustado a ${this.volume}`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`TV canal ajustado a ${this.channel}`);
  }
}

class Radio implements Device {
  private enabled: boolean = false;
  private volume: number = 30;
  private channel: number = 88.1;

  isEnabled(): boolean {
    return this.enabled;
  }

  enable(): void {
    this.enabled = true;
    console.log("Radio encendida");
  }

  disable(): void {
    this.enabled = false;
    console.log("Radio apagada");
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`Radio volumen ajustado a ${this.volume}`);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
    console.log(`Radio frecuencia ajustada a ${this.channel}`);
  }
}

// Código cliente
const tv = new Tv();
const remote = new RemoteControl(tv);
remote.togglePower(); // Enciende la TV
remote.volumeUp(); // Sube el volumen

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.togglePower(); // Enciende la radio
advancedRemote.mute(); // Silencia la radio
