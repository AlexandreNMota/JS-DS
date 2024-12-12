import { IBaseLinkedList } from "../../../@types";
import { Node } from "../node";

export abstract class BaseLinkedList<T> implements IBaseLinkedList<T> {

    protected head: Node<T> | null = null;
    protected size: number = 0;

    abstract add(value: T): void;

    removeFirst(): T | null {
        if (!this.head) return null;
        const removedValue = this.head.value;
        this.head = this.head.next;
        this.size--;
        return removedValue;
    }

    addLast(value: T): void {
        const newNode = new Node(value);
        if (this.isEmpty()) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current && current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    removeLast(): T | null {
        if (this.isEmpty()) return null;

        if (this.head?.next === null) {
            const removedValue = this.head.value;
            this.head = null;
            this.size--;
            return removedValue;
        }

        let current = this.head;
        while (current.next && current.next.next) {
            current = current.next;
        }
        const removedValue = current.next.value;
        current.next = null; // Remove o último nó
        this.size--;
        return removedValue;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.size) {
            throw new Error("Índice fora dos limites.");
        }
        const newNode = new Node(value);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let current = this.head;
            for (let i = 0; i < index - 1; i++) {
                current = current!.next; // Garantir que current não é null
            }
            newNode.next = current!.next; // Conectar o novo nó ao próximo
            current!.next = newNode; // Conectar o nó anterior ao novo nó
        }
        this.size++;
    }

    removeAt(index: number): T | null {
        if (index < 0 || index >= this.size) {
            throw new Error("Índice fora dos limites.");
        }
        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current!.next; // Garantir que current não é null
        }

        const removedValue = current!.next!.value; // Valor a ser removido
        current!.next = current!.next!.next; // Desconectar o nó removido
        this.size--;

        return removedValue;
    }

    clear(): void {
        this.head = null;
        this.size = 0;
    }

    getSize(): number {
        return this.size;
    }

    display(): void {
        let current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    isEmpty(): boolean {
        return this.size === 0;
    }

    indexOf(value: T): number {
        let index = 0;
        let current = this.head;

        while (current) {
            if (current.value === value) {
                return index;
            }
            index++;
            current = current.next;
        }

        return -1; // Retorna -1 se não encontrado
    }

    [Symbol.iterator](): Iterator<T> {
        let current = this.head; // Começa no primeiro nó

        return {
            next(): IteratorResult<T> {
                if (current) {
                    const value = current.value;
                    current = current.next;
                    return { value, done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
}
