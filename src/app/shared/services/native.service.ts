import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom, of, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NativeMessageType } from '../interfaces/NativeMessageType';


@Injectable({
    providedIn: 'root'
})

export class NativeService {

    private isServiceLoaded = false
    private resourceName = ""

    constructor(private httpClient: HttpClient) {}

    public firstMethod: Subject<number> = new Subject<number>()
    private secondMethod: number = 0

    SetupNativeService() {
        if (!this.isServiceLoaded) {
            window.addEventListener('message', this.handleNativeEvent.bind(this))
            window.addEventListener('keyup', this.handleKeyboardEvent.bind(this))

            console.log('[Boilerplate] ==> The UI has been loaded.');
            this.isServiceLoaded = true
        }
    }

    ////
    addOne = () => this.secondMethod += 1
    removeOne = () => this.secondMethod -= 1
    setSecondMethod = (num: number) => this.secondMethod = num 
    getSecondMethod = () => this.secondMethod
    ////

    ///// Network Handler
    FetchData = async <T>(action: string, data: any, emulatedData?: any): Promise<Awaited<T> & { error: any; }> => await lastValueFrom(this.httpClient.post(`https://${this.resourceName}/` + action, JSON.stringify(data)).pipe(catchError(error => of((emulatedData) ? emulatedData : {error: "Server not response..."})))).finally(() => {setTimeout(() => {
        return (emulatedData) ? emulatedData : {error: "Server not response..."}
    }, 10000);})

    private async handleKeyboardEvent(event: KeyboardEvent) {
        /// EXAMPLE event.key
        if (event.key === "Escape") {
            // Do something
            // If you want 'close UI' just go to '/' route.
            // ex: router.navigate('/) 
        }
    }

    private handleNativeEvent(event: MessageEvent<any>) {
        console.log("MSG: ", event?.data?.action, event?.data);

        var eventMessage = event?.data;

        if (eventMessage.action !== undefined) {
            switch (eventMessage.action) {
                case NativeMessageType.SET_RESOURCE_NAME:
                    this.resourceName = eventMessage.data.resourceName;
                    break;
                case NativeMessageType.TEST_FIRST_METHOD:
                    this.firstMethod.next(eventMessage.data.number)
                    break;
                case NativeMessageType.TEST_SECOND_METHOD:
                    this.setSecondMethod(eventMessage.data.number)
                    break;
                default:
                    console.log(`Event is invalid or event handler is missing for event message: ${event.data.message}`);
            }
        }
    }
}