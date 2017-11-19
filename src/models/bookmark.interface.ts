import { TransitData } from './transitdata.interface';
export interface Bookmark{
    name:string;
    comment?:string;
    data:TransitData;
}