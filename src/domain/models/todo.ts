import { ObjectId } from "mongodb";

export interface TodoRequestModel  {
    title: string;
    description: string;
    completed: boolean;
    parentId: ObjectId | string | null;
    userId: string;
}

export interface TodoResponseModel extends TodoRequestModel {
    _id: ObjectId;
} 

export interface TodoResponseModelSubTask extends TodoResponseModel {
    childrens: TodoResponseModel[]
} 