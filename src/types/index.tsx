export type TaskT = {
    id:string;
    title:string;
    description:string;
    priority:string;
    deadline:number;
    image?:string;
    alt?:string;
    tags:{title:string, bg:string, text:string}[];
};

export type Column={
  name:string;
  items:TaskT[]
}

export type Columns ={
    [key:string]:Column
}

export interface Tag {
  title: string;
  bg: string;   // Background color of the tag
  text: string; // Text color of the tag
}