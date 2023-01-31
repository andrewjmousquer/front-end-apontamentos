import { LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import * as _ from "lodash";

import localePt from "@angular/common/locales/pt";
registerLocaleData(localePt, 'pt');

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './shared/service/authentication.service';
import { AuthGuard } from './core/auth.guard';
import { ErrorInterceptor } from './core/error.interceptor';
import { JwtInterceptor } from './core/jwt.interceptor';
import { LoaderInterceptor } from './core/loader.interceptor';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxUploaderDirectiveModule } from 'ngx-uploader-directive';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { QRCodeModule } from 'angularx-qrcode';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { BadgeModule } from 'primeng/badge';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import {ImageModule} from 'primeng/image';

import { AboutComponent } from './portal/template/about/about.component';
import { AccessListFormComponent } from './portal/form/access-list-form/access-list-form.component';
import { AppComponent } from './app.component';
import { CheckpointFormComponent } from './portal/form/checkpoint-form/checkpoint-form.component'
import { ClassifierFormComponent } from './portal/form/classifier-form/classifier-form.component';
import { ContactComponent } from './shared/component/contact/contact.component';
import { FieldComponent } from './shared/component/field/field.component';
import { ErrorComponent } from './portal/template/error/error.component';
import { FooterComponent } from './portal/template/footer/footer.component';
import { HeaderComponent } from './portal/template/header/header.component';
import { HoldingFormComponent } from './portal/form/holding-form/holding-form.component'
import { InputComponent } from './shared/component/input/input.component';
import { LoginComponent } from './portal/template/login/login.component';
import { LogoutComponent } from './portal/template/logout/logout.component';
import { MenuComponent } from './portal/template/menu/menu.component';
import { MenuitemComponent } from './portal/template/menu/menuitem.component';
import { MenuFormComponent } from './portal/form/menu-form/menu-form.component';
import { ParameterFormComponent } from './portal/form/parameter-form/parameter-form.component';
import { ReportComponent } from './portal/template/report/report.component';
import { SettingsFormComponent } from './portal/form/settings-form/settings-form.component';
import { UserFormComponent } from './portal/form/user-form/user-form.component';

import { CepDirectiveDirective } from './shared/directive/cep-mask.directive';
import { CnpjMaskDirective } from './shared/directive/cnpj-mask.directive';
import { PhoneMaskDirective } from './shared/directive/phone-mask.directive';
import { DateMaskDirective } from './shared/directive/date-mask.directive';

import { MenuItemService } from './portal/template/menu/menu.service';
import { MenuService } from './shared/service/menu.service';
import { CnpjPipe } from './shared/pipe/cnpj.pipe';
import { CpfPipe } from './shared/pipe/cpf.pipe';
import { CepPipe } from './shared/pipe/cep.pipe';
import { PhonePipe } from './shared/pipe/phone.pipe';
import { TimeFormatPipe } from './shared/pipe/time-format.pipe';
import { HomeComponent } from './portal/template/home/home.component';
import { ChecklistPageComponent } from "./page/checklist-form/checklist-page.component";
import { ChecklistPageListComponent } from "./page/checklist-form/list/checklist-list.component";
import { ChecklistItemComponent } from "./page/checklist-form/item/checklist-item.component";
import { ChecklistItemGroupComponent } from "./page/checklist-form/item/group/checklist-item-group.component";
import { ChecklistItemQuestionComponent } from "./page/checklist-form/item/question/checklist-item-question.component";
import { StageFormComponent } from "./page/stage-form/stage-form.component";
import { StageMovementComponent } from "./shared/component/step-movements/stage-movements.component";
import { TeamFormComponent } from "./page/team-form/team-form.component";
import { AppointmentFormComponent } from './page/appointment-form/appointment-form.component';
import { OSViewFormComponent } from "./page/os-view-form/os-view-form.component";
import { OSDetailFormComponent } from "./page/os-detail-form/os-detail-form.component";
import { SpecialServiceModalFormComponent } from "./page/os-detail-form/special-service-modal-form/special-service-modal-form.component";
import { AddPersonModalFormComponent } from "./page/os-detail-form/add-people-modal-form/add-person-modal-form.component";
import { StageDetailModalFormComponent } from "./page/os-detail-form/stage-detail-modal-form/stage-detail-modal-form.component";
import { ChooseMovimentModalFormComponent } from "./page/os-detail-form/choose-moviment-modal-form/choose-moviment-modal-form.component";
import { ConsultOSFormComponent } from './page/consult-os-form/consult-os-form.component';
import { ConsultOsFormModalComponent } from './page/consult-os-form/consult-os-form-modal/consult-os-form-modal.component';
import { FillChecklistFormComponent } from './page/fill-checklist-form/fill-checklist-form.component';
import { ChecklistCommentComponent } from './page/fill-checklist-form/checklist-comment/checklist-comment.component';
import { CommentViewComponent } from './page/fill-checklist-form/comment-view/comment-view.component';
import { GeneratePdfComponent } from './shared/component/generate-pdf/generate-pdf.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CheckboxModule,
    ChipsModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    FullCalendarModule,
    GalleriaModule,
    InplaceModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    ScrollPanelModule,
    SelectButtonModule,
    SlideMenuModule,
    SliderModule,
    SpinnerModule,
    SplitButtonModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    DividerModule,
    ChipModule,
    BadgeModule,
    QRCodeModule,
    NgxSpinnerModule,
    NgxUploaderDirectiveModule,
    ImageModule
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    MenuitemComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccessListFormComponent,
    CheckpointFormComponent,
    ParameterFormComponent,
    UserFormComponent,
    MenuFormComponent,
    HoldingFormComponent,
    ContactComponent,
    FieldComponent,
    InputComponent,
    CnpjPipe,
    CpfPipe,
    CepPipe,
    PhonePipe,
    TimeFormatPipe,
    PhoneMaskDirective,
    CnpjMaskDirective,
    CepDirectiveDirective,
    DateMaskDirective,
    SettingsFormComponent,
    AboutComponent,
    ReportComponent,
    ClassifierFormComponent,
    StageFormComponent,
    StageMovementComponent,
    TeamFormComponent,
    ChecklistPageComponent,
    ChecklistPageListComponent,
    ChecklistItemComponent,
    ChecklistItemGroupComponent,
    ChecklistItemQuestionComponent,
    AppointmentFormComponent,
    OSViewFormComponent,
    OSDetailFormComponent,
    SpecialServiceModalFormComponent,
    AddPersonModalFormComponent,
    StageDetailModalFormComponent,
    ChooseMovimentModalFormComponent,
    ConsultOSFormComponent,
    ConsultOsFormModalComponent,
    FillChecklistFormComponent,
    ChecklistCommentComponent,
    CommentViewComponent,
    GeneratePdfComponent
  ],
  entryComponents: [AppComponent, AboutComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthenticationService,
    AuthGuard,
    MenuService,
    MenuItemService,
    DialogService,
    ConfirmationService,
    DatePipe
  ],
  exports: [
    PhoneMaskDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
