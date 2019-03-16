export interface Maindata{
  sections:Array<Sections>;
  parentQuestions:Array<object>;
}
export interface Sections{
  section_name:string;
  questions:Array<Questions>;
}
export interface Questions {
  pQID:number;
  qID:number;
  question:string;
  options:Array<Options>;
}
export interface Options {
  oID:number;
  option:string;
};
