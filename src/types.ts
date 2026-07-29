type PrimitiveValues = true | false | 1 | 0 | -1 | 'true' | 'false' | '1' | '0' | '-1' | ''
type SpecialValues = null | undefined | typeof Number.POSITIVE_INFINITY | typeof Number.NEGATIVE_INFINITY | typeof Number.NaN

export type Value = PrimitiveValues | SpecialValues | object
