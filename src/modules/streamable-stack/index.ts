import { Stack } from "../stack";
import { Readable } from 'stream';

export class StreamableStack<T> extends Stack<T> {
    /**
     * Cria um stream legível a partir da pilha.
     */
    createReadableStream(): Readable {
        const stackInstance = this; // Armazena a referência da instância

        const readable = new Readable({
            read() {
                if (stackInstance.isEmpty()) { // Usa a referência da pilha
                    this.push(null); // Indica que não há mais dados
                } else {
                    this.push((stackInstance.pop() as T).toString()); // Converte o número para string
                }
            }
        });

        return readable;
    }
}