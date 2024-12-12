export interface IBaseLinkedList<T> {
    add(value: T): void;
    removeFirst(): T | null;
    addLast(value: T): void; // Método para adicionar ao final
    removeLast(): T | null; // Método para remover do final
    insertAt(index: number, value: T): void; // Método para inserir em uma posição específica
    removeAt(index: number): T | null; // Método para remover de uma posição específica
    clear(): void; // Método para limpar a lista
    getSize(): number; // Método para obter o tamanho da lista
    display(): void; // Método para exibir os elementos da lista
    isEmpty(): boolean; // Método para verificar se a lista está vazia
    indexOf(value: T): number; // Método para buscar um valor na lista
}
