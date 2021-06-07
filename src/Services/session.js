import { get, urlPreifx } from "./restClient";

const endUrl = `${urlPreifx}/end`;
const startUrl = `${urlPreifx}/start`;

export const startSession = () => {
    return get(startUrl);
}

export const endSession = () => {
    return get(endUrl);
}