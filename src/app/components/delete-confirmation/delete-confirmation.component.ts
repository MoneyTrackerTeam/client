import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {

  constructor(private modalServive: NgbModal) { }

  open(content) {
    this.modalServive.open(content).result.then((res) => {
      console.log('opened');
    });
  }
}
