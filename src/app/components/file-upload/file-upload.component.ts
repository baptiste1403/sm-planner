import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileMetaData } from 'src/app/interfaces/fileMetaData';
import { FileWithPath } from 'src/app/interfaces/fileWithPath';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {

  onChange!: Function;
  files: FileMetaData[] | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileWithPath[]) {
    this.files = Array.from(event).map<FileMetaData>((f) => {
      return {
        path: f.path,
        name: f.name,
        type: f.type
      }
    });
    console.log(this.files);
    this.onChange(this.files);
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.files = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }

  getFilesName(): string {
    return this.files?.map(file => file.name).join(" ,") ?? "";
  }
}


