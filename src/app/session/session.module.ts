import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentToolbarModule} from "@apps/shared/content-toolbar/content-toolbar.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { SessionComponent } from './session.component';
import { CreateSessionComponent } from './create-session/create-session.component';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { SessionRoutingModule } from './session-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TopicComponent } from './topic-session/topic.component';
import { TopicChooseModule } from '@apps/shared/topic-choose-component/topic-choose.module';


@NgModule({
  declarations: [
    SessionComponent,
    CreateSessionComponent,
    EditSessionComponent,
    TopicComponent
  ],
    imports: [
        CommonModule,
        SessionRoutingModule,
        ContentToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        TopicChooseModule
    ],
  bootstrap: [SessionComponent]
})
export class SessionModule { }

