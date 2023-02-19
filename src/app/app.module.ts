import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppButtonComponent } from './app-button/app-button.component';
import { AppSwitchComponent } from './app-switch/app-switch.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { SectionComponent } from './section/section.component';
import { FormsModule } from '@angular/forms';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ServiceWorkerModule } from '@angular/service-worker';

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
  imports: [BrowserModule, FormsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
