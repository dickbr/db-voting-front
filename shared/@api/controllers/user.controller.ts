import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class UserController extends ApiService {
    constructor(
    ) {
        super(`users`)
    }
}
