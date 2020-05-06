export class FormBuilderInterface {
    formControlName: string;
    label: string;
    validation: string;
    type: 'select' | 'textBox' | 'number' | 'radio' | 'date';
    options?: Array<string>;
    placeHolder?: string;
    radioButtons?: Array<string>;
}