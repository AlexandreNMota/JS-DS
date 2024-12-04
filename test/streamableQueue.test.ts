import { StreamableQueue } from "../src";

describe('StreamableQueue', () => {
    let queue: StreamableQueue<number>;

    beforeEach(() => {
        queue = new StreamableQueue<number>();
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
    });

    it('should create a readable stream and read elements', (done) => {
        const readableStream = queue.createReadableStream();

        const results: string[] = [];

        readableStream.on('data', (chunk) => {
            results.push(chunk as string);
        });

        readableStream.on('end', () => {
            expect(results).toEqual(['1', '2', '3']);
            done();
        });
    });

    it('should indicate no more data when queue is empty', (done) => {
        const emptyQueue = new StreamableQueue<number>();
        const readableStream = emptyQueue.createReadableStream();

        readableStream.on('data', () => {
            throw new Error('Data event should not be emitted');
        });

        readableStream.on('end', () => {
            expect(true).toBe(true);
            done();
        });
    });
});