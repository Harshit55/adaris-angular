export interface Mainresult{
    qpID:string,
    sections:Array<Sectionset>;
  }

export interface Sectionset{
    answers:Array<Answerset>
}
export interface Answerset{
    qID:number,
    oID:number;
} 