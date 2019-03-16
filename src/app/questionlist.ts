export interface Questionlist{
    categories:Array<Questioncategory>;
  }

  export interface Questioncategory{
    category_name:string,
    groups:Array<Questionsubcategory>;
  }

  export interface Questionsubcategory{
    group_name:string,
    group_exams:Array<Questioninfo>;
  }

  export interface Questioninfo{
    qp_id: string,
    time: string,
    tot_que: string;
    name: string;
  }