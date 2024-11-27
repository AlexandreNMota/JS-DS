// streamableStack.test.ts

import { StreamableStack } from "../src";


describe('StreamableStack', () => {
    let stack: StreamableStack<number>;

    beforeEach(() => {
        stack = new StreamableStack<number>([1, 2, 3]);
    });

    test('should create a readable stream and read elements', (done) => {
        const readableStream = stack.createReadableStream();

        const results: number[] = [];

        readableStream.on('data', (chunk) => {
            results.push(chunk as number);
        });

        readableStream.on('end', () => {
            expect(results).toEqual([3, 2, 1]); // Verifica se os elementos foram lidos na ordem correta
            done(); // Indica que o teste terminou
        });
    });

    test('should indicate no more data when stack is empty', (done) => {
        const emptyStack = new StreamableStack<number>([]);
        const readableStream = emptyStack.createReadableStream();

        readableStream.on('data', () => {
            // Não deve ser chamado
            throw new Error('Data event should not be emitted');
        });

        readableStream.on('end', () => {
            expect(true).toBe(true); // O teste deve passar se não houver dados
            done();
        });
    });
});