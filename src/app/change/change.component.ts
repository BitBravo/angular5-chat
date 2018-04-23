import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';


import { ChatService } from './../chat.service';
import { HttpService } from './../http.service';

@Component({
	selector: 'app-login',
  	templateUrl: './change.component.html',
  	styleUrls: ['./change.component.css'],
  	providers : [ChatService,HttpService]
})
export class ChangeComponent {

    private userid:string = null;
    private password:string = null;
    private confirmpassword:string = null;
      
  	constructor(
        private chatService : ChatService,
  		private router :Router
  	) {	}

    ngOnInit() {
        this.userid = localStorage.getItem('userid');
    }
	

  	public changePassword():void{
        console.log(this.password,this.confirmpassword)
        if(this.password === '' || this.confirmpassword === null) {
            alert(`Password can't be empty.`);
        }else if(this.password === this.confirmpassword ){
            this.chatService.changePassword({
                  'userid' : this.userid,
                  'password' : this.password,
            },(error , result)=>{console.log(result)
                if(error) {
                    alert(result);
                }else{
                    if(!result.error) {
                        this.router.navigate(['/']);
                    }else{
                        alert(`Invalid Credentials`);
                    }
                }
            });
        }else{
            alert("Password doesn't mathch")
        }
  	}
}