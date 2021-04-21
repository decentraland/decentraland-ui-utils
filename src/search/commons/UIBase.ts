export abstract class UIBase<T extends UIShape> {

    constructor(public readonly shape: T, initialProperties?: InitialUIProperties<T>) {
        if (initialProperties) {
            this.setProperties(initialProperties)
        }
    }

    protected setProperties(prop: Partial<T>) {
        for (const propName of Object.keys(prop)) {
            // @ts-ignore
            this.shape[propName] = prop[propName]
        }
    }

    protected getProperty<K extends keyof T>(propName: K): T[K] {
        return this.shape[propName]
    }
}

export type InitialUIProperties<T extends UIShape> = Partial<T>