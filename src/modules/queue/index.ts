import { IQueue } from "../../@types";
/**
 * Classe que representa uma fila genérica.
 * 
 * Métodos Públicos:
 * - enqueue(element: T): void
 * - dequeue(): T | undefined
 * - front(): T | undefined
 * - isEmpty(): boolean
 * - size(): number
 * - clear(): void
 * - getItems(): T[]
 * - toString(): string
 * - fromArray(elements: T[]): void
 *
 * @template T - O tipo dos elementos na fila.
 */
export class Queue<T> implements IQueue<T> {

    private items: T[];
    private typeCheck: (element: any) => element is T;
    
/**
 * Cria uma nova instância da fila.
 * @param initialItems - Itens iniciais a serem adicionados à fila.
 * @param typeCheck - Função para verificar o tipo dos elementos.
 * @throws {Error} Lança um erro se algum item inicial não corresponder ao tipo esperado.
 */
    constructor(initialItems?: T[], typeCheck?: (element: any) => element is T) {
        this.items = initialItems ? [...initialItems] : [];
        this.typeCheck = typeCheck || ((element): element is T => typeof element === "number");

        // Validação dos itens iniciais
        for (const item of this.items) {
            if (!this.typeCheck(item)) {
                throw new Error(`Tipo inválido na inicialização: esperado um item do tipo ${typeof item}, mas recebeu ${typeof item}`);
            }
        }
    }

/**
 * Adiciona um elemento à fila.
 * @param element - O elemento a ser adicionado à fila.
 * @throws {Error} Lança um erro se o elemento não corresponder ao tipo esperado.
 */
    enqueue(element: T): void {
        if (!this.typeCheck(element)) {
            throw new Error(`Tipo inválido: esperado um item do tipo ${typeof this.items[0]}, mas recebeu ${typeof element}`);
        }
        this.items.push(element);
    }

/**
 * Remove e retorna o primeiro elemento da fila.
 * @returns O primeiro elemento da fila ou undefined se a fila estiver vazia.
 */
    dequeue(): T | undefined {
        return this.items.shift();
    }

/**
 * Retorna o primeiro elemento da fila sem removê-lo.
 * @returns O primeiro elemento da fila ou undefined se a fila estiver vazia.
 */
    front(): T | undefined {
        return this.items[0];
    }

/**
 * Verifica se a fila está vazia.
 * @returns true se a fila estiver vazia, caso contrário, false.
 */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

/**
 * Retorna o número de elementos na fila.
 * @returns O número de elementos na fila.
 */
    size(): number {
        return this.items.length;
    }

/**
 * Limpa todos os elementos da fila.
 */
    clear(): void {
        this.items = [];
    }

/**
 * Retorna uma cópia dos itens na fila.
 * @returns Um array contendo os itens da fila.
 */
    getItems(): T[] {
        return [...this.items];
    }

/**
 * Retorna uma representação em string dos itens da fila.
 * @returns Uma string representando os itens da fila, separados por vírgulas.
 */
    toString(): string {
        return this.items.join(', ');
    }


/**
 * Preenche a fila com os elementos de um array.
 * @param elements - Um array de elementos a serem adicionados à fila.
 * @throws {Error} Lança um erro se algum elemento do array não corresponder ao tipo esperado.
 */
    fromArray(elements: T[]): void {
        for (const element of elements) {
            if (!this.typeCheck(element)) {
                throw new Error(`Tipo inválido ao adicionar elementos do array: esperado um item do tipo ${typeof this.items[0]}, mas recebeu ${typeof element}`);
            }
        }
        this.items.push(...elements);
    }
}