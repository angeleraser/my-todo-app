import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppButtonComponent } from './app-button/app-button.component';
import { AppSwitchComponent } from './app-switch/app-switch.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { SectionComponent } from './section/section.component';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppButtonComponent,
    AppSwitchComponent,
    AddTodoFormComponent,
    SectionComponent,
    AddTodoComponent,
    TodoItemComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
