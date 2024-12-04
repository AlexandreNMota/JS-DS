import { Queue } from "../queue";
import { Readable } from 'stream';

export class StreamableQueue<T> extends Queue<T>{
    /**
     * Cria um stream legível a partir da fila.
     */
    createReadableStream(): Readable {
        const queueInstance = this;

        const readable = new Readable({
            read() {
                if (queueInstance.isEmpty()) {
                    this.push(null); // Indica que não há mais dados
                } else {
                    const item = queueInstance.dequeue();
                    if (item !== undefined) {
                        this.push(item?.toString()); // Converte o item para string
                    }
                }
            },
            objectMode: true
        });

        return readable;
    }
}