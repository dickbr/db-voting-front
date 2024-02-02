import {Injectable} from '@angular/core';
import {ApiService} from "@api/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class ClientController extends ApiService {
    constructor(
    ) {
        super(`clients`)
    }
}
