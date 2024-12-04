import { Queue } from "../../../modules";

export interface IQueue<T>{
    enqueue(element: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    getItems(): T[];
    toString(): string;
    fromArray(elements: T[]): void;
    contains(element: T): boolean;
    sort(ascending: boolean): void;
    migrateToSet(): void;
    reverse(): void;
    toArray(): T[];
    copy(): Queue<T>;
}