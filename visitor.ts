// La interfaz Shape declara un método `accept` que toma la interfaz Visitor base como argumento.
interface Shape {
  move(x: number, y: number): void;
  draw(): void;
  accept(v: Visitor): void;
}

// Cada clase de elemento concreto debe implementar el método `accept` de tal manera que invoque el método del visitante correspondiente a la clase.
class Dot implements Shape {
  move(x: number, y: number): void {
    console.log(`Moving Dot to (${x}, ${y})`);
  }

  draw(): void {
    console.log("Drawing a Dot");
  }

  accept(v: Visitor): void {
    v.visitDot(this);
  }
}

class Circle implements Shape {
  move(x: number, y: number): void {
    console.log(`Moving Circle to (${x}, ${y})`);
  }

  draw(): void {
    console.log("Drawing a Circle");
  }

  accept(v: Visitor): void {
    v.visitCircle(this);
  }
}

class Rectangle implements Shape {
  move(x: number, y: number): void {
    console.log(`Moving Rectangle to (${x}, ${y})`);
  }

  draw(): void {
    console.log("Drawing a Rectangle");
  }

  accept(v: Visitor): void {
    v.visitRectangle(this);
  }
}

class CompoundShape implements Shape {
  private shapes: Shape[] = [];

  add(shape: Shape): void {
    this.shapes.push(shape);
  }

  move(x: number, y: number): void {
    console.log(`Moving CompoundShape to (${x}, ${y})`);
    this.shapes.forEach((shape) => shape.move(x, y));
  }

  draw(): void {
    console.log("Drawing a CompoundShape");
    this.shapes.forEach((shape) => shape.draw());
  }

  accept(v: Visitor): void {
    v.visitCompoundShape(this);
  }

  getShapes(): Shape[] {
    return this.shapes;
  }
}

// La interfaz Visitor declara un grupo de métodos de visita que se corresponden con clases de elemento.
interface Visitor {
  visitDot(d: Dot): void;
  visitCircle(c: Circle): void;
  visitRectangle(r: Rectangle): void;
  visitCompoundShape(cs: CompoundShape): void;
}

// Los visitantes concretos implementan varias versiones del mismo algoritmo.
class XMLExportVisitor implements Visitor {
  visitDot(d: Dot): void {
    console.log("Exporting Dot to XML.");
  }

  visitCircle(c: Circle): void {
    console.log("Exporting Circle to XML.");
  }

  visitRectangle(r: Rectangle): void {
    console.log("Exporting Rectangle to XML.");
  }

  visitCompoundShape(cs: CompoundShape): void {
    console.log("Exporting CompoundShape to XML.");
    cs.getShapes().forEach((shape) => shape.accept(this));
  }
}

// El código cliente puede ejecutar operaciones del visitante sobre cualquier grupo de elementos.
class Application {
  private allShapes: Shape[] = [];

  addShape(shape: Shape): void {
    this.allShapes.push(shape);
  }

  export(): void {
    const exportVisitor = new XMLExportVisitor();
    this.allShapes.forEach((shape) => shape.accept(exportVisitor));
  }
}

// Código cliente
const app = new Application();
const dot = new Dot();
const circle = new Circle();
const rectangle = new Rectangle();
const compoundShape = new CompoundShape();

compoundShape.add(dot);
compoundShape.add(circle);

app.addShape(dot);
app.addShape(circle);
app.addShape(rectangle);
app.addShape(compoundShape);

app.export();
