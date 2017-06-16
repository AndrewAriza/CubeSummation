import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  input: string;
  output: string;
  error: string;

  main(input: string): void {
    try {
      this.output = '';
      this.error = '';
      if(!input) throw new Error('El input esta vacío!');
      let inputLines: Array<string> = input.split('\n');
      if(!parseInt(inputLines[0])) throw new Error('Favor indicar la cantidad de segementos');
      let line: number = 0;
      let segments: number = parseInt(inputLines[line++]);

      if(inputLines.length < segments) throw new Error('El número de líneas no es la indicada!');

      for (let segment: number = 0; segment < segments; segment++) {
        if(!inputLines[line]) throw new Error('Faltaron instrucciones!');
        let instructions: Array<number> = inputLines[line++].split(' ').map(Number).filter(Boolean);
        let length: number = instructions[0];
        let operations: number = instructions[1];

        let grid: number[][][] = this.createCube(length);
        for (let operacion: number = 0; operacion < operations; operacion++) {
          let operacion: string = inputLines[line++];
          this.execute(operacion, grid);
        }
      }
    } catch (e) {
      this.output = '';
      this.error = e;
    }
  }

  createCube(length: number): number[][][] {
    let cube: number[][][] = [];
    for (let x: number = 0; x < length; x++) {
      cube[x] = [];
      for (let y: number = 0; y < length; y++) {
        cube[x][y] = [];
        for (let z: number = 0; z < length; z++) {
          cube[x][y][z] = 0;
        }
      }
    }
    return cube;
  }

  execute(line: string, cube: number[][][]): void {
    if(!line) throw new Error('Faltaron instrucciones!');
    let operations: string[] = line.split(' ');
    let type: string = operations[0];
    if (type === 'UPDATE') {
      this.update(operations, cube);
    } else if (type === 'QUERY') {
      this.query(operations, cube);
    } else {
      throw new Error('Tipo de operación inválido');
    }
  }

  update(values: string[], cube: number[][][]): void {
    cube[parseInt(values[1]) - 1][parseInt(values[2]) - 1][parseInt(values[3]) - 1] = parseInt(values[4]);
  }

  query(values, cube): void {
    let suma: number = 0
    for (let x: number = parseInt(values[1]) - 1; x <= parseInt(values[4]) - 1; x++) {
      for (let y: number = parseInt(values[2]) - 1; y <= parseInt(values[5]) - 1; y++) {
        for (let z: number = parseInt(values[3]) - 1; z <= parseInt(values[6]) - 1; z++) {
          suma += cube[x][y][z];
        }
      }
    }
    this.output += suma + '\n'
  }
}
