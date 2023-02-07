import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor() { }

  states = [
    {name: 'A faire', value: 'todo', color: '#fc8607'},
    {name: 'Reporté', value: 'postponed', color: '#ffdc19'},
    {name: 'Fait', value: 'done', color: '#1A9662'},
    {name: 'annulé', value: 'canceled', color: '#ff4bba'},
  ];

  types = [
    {name: 'Post', value: 'post'},
    {name: 'Réel', value: 'real'},
    {name: 'Story', value: 'story'},
  ]

  getStates() {
    return this.states;
  }

  getTypes() {
    return this.types;
  }
}
