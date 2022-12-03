import { z } from "zod";
import { useClude } from "@nap5/use-clude";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data/bebop.json");
const userShape = {
  id: z.string(),
  name: z.string(),
  age: z.number(),
  blogs: z
    .object({
      id: z.string(),
      title: z.string(),
    })
    .array(),
};
const { exclude, include } = useClude(userShape);
console.log(
  JSON.stringify(
    data.map((item) => include("blogs").parse(item)),
    null,
    2
  )
);
console.log(
  JSON.stringify(
    data.map((item) => exclude("name", "age").parse(item)),
    null,
    2
  )
);
