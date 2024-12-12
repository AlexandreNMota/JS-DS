import { Node } from "../../../../modules/linked-list";

export interface INode<T>{
    value: T;
    next: Node<T> | null;
}