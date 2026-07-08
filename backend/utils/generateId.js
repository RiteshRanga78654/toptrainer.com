import Counter from "../models/counter.js";

const generateId = async (prefix, counterName) => {
const counter = await Counter.findOneAndUpdate(
    {name: counterName},
    {$inc: {sequence: 1}},
    {
        new: true,
        upsert: true,
    }
);
return `${prefix}${String(counter.sequence).padStart(6, "0")}`;
};

export default generateId;