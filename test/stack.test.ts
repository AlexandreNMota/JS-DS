import { Stack } from '../src';

describe('Stack', () => {
    let stack: Stack<number>;

    beforeEach(() => {
        stack = new Stack<number>();
    });

    test('deve iniciar vazia', () => {
        expect(stack.isEmpty()).toBe(true);
    });

    test('deve adicionar elementos', () => {
        stack.push(1);
        expect(stack.isEmpty()).toBe(false);
        expect(stack.size()).toBe(1);
        expect(stack.peek()).toBe(1);
    });

    test('deve remover elementos', () => {
        stack.push(1);
        stack.push(2);
        const popped = stack.pop();
        expect(popped).toBe(2);
        expect(stack.size()).toBe(1);
    });

    test('deve retornar o último elemento sem removê-lo', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.peek()).toBe(2);
        expect(stack.size()).toBe(2);
    });

    test('deve retornar undefined ao remover de uma pilha vazia', () => {
        const popped = stack.pop();
        expect(popped).toBeUndefined();
    });

    test('deve retornar os itens corretamente', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.getItems()).toEqual([1, 2]);
    });

    test('deve preencher a pilha a partir de um array', () => {
        stack.fromArray([3, 4, 5]);
        expect(stack.getItems()).toEqual([3, 4, 5]);

        expect(() => stack.fromArray([6, "string" as any])).toThrow(/Tipo inválido ao adicionar elementos do array/);
    });

    test('deve limpar todos os elementos da pilha', () => {
        stack.push(1);
        stack.clear();
        expect(stack.isEmpty()).toBe(true);
    });

    test('deve retornar a representação em string corretamente', () => {
       stack.push(1);
       stack.push(2);
       expect(stack.toString()).toBe('1, 2');
    });

    test('deve verificar se um elemento está presente na pilha', () => {
        stack.push(1);
        stack.push(2);
        expect(stack.contains(1)).toBe(true);
        expect(stack.contains(3)).toBe(false);
    });

   
    test('deve lançar erro ao adicionar tipos inválidos com push', () => {
       expect(() => stack.push("string" as any)).toThrow(/Tipo inválido/); 
       expect(() => stack.push({ key: "value" } as any)).toThrow(/Tipo inválido/); 
       expect(() => stack.push(null as any)).toThrow(/Tipo inválido/); 
       expect(() => stack.push(undefined as any)).toThrow(/Tipo inválido/); 
    });
   
    test('deve lançar erro ao inicializar com tipos inválidos', () => {
       expect(() => new Stack<number>(["string"] as any)).toThrow(/Tipo inválido na inicialização/); 
       expect(() => new Stack<number>([{ key: "value" }] as any)).toThrow(/Tipo inválido na inicialização/); 
       expect(() => new Stack<number>([null] as any)).toThrow(/Tipo inválido na inicialização/); 
       expect(() => new Stack<number>([undefined] as any)).toThrow(/Tipo inválido na inicialização/); 
    });

    test('deve ordenar a pilha em ordem crescente', () => {
        stack.push(3);
        stack.push(1);
        stack.push(2);

        stack.sort(true);
        expect(stack.getItems()).toEqual([1, 2, 3]);
    });
    test('deve ordenar a pilha em ordem decrescente', () => {
        stack.push(3);
        stack.push(1);
        stack.push(2);
        
        stack.sort(false); // Ordena em ordem decrescente
        
        expect(stack.getItems()).toEqual([3, 2, 1]);
    });
    test('deve migrar elementos para Set e remover duplicatas', () => {
        stack.push(1);
        stack.push(2);
        stack.push(2); // Duplicata
        stack.push(3);
        
        stack.migrateToSet(); // Remove duplicatas
        
        expect(stack.getItems()).toEqual([1, 2, 3]); // A ordem pode variar dependendo da implementação
    });
    test('deve manter a estrutura de pilha após migração', () => {
        stack.push(1);
        stack.push(2);
        stack.push(2);
        stack.push(3);

        stack.migrateToSet();

        expect(stack.size()).toBe(3);
        expect(stack.contains(1)).toBe(true);
        expect(stack.contains(2)).toBe(true);
        expect(stack.contains(3)).toBe(true);
    });

    test('deve inverter os elementos da pilha', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        
        stack.reverse();
        
        expect(stack.getItems()).toEqual([3, 2, 1]);
    });

    test('deve retornar um array com os elementos da pilha', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
        
        const array = stack.toArray();
        
        expect(array).toEqual([1, 2, 3]);
        expect(array).not.toBe(stack.getItems());
    });

    test('deve retornar uma cópia da pilha atual', () => {
        stack.push(1);
        stack.push(2);
        
        const copiedStack = stack.copy();
        
        expect(copiedStack.getItems()).toEqual([1, 2]);
        expect(copiedStack).not.toBe(stack);
        expect(copiedStack.isEmpty()).toBe(false);
    });

    test('deve permitir a iteração sobre os elementos da pilha', () => {
        stack.push(1);
        stack.push(2);
        stack.push(3);
    
        const items: number[] = [];
    
        for (const item of stack) {
            items.push(item);
        }
    
        expect(items).toEqual([3, 2, 1]); // A ordem deve ser LIFO
    });

    test("avaliar comportamento de iteração sobre pilha vazia", ()=>{
        let item_teste : number | undefined;
        for (const item of stack) {
            item_teste = item;
        }
        expect(item_teste).toEqual(undefined);
    });
});