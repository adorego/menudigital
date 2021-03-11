
export enum selectionType {
    multiple,
    single
}
export interface WizardPage{
    component?:any;
    titulo:string;
    options?:[number, string][];
    selection?: selectionType
    currentPage?:number
}