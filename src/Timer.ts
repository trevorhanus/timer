export interface ITimer {
    cancel: (id: string) => void;
    isPending: (id: string) => boolean;
    register: (id: string, fn: () => void, fromNow: number) => void;
}

export class Timer implements ITimer {
    private _timers: Map<string, NodeJS.Timer>;

    constructor() {
        this._timers = new Map<string, NodeJS.Timer>();
    }

    public cancel(id: string) {
        const timerId = this._timers.get(id);
        if (timerId) {
            clearTimeout(timerId);
            this._timers.delete(id);
        }
    }

    public isPending(id: string): boolean {
        return this._timers.has(id);
    }

    public register(id: string, fn: () => void, fromNow: number) {
        if (this._timers.has(id)) {
            throw new Error(`Timer with id ${id} is already registered. Cannot override it.`);
        }

        const timerId = setTimeout(() => {
            fn();
            this._timers.delete(id);
        }, fromNow);
        this._timers.set(id, timerId);
    }
}
