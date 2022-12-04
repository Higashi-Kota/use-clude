import { z } from "zod";

declare module '@nap5/use-clude' {
  export function useClude(shape: z.ZodRawShape) {
    const schema = z.object(shape);
    const record = z.record(z.any());
    type Record = z.infer<typeof record>;
    type Shape = z.infer<typeof schema>;
    type ShapeKeys = keyof Shape;
    return {
      exclude: function exclude (...props: ShapeKeys[]):Record {},
      include: function include (...props: ShapeKeys[]):Record {}
    }
  }
}