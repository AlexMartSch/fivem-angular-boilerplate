import { Component } from '@angular/core';
import { NativeService } from 'src/app/shared/services/native.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  public firstMethod: number = 0
  public secondMethod: number = 0

  constructor(private nativeService: NativeService){
    nativeService.firstMethod.subscribe((data) => this.firstMethod = data)
    this.secondMethod = nativeService.getSecondMethod()
  }

  add(){
    this.nativeService.firstMethod.next(this.firstMethod+1)
    this.secondMethod += 1
  } 
  
  less(){
    this.nativeService.firstMethod.next(this.firstMethod-1)
    this.secondMethod -= 1
  }

  async sendToClient(){
    /// Just send to client without errors
    const response = await this.nativeService.FetchData<number>("sendMethodsToClient", { firstMethod: this.firstMethod, secondMethod: this.secondMethod })

    if(response.error){
      console.log("Server error!");
    }else{
      console.log(response);
    }

    /// Execute FetchData with Emulated Response Data
    const response2 = await this.nativeService.FetchData<{playerId: number}>("exampleRequest", { data: 'test' }, {
      playerId: 1,
    })

    console.log(response2, response2.error);
    
    /// Execute FetchData without emulated data to trigger error
    const response3 = await this.nativeService.FetchData<any>("exampleRequest", {data: 'test'})
    if(response3.error){
      console.log("Response error");
    }

    /// Execute FetchData with custom server error
    const response4 = await this.nativeService.FetchData<any>("exampleRequest", {error: 'test'})
    if(response4.error){
      console.log("Response error: ", response4.error);
    }
  }
  
}
