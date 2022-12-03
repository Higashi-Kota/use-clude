import { z } from "zod";
const useClude = (shape: z.ZodRawShape) => {
  const schema = z.object(shape);
  const record = z.record(z.any());
  type Record = z.infer<typeof record>;
  type Shape = z.infer<typeof schema>;

  type ShapeKeys = keyof Shape;

  const exclude = (...props: ShapeKeys[]) => {
    return schema.transform((res: Record) => {
      const items = Object.keys(res) as ShapeKeys[];
      return items
        .filter((item) => {
          return !props.includes(item);
        })
        .reduce((acc, cur) => {
          return { ...acc, [cur]: res[cur] };
        }, {});
    });
  };

  const include = (...props: ShapeKeys[]) => {
    return schema.transform((res: Record) => {
      const items = Object.keys(res) as ShapeKeys[];
      return items
        .filter((item) => {
          return props.includes(item);
        })
        .reduce((acc, cur) => {
          return { ...acc, [cur]: res[cur] };
        }, {});
    });
  };

  return {
    exclude,
    include,
  };
};

export { useClude };
