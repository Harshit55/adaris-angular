export interface Maindata{
  questions:Array<Questions>;
}

export interface Questions {
  qID:number;
  question:string;
  options:Array<Options>;
}
export interface Options {
  oID:number;
  option:string;
};
