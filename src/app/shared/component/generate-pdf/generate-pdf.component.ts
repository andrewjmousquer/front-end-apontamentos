import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { jsPDF } from "jspdf";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { AppComponent } from "src/app/app.component";
import { AppointmentModel } from "../../model/appointment.Model";

import { TaskUserModel } from "../../model/taskUser.model";
import { PrinterService } from "../../service/print-server.service";

@Component({
  selector: "app-generate-pdf",
  templateUrl: "./generate-pdf.component.html",
  styleUrls: ["./generate-pdf.component.css"],
})
export class GeneratePdfComponent implements OnInit {
  hasLogoutOnAction: boolean;

  taskByUser: TaskUserModel = new TaskUserModel();
  task: AppointmentModel = new AppointmentModel();
  screen: string;

  currentDate: Date = new Date();
  dateFinish: Date;

  @ViewChild("proof", { static: false }) el!: ElementRef;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private app: AppComponent,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.screen = this.config.data.screen;
    this.hasLogoutOnAction = this.config.data.action;

    if (this.screen == "appointment") this.task = this.config.data.taskByUser;
    else this.taskByUser = this.config.data.taskByUser;
  }

  ngAfterViewInit() {
    this.generatePDF();
    this.printRecive();
  }
  printRecive() {
    const body = {
      title: "CARBON APONTAMENTOS",
      footer: "Carbon Blindados",
      emissionDate: true,
      sign: true,
      fields: [
        {
          title: "OS",
          value:
            this.taskByUser.task?.serviceOrder?.number != "" &&
            this.taskByUser.task?.serviceOrder?.number != null
              ? this.taskByUser.task?.serviceOrder?.number
              : this.task.numberOS,
        },
        {
          title: "MODELO",
          value:
            this.taskByUser.task?.serviceOrder?.model != "" &&
            this.taskByUser.task?.serviceOrder?.model != null
              ? this.taskByUser.task?.serviceOrder?.model
              : this.task.model,
        },
        {
          title: "PRESTADOR",
          value:
            this.taskByUser.name != "" && this.taskByUser.name != null
              ? this.taskByUser.name
              : this.task.userName,
        },
        {
          title: "ETAPA",
          value:
            this.taskByUser.task?.stage?.name != "" &&
            this.taskByUser.task?.stage?.name != null
              ? this.taskByUser.task?.stage?.name
              : this.task.stageName,
        },
        {
          title: "INICIO",
          value: this.taskByUser.dateStart,
        },
        {
          title: "FIM",
          value: this.taskByUser.dateFinish,
        },
      ],
    };
    this.printerService.print(body).subscribe(
      (teste) => {
        console.log("Arquivo impresso!");
      },
      (err) => {
        console.log("Ocorreu um erro na impressão!");
      }
    );
  }

  generatePDF() {
    let pdf = new jsPDF("portrait", "px", [306, 306], true);
    pdf.setFontSize(1);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.output("dataurlnewwindow");
        if (this.hasLogoutOnAction) {
          this.ref.close();
          this.app.logout();
        } else {
          this.ref.close();
        }
      },
    });
  }
}
