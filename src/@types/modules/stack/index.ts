import { Stack } from "../../../modules";

export interface IStack<T> {
    push(element: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    isEmpty(): boolean;
    getItems(): T[];
    fromArray(elements: T[]):void;
    clear(): void;
    size(): number;
    toString(): string;
    contains(element: T): boolean;
    sort(ascending: boolean): void;
    reverse(): void;
    toArray(): T[];
    copy(): Stack<T>;
}