import { NgModule } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import { TopicChooseComponent } from './topic-choose.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [TopicChooseComponent ],
    imports: [
      MatDialogModule,
      MatIconModule,
      MatFormFieldModule,
      FormsModule,
      ReactiveFormsModule,
      MatInputModule
     ],
    exports: [TopicChooseComponent],
  bootstrap: [TopicChooseComponent]
})
export class TopicChooseModule { }

