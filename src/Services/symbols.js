import { get, urlPreifx } from "./restClient";

const prefix = `${urlPreifx}/symbols` 

export const updateSymbols = () => {
    return get(prefix);
}