import { Readable } from 'stream';
import { Stack } from '../stack';

export class StreamableStack<T> extends Stack<T> {
    /**
     * Cria um stream legível a partir da pilha.
     */
    createReadableStream(): Readable {
        const stackInstance = this;

        const readable = new Readable({
            read() {
                if (stackInstance.isEmpty()) {
                    this.push(null); // Indica que não há mais dados
                } else {
                    const item = stackInstance.pop();
                    if (item !== undefined) {
                        this.push(item?.toString()); // Converte o item para string
                    }
                }
            },
            objectMode: true // Habilita o modo de objeto para permitir qualquer tipo de dado
        });

        return readable;
    }
}