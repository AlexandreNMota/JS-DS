import { IStack } from "../../@types";
/**
 * Classe que representa uma pilha genérica.
 * 
 * Métodos Públicos:
 * - push(element: T): void
 * - pop(): T | undefined
 * - peek(): T | undefined
 * - isEmpty(): boolean
 * - getItems(): T[]
 * - fromArray(elements: T[]): void
 * - clear(): void
 * - size(): number
 * - toString(): string
 * - contains(element: T): boolean
 * - sort(ascending: boolean): void
 * - migrateToSet(): void
 * - reverse(): void
 * - toArray(): T[]
 * - copy(): Stack<T>
 *
 * @template T - O tipo dos elementos na pilha.
 */
export class Stack<T> implements IStack<T> {
    private items: T[];
    private typeCheck: (element: any) => element is T;
/**
 * Cria uma nova instância da pilha.
 * @param initialItems - Itens iniciais a serem adicionados à pilha.
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
 * Adiciona um elemento à pilha.
 * @param element - O elemento a ser adicionado à pilha.
 * @throws {Error} Lança um erro se o elemento não corresponder ao tipo esperado.
*/
    push(element: T): void {
        if (!this.typeCheck(element)) {
            throw new Error(`Tipo inválido: esperado um item do tipo ${typeof this.items[0]}, mas recebeu ${typeof element}`);
        }
        this.items.push(element);
    }
/**
 * Remove e retorna o último elemento da pilha.
 * @returns O último elemento da pilha ou undefined se a pilha estiver vazia.
 */
    pop(): T | undefined {
        return this.items.pop();
    }
/**
 * Retorna o último elemento da pilha sem removê-lo.
 * @returns O último elemento da pilha ou undefined se a pilha estiver vazia.
 */
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }
/**
 * Verifica se a pilha está vazia.
 * @returns true se a pilha estiver vazia, caso contrário, false.
 */
    isEmpty(): boolean {
        return this.items.length === 0;
    }
/**
 * Retorna uma cópia dos itens na pilha.
 * @returns Um array contendo os itens da pilha.
 */
    getItems(): T[] {
        return [...this.items];
    }
/**
 * Preenche a pilha com os elementos de um array.
 * @param elements - Um array de elementos a serem adicionados à pilha.
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
/**
 * Limpa todos os elementos da pilha.
 */
    clear(): void {
        this.items = [];
    }
/**
 * Retorna o número de elementos na pilha.
 * @returns O número de elementos na pilha.
 */
    size(): number {
        return this.items.length;
    }
/**
 * Retorna uma representação em string dos itens da pilha.
 * @returns Uma string representando os itens da pilha, separados por vírgulas.
 */
    toString(): string {
        return this.items.join(', ');
    }
/**
 * Verifica se um determinado elemento está presente na pilha.
 * @param element - O elemento a ser verificado na pilha.
 * @returns true se o elemento estiver presente, caso contrário, false.
 */
    contains(element: T): boolean {
        return this.items.includes(element);
    }

/**
 * Ordena os elementos da pilha em ordem crescente ou decrescente.
 * @param ascending - Se true, ordena em ordem crescente; se false, em ordem decrescente.
 */
    sort(ascending: boolean = true): void {
        this.items.sort((a, b) => {
            if (a < b) return ascending ? -1 : 1;
            if (a > b) return ascending ? 1 : -1;
            return 0;
        });
    }

/**
 * Converte a estrutura base da pilha para um Set, removendo duplicatas e mantendo a estrutura de pilha.
 */
    public migrateToSet(): void {
        const uniqueItems = new Set(this.items);
        this.clear(); 
        this.fromArray(Array.from(uniqueItems));
    }

/**
 * Efetua a inversão dos elementos da pilha
 */
    public reverse(): void {
        this.items.reverse();
    }
/**
 * Retorna um array com os elementos da pilha
 */
    public toArray(): T[] {
        return [...this.items];
    }

/**
 * Retorna um cópia da pilha atual
 */
    public copy(): Stack<T> {
        return new Stack<T>(this.getItems(), this.typeCheck);
    }

/**
 * Permite a iteração sobre os elementos da pilha.
 */
    [Symbol.iterator](): Iterator<T> {
        let index = this.items.length;
        return {
            next: (): IteratorResult<T> => {
                if (index > 0) {
                    index--;
                    return { value: this.items[index], done: false };
                }else{
                    return { done: true, value: undefined };
                }
            }
        }
    }
}