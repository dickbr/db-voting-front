import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionController } from '@api/controllers/session.controller';
import { CreateSessionComponent } from './create-session/create-session.component';
import { UserService } from '@api/services/user.service';


interface SessionData {
 id: string;
 title: string;
 description: string;
 start_date: string; // Assuming the dates are strings in the format you provided
 end_date: string;
 category: string;
 created_at: string;
 updated_at: string;
 deleted_at: string | null;
 session_time: string;
}

@Component({
  selector: 'session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'Listar Sessoes';

  public dataSource = new MatTableDataSource<SessionData>([]);

  public displayedColumns: string[] = ['title', 'description', 'category', 'session_time', 'actions'];

  public isLoadingResults = false;

  constructor(
      private sessionController: SessionController,
      public snackBar: MatSnackBar,
      readonly dialog: MatDialog,
  ) { }

  ngOnInit(){
    this.isLoadingResults = true;
    this.updateList();
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.dataSource.sort = this.sort;
    }
  }

  updateList(){
      this.sessionController.list().subscribe({
        next: value => {
          if (Array.isArray(value) && value.length) {
            const cleanedValue = value.map(item => ({
            ...item,
            start_date: undefined, // Ou qualquer outra valor padrão que você deseja definir
          }));
            this.dataSource = new MatTableDataSource<SessionData>(cleanedValue);
          } else {
            this.dataSource = new MatTableDataSource<SessionData>([]);
          }
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.isLoadingResults = false;
        },
        error: err => {
          console.log('obs error', err)
          this.isLoadingResults = false;
          this.notify('Oops! Something went wrong');
        }
      });
  }

  deleteStorage(storageId: string){
    this.isLoadingResults = true;
    let deleted$ = this.sessionController.delete(storageId);
    deleted$.subscribe({
      next: value => {
        this.updateList();
        this.isLoadingResults = false;
        this.notify('Storage successfully deleted!');
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  openCreateDialog() {
    const ref = this.dialog.open(CreateSessionComponent, {
      disableClose: true,
      height: '400px',
      width: '600px',
    });
    ref.afterClosed().subscribe(response => {
      if (response === 'success') {
        this.updateList();
        this.notify('Storage successfully created!');
      } else if(response === 'error') {
        this.notify('Oops! Something went wrong');
      } else if(response) {
        this.notify('🔔 ' + response,'',4000);
      }
    });
  }

  private notify(message: string, action: string = '', duration: number = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}


