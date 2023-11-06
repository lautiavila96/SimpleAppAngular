import { Component } from '@angular/core';
import { SimpleObjectService } from './simple-object.service';


export interface SimpleObject {
  id: number; // Agrega la propiedad 'id' si existe
  name: string;
  
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  isSearching: boolean = false;


  simpleObjects: SimpleObject[] = []; 
  newObjectName: string = ''; // Input field to enter the name of the new object
  searchName: string = '';
  filteredSimpleObjects: SimpleObject[] = []; // Variable para almacenar registros filtrados


  constructor(private simpleObjectService: SimpleObjectService) {}

  ngOnInit() {
    this.listSimpleObjects();
  }

  createSimpleObject() {
    this.simpleObjectService.createSimpleObject(this.newObjectName).subscribe(() => {
      this.listSimpleObjects();
      this.newObjectName = ''; // Clear the input field
    });
  }

  findByName() {
    this.isSearching = true; // Indica que se está realizando una búsqueda
    if (this.searchName) {
      this.simpleObjectService.findSimpleObjectsByName(this.searchName).subscribe(
        (data: SimpleObject[]) => {
          this.filteredSimpleObjects = data;
          // Process the response data here
          this.isSearching = false; // La búsqueda se ha completado
        },
        (error) => {
          console.error('Error al buscar objetos por nombre', error);
          this.isSearching = false; // La búsqueda se ha completado (incluso en caso de error)
        }
      );
    } else {
      // Si el campo de búsqueda está vacío, muestra todos los objetos nuevamente
      this.filteredSimpleObjects = this.simpleObjects;
      this.isSearching = false; // La búsqueda se ha completado
    }
  }
  
  listSimpleObjects() {
    this.simpleObjectService.listAllSimpleObjects().subscribe(
      (data: SimpleObject[]) => {
        this.simpleObjects = data.map((object, index) => ({
          ...object, // Mantén todas las propiedades existentes en el objeto original
          id: index + 1, // Agrega un id único
        }));
        this.filteredSimpleObjects = this.simpleObjects;
      },
      (error) => {
        console.error('Error al obtener los objetos simples', error);
      }
    );
  }
  
  
  


  deleteSimpleObject(id: number) {
    this.simpleObjectService.deleteSimpleObject(id).subscribe(
      () => {
        this.listSimpleObjects();
      },
      (error) => {
        console.error('Error al eliminar el objeto simple', error);
      }
    );
  }
  clearSearch() {
    this.filteredSimpleObjects = this.simpleObjects;
  }



}
