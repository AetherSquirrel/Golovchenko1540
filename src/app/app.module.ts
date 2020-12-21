import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipePipe } from './shared/pipes/pipe.pipe';
import { SortpipePipe } from './shared/pipes/sortpipe.pipe';
import { MainpageComponent } from './shared/ui/mainpage/mainpage/mainpage.component';
import { HeaderComponent } from './shared/ui/header/header/header.component';
import { StudentlistComponent } from './shared/ui/studentlist/studentlist/studentlist.component';
import { StudentaddComponent } from './shared/ui/studentadd/studentadd/studentadd.component';
import { StudentsComponent } from './shared/ui/students/students/students.component';
import { ReactiveFormsModule, FormControlDirective,FormGroupDirective, FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    PipePipe,
    SortpipePipe,
    MainpageComponent,
    HeaderComponent,
    StudentlistComponent,
    StudentaddComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpClientModule,
    FormsModule        
  ],
  providers: [FormControlDirective,FormGroupDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
