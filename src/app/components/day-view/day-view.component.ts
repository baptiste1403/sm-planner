import { AfterContentChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsService } from 'src/app/services/forms.service';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent {
  
  @Input() day!: string;

  @Input() dataGetter?: any;

  @Input() posts?: any;

  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  constructor(private forms: FormsService) { }

  onPostClick(postName: any) {
    let post = this.posts.find((post: { name: any; }) => post.name === postName);
    this.onEdit.emit({
      date: post.date,
      name: post.name,
      state: post.state,
      type: post.type,
      description: post.description
    });
    console.log("post :",post);

  }

  getStateColor(post: any) {
    let state = this.forms.getStates().find((elem) => elem.value === post.state);
    return state?.color;
  }
}
