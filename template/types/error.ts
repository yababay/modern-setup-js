export default class RenderingError extends Error {

    #status: number

    constructor(message: string, status: number){
        super(message)
        this.#status = status
    }

    get status(){
        return this.#status
    }
}
