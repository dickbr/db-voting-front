import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";
import {map} from "rxjs/operators";
import {catchError, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VoteController extends ApiService {
    constructor(
    ) {
        super(`votes`)
    }

    create(body: {}) {
        return this.ajaxApi('POST', { body })
            .pipe(
                map(data => data.response),
                catchError(error => {
                    return of(error);
                })
            );
    }
}
