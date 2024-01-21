import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated: boolean=true;
  public authenticatedUser: any;
  public token :string='';
  private users=[
    {username:"admin", password:"1234",roles:['USER','ADMIN']},
    {username:"user1", password:"1234",roles:['USER']},
    {username:"user2", password:"1234",roles:['USER']}
  ]

  constructor() { }

  login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username===username && u.password===password){
        user=u;
        this.token=btoa( JSON.stringify({username:u.username,roles:u.roles}));
      }
    })
    if(user){
      this.isAuthenticated=true;
      this.authenticatedUser=user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.authenticatedUser));
    }
    else{
      this.isAuthenticated=false;
    }
  }

  isAdmin(){
    if(this.authenticatedUser){
      return this.authenticatedUser.roles.indexOf("ADMIN")>-1;
    }
    else return false;
  }

  public saveAuthenticatedUse(){
    if(this.authenticatedUser){
      localStorage.setItem('authToken',this.token)
    }
  }

  public loadAuthenticatedUserFromLocalStorage(){
    
    let t=localStorage.getItem('authToken');
    if(t){
      let user = JSON.parse(atob(t));
      this.authenticatedUser={username:user.username,roles:user.roles};
      this.isAuthenticated=true;
      this.token=t;
    }
  }

  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.authenticatedUser=undefined;
  }
}
