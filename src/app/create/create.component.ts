import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ApiserviceService } from "../apiservice.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.patchValue({
          city_name:res.data[0].city_name,
          city_country:res.data[0].city_country
        });
      });
    }
   
  }

  userForm = new FormGroup({
    'city_name': new FormControl('',Validators.required),
    'city_country': new FormControl('',Validators.required)
  });

  // Create new user
  userSubmit()
  {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });
    }
    else
    {
      this.errormsg = 'All field is required !';
    }
  }

  // User update
  userUpdate()
  {
    console.log(this.userForm.value, 'Infos updated!');

    if (this.userForm.valid) {
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
        console.log(res,'Resupdated!');
        this.successmsg = res.message;
      });
    }
    else
    {
      this.errormsg = 'All field is required!';
    }
  }
}
