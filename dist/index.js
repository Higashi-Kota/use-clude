"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const useClude = (shape) => {
    const schema = zod_1.z.object(shape);
    const record = zod_1.z.record(zod_1.z.any());
    const exclude = (...props) => {
        return schema.transform((res) => {
            const items = Object.keys(res);
            return items
                .filter((item) => {
                return !props.includes(item);
            })
                .reduce((acc, cur) => {
                return { ...acc, [cur]: res[cur] };
            }, {});
        });
    };
    const include = (...props) => {
        return schema.transform((res) => {
            const items = Object.keys(res);
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
exports.useClude = useClude;
//# sourceMappingURL=index.js.map