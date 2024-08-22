import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../service/task.service';
import { Task } from '../../interface/task.constant';
interface Priority {
  name: string;
}
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [MessageService]
})
export class TaskListComponent {
  customers: any;
  editTaskPopup: boolean = false;
  taskInfoPopup: boolean = false;
  addTaskPopup: boolean = false;

  TaskForm!: FormGroup;
  priorityOptions: Priority[] = [];
  gender: string = '';
  selectedtaskInfo: any;
  selectedtaskedit: any;
  taskInfo: any;
  SelectedId: any;
  selectedFiles: string = ''
  displayConfirmation: boolean = false;
  completeTask: boolean = false
  deleteId: any;
  tempData: any;
  minDate: string;


  constructor(private fb: FormBuilder, private messageService: MessageService, private cd: ChangeDetectorRef, private service: TaskService) {
   
    this.TaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],

    });
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.priorityOptions = [
      { name: 'Select Priority' },
      { name: 'High' },
      { name: 'Medium' },
      { name: 'Low' },
    ];
  }
  onSubmit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task Updated Successfully' })
    this.TaskForm.reset();
    this.editTaskPopup = false;
  }
  setForm(taskInfo: Task) {
    this.SelectedId = taskInfo.id;
    this.selectedtaskedit = taskInfo;
    const selectedDate = new Date(taskInfo.dueDate);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const priorityValue = this.priorityOptions.find(option => option.name === this.selectedtaskedit.priority)?.name || 'Select Priority';
    this.TaskForm.patchValue({
      title: this.selectedtaskedit.title,
      description: this.selectedtaskedit.description,
      dueDate: formattedDate,
      priority: priorityValue
    });
    this.editTaskPopup = true;
  }


  editForm() {
    let formValue = this.TaskForm.value;
    this.service.editTask(formValue, this.SelectedId).subscribe((res) => {
      this.gettaskdata();
    })
  }
  closeDialog() {
    this.addTaskPopup=false
    this.editTaskPopup = false;
    this.TaskForm.reset()
  }
  closeDialog2() {
    this.addTaskPopup = false;
    this.TaskForm.reset()
  }
  submitForm() {
    const taskData = {
      title: this.TaskForm.get('title')?.value,
      description: this.TaskForm.get('description')?.value,
      dueDate: this.TaskForm.get('dueDate')?.value,
      priority: this.TaskForm.get('priority')?.value
    };
    this.service.addTask(taskData).subscribe((res) => {
      this.addTaskPopup = false;
      this.gettaskdata();
      this.TaskForm.reset();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task Created Successfully' });
    });
  }

  onFileChange(event: any) {
    this.selectedFiles = event.target.files[0]
  }
  addNewtask() {
    this.addTaskPopup = true
  }
  gettaskdata() {
    this.service.getTaskList().subscribe((res) => {
      this.taskInfo = res.reverse();
    })
  }
  onCloseInfo() {
    this.taskInfoPopup = false
  }
  showConfirmation(task: any) {
    this.deleteId = task.id
    this.displayConfirmation = true;
  }
  hideConfirmation() {
    this.displayConfirmation = false;
    this.completeTask = false
  }
  deleteItem() {
    this.service.deleteTask(this.deleteId).subscribe((res) => {
      this.messageService.add({ severity: 'success', summary: 'Delete', detail: 'Task Deleted Successfully' });
      this.gettaskdata();
    })
    this.hideConfirmation();
  }
  ngOnInit() {
    this.gettaskdata();
  }


}
