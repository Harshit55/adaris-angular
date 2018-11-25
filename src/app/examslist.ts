export interface Examslist{
    exams:Array<Exams>;
  }
  
  export interface Exams {
    type:string;
    sub_exams:Array<Exam>;
  }
  export interface Exam {
    qp_id:string;
    time:string;
    description:string;
  };
  