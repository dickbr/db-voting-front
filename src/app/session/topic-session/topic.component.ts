import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TopicController } from '@api/controllers/topic.controller';
import { TopicChooseComponent } from '@apps/shared/topic-choose-component/topic-choose.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@api/services/user.service';

interface TopicData {
 id: string;
 title: string;
 description: string;
 created_at: string;
 updated_at: string;
 deleted_at: string | null;
 session: SessionData;
}

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
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  sessionId: string;
  userId: string | null;
  topicId: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  title = 'Listar Pautas';

  public dataSource = new MatTableDataSource<TopicData>([]);

  public displayedColumns: string[] = ['title', 'description', 'actions'];

  public isLoadingResults = false;

  constructor(
      private topicController: TopicController,
      public snackBar: MatSnackBar,
      readonly dialog: MatDialog,
      private route: ActivatedRoute,
      private userService: UserService
  ) { }

  ngOnInit(){
    this.isLoadingResults = true;
    this.updateList();
    this.route.params.subscribe(params => {
      this.sessionId = params['session'];
      // Agora você pode usar this.sessionId para suas necessidades
    });
    this.userId = this.userService.getUserId();
    console.log(this.sessionId, 'u', this.userId)
  }

  sortChange(sortState: Sort) {
    if (sortState.direction) {
      this.dataSource.sort = this.sort;
    }
  }

  updateList(){
      this.topicController.list().subscribe({
        next: value => {
          if (Array.isArray(value) && value.length) {
            const cleanedValue = value.map(item => ({
            ...item,
            start_date: undefined, // Ou qualquer outra valor padrão que você deseja definir
          }));
            this.dataSource = new MatTableDataSource<TopicData>(cleanedValue);
          } else {
            this.dataSource = new MatTableDataSource<TopicData>([]);
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

  deleteTopic(topicId: string){
    this.isLoadingResults = true;
    let deleted$ = this.topicController.delete(topicId);
    deleted$.subscribe({
      next: value => {
        this.updateList();
        this.isLoadingResults = false;
        this.notify('Topic successfully deleted!');
      },
      error: err => {
        console.log('obs error', err)
      }
    });
  }

  openTopicChooseDialog(title:string,topic_id: string) {
    this.topicId = topic_id;
    const ref = this.dialog.open(TopicChooseComponent, {
      disableClose: true,
      height: '260px',
      width: '360px',
      data: {
        topicId:this.topicId,
        userId:this.userId,
        sessionId:this.sessionId,
        title
      }
    });
    ref.afterClosed().subscribe(response => {
      console.log('r', response);
      if (response === 'success') {
        this.updateList();
        this.notify('Voto registrado com sucesso!');
      } else if(response === 'error') {
        this.notify('🔔 Usuário já votou nessa pauta');
      } else if(response) {
        this.notify('🔔 ' + response,'',4000);
      }
    });
  }

  private notify(message: string, action: string = '', duration: number = 2000) {
    this.snackBar.open(message, action, { duration: duration });
  }
}


