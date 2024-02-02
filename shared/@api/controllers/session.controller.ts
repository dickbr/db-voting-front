import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class SessionController extends ApiService {
    constructor(
    ) {
        super(`sessions`)
    }
}
