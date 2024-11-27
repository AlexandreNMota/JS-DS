import { Queue } from '../src';

describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
        queue = new Queue<number>([], (element): element is number => typeof element === 'number');
    });

    test("deve iniciar vazia", () => {
        expect(queue.isEmpty()).toBe(true);
    });

    test("deve adicionar elementos", () => {
        queue.enqueue(1);
        expect(queue.isEmpty()).toBe(false);
        expect(queue.size()).toBe(1);
        expect(queue.front()).toBe(1);
    });

    test("deve remover elementos", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        const dequeued = queue.dequeue();
        expect(dequeued).toBe(1);
        expect(queue.size()).toBe(1);
    });

    test("deve retornar o primeiro elemento sem removê-lo", () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.front()).toBe(1);
        expect(queue.size()).toBe(2);
    });
    
    test('deve retornar undefined ao remover de uma fila vazia', () => {
        const dequeued = queue.dequeue();
        expect(dequeued).toBeUndefined();
    });

    test('deve retornar os itens corretamente', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.getItems()).toEqual([1, 2]);
    });

    test('deve limpar todos os elementos da fila', () => {
        queue.enqueue(1);
        queue.clear();
        expect(queue.isEmpty()).toBe(true);
    });

    test('deve retornar a representação em string corretamente', () => {
        queue.enqueue(1);
        queue.enqueue(2);
        expect(queue.toString()).toBe('1, 2');
    });

    test('deve lançar erro ao adicionar tipos inválidos', () => {
       expect(() => queue.enqueue("string" as any)).toThrow(/Tipo inválido/); 
       expect(() => queue.enqueue({ key: "value" } as any)).toThrow(/Tipo inválido/); 
       expect(() => queue.enqueue(null as any)).toThrow(/Tipo inválido/); 
       expect(() => queue.enqueue(undefined as any)).toThrow(/Tipo inválido/);
   });
   
   test('deve retornar undefined ao chamar front() em uma fila vazia', () => {
      const frontItem = queue.front();
      expect(frontItem).toBeUndefined();
  });
  test('deve preencher a fila a partir de um array válido', () => {
    queue.fromArray([3, 4, 5]);
    expect(queue.getItems()).toEqual([3, 4, 5]);
});

test('deve lançar erro ao adicionar tipos inválidos com fromArray', () => {
    expect(() => queue.fromArray([1, "string" as any])).toThrow(/Tipo inválido ao adicionar elementos do array/); // Espera um erro
    expect(() => queue.fromArray([1, { key: "value" } as any])).toThrow(/Tipo inválido ao adicionar elementos do array/); // Espera um erro
    expect(() => queue.fromArray([1, null as any])).toThrow(/Tipo inválido ao adicionar elementos do array/); // Espera um erro
    expect(() => queue.fromArray([1, undefined as any])).toThrow(/Tipo inválido ao adicionar elementos do array/); // Espera um erro
});

test('deve lançar erro ao inicializar com tipos inválidos', () => {
    expect(() => new Queue<number>(["string" as any])).toThrow(/Tipo inválido na inicialização/); // Espera um erro
    expect(() => new Queue<number>([{ key: "value" }as any])).toThrow(/Tipo inválido na inicialização/); // Espera um erro
    expect(() => new Queue<number>([null as any] )).toThrow(/Tipo inválido na inicialização/); // Espera um erro
    expect(() => new Queue<number>([undefined as any])).toThrow(/Tipo inválido na inicialização/); // Espera um erro
});
});

// Testes para Queue de objetos

describe('Queue com objetos Person', () => {
    interface Person {
        id: number;
        name: string;
    }

    let personQueue: Queue<Person>;

    beforeEach(() => {
        personQueue = new Queue<Person>([], (element): element is Person =>
            typeof element === 'object' && 
            element !== null && 
            'id' in element && 
            'name' in element
        );
    });

    test("deve iniciar vazia", () => {
        expect(personQueue.isEmpty()).toBe(true);
    });

    test("deve adicionar pessoas", () => {
        const person = { id: 1, name: "Alice" };
        personQueue.enqueue(person);
        
        expect(personQueue.isEmpty()).toBe(false);
        expect(personQueue.size()).toBe(1);
        expect(personQueue.front()).toEqual(person);
    });

    test("deve remover pessoas", () => {
        const person1 = { id: 1, name: "Alice" };
        const person2 = { id: 2, name: "Bob" };
        
        personQueue.enqueue(person1);
        personQueue.enqueue(person2);

        const dequeued = personQueue.dequeue();
        
        expect(dequeued).toEqual(person1);
        expect(personQueue.size()).toBe(1);
    });

    test("deve retornar a primeira pessoa sem removê-la", () => {
        const person1 = { id: 1, name: "Alice" };
        const person2 = { id: 2, name: "Bob" };

        personQueue.enqueue(person1);
        personQueue.enqueue(person2);

        expect(personQueue.front()).toEqual(person1);
        expect(personQueue.size()).toBe(2);
    });
    
    test('deve retornar undefined ao remover de uma fila vazia', () => {
        const dequeued = personQueue.dequeue();
        expect(dequeued).toBeUndefined();
    });

   test('deve lançar erro ao adicionar tipos inválidos', () => {
       expect(() => personQueue.enqueue("string" as any)).toThrow(/Tipo inválido/); 
       expect(() => personQueue.enqueue({ key: "value" } as any)).toThrow(/Tipo inválido/); 
       expect(() => personQueue.enqueue(null as any)).toThrow(/Tipo inválido/); 
       expect(() => personQueue.enqueue(undefined as any)).toThrow(/Tipo inválido/);
   });
   
   test('deve preencher a fila a partir de um array válido', () => {
       const people = [
           { id: 3, name: "Charlie" },
           { id: 4, name: "Diana" }
       ];
       
       personQueue.fromArray(people);
       
       expect(personQueue.getItems()).toEqual(people);
   });

   test('deve lançar erro ao adicionar tipos inválidos com fromArray', () => {
       const invalidPeople = [
           { id: 5, name: "Eve" },
           "invalid string" as any
       ];
       
       expect(() => personQueue.fromArray(invalidPeople)).toThrow(/Tipo inválido ao adicionar elementos do array/); // Espera um erro
   });
});