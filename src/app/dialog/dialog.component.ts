import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
projectForm !: FormGroup
btnAction :string ='save'
Title:String='ADD Project'
  constructor(private formBuilder:FormBuilder,private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public EditData : any,
    private dialogref:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      Name :['',Validators.required],
      Description :['',Validators.required],
      Dure :['',Validators.required],
      Status :['',Validators.required],
      client :['',Validators.required],
      admin :['',Validators.required],
      Employe :['',Validators.required],
      chef :['',Validators.required],
    });
    if(this.EditData){
      this.btnAction='update'
      this.Title='Update Project'
      this.projectForm.controls['Name'].setValue(this.EditData.Name);
      this.projectForm.controls['Description'].setValue(this.EditData.Description);
      this.projectForm.controls['Dure'].setValue(this.EditData.Dure);
      this.projectForm.controls['Status'].setValue(this.EditData.Status);
      this.projectForm.controls['client'].setValue(this.EditData.client);
      this.projectForm.controls['admin'].setValue(this.EditData.admin);
      this.projectForm.controls['Employe'].setValue(this.EditData.Employe);
      this.projectForm.controls['chef'].setValue(this.EditData.chef);
    }
  }

  addProject(){
  if(!this.EditData){
    if(this.projectForm.valid){
      this.api.postProject(this.projectForm.value)
      .subscribe({
        next:(res)=>{
          alert("prodduct added succes");
          this.projectForm.reset();
          this.dialogref.close('save')
        },
        error:()=>{
          alert("probleme");
        }
      })

    }
  }else{
      this.edit();
  }
   
    
  
  }
  edit(){
      this.api.putProject(this.projectForm.valid,this.EditData.id)
      .subscribe({
        next:(res)=>{
          alert("Project Update")
          this.projectForm.reset();
          this.dialogref.close('update')

        },
        error:()=>{
          alert("error")
        }
      })
  }


 
  

}
