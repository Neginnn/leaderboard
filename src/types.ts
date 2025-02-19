export type PathOf<
  TObj extends Record<string, any>,
  TPath extends string
> = TPath extends `${infer TStart}.${infer TRest}`
  ? TStart extends keyof TObj
  ? PathOf<TObj[TStart], TRest>
  : never
  : TPath extends keyof TObj
  ? TObj[TPath]
  : never;

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { };
