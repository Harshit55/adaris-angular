export interface Mainresult{
    qpID:string,
    answers:Array<Answerset>;
  }

export interface Answerset{
    qID:number;
    oID:number;
}
  