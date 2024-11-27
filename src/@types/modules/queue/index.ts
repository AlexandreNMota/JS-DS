export interface IQueue<T>{
    enqueue(element: T): void;
    dequeue(): T | undefined;
    front(): T | undefined;
    isEmpty(): boolean;
    size(): number;
    clear(): void;
    getItems(): T[];
    toString(): string;
}