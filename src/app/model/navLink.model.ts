export class NavLink {
    constructor(
        private _index: number,
        private _path: string,
        private _label: string
    ){}

    get path(): string {
        return this._path;
    }

    get index(): number {
        return this._index;
    }

    get label(): string {
        return this._label;
    }
}