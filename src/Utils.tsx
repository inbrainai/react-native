
import { enhanceError } from './Errors';


/**
 * Assert the color is an hex color (e.g #ffffff)
 * @param color 
 */
const REGEX_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
export const assertIsColor = (color: string) => {
    if (!color.match(REGEX_COLOR)) {
        throw Error("Color me be an hexadecimal color with # (e.g #FF0000)")
    }
}

/**
* Assert the value is not null or empty
* @param attributeName name of attribute for logging purpose
* @param attributevalue value of attribute 
*/
export const assertNotNullNorEmpty = (attributeName: string, attributeValue: string) => {
    if (!attributeValue || attributeValue.trim() == "") {
        throw Error(`${attributeName} must not be null or empty`)
    }
}

/**
 * Wrap a promise call to add common functionnalities
 * @param promise promise to call
 */
export type PromiseSupplier<T> = () => Promise<T>
export const wrapPromise = async <T extends {} | void>(promiseSupplier: PromiseSupplier<T>, count = 0): Promise<T> => {
    try {
        return await promiseSupplier()
    } catch (err) {
        // If error corresponds to null activity (happens occasionnally in Android), then we retry
        if (err.code == 'ERR_NULL_CURRENT_ACTIVITY' && count < 10) {
            await timeout(50) // -- sleep 50ms
            return wrapPromise(promiseSupplier, count + 1)
        }

        // Else, throw the enhanced error
        throw enhanceError(err)
    }
}

/**
 * 
 * @param ms 
 */
const timeout = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms))
}


