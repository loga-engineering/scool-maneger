const {object, string} = require("yup");
const {merge} = require("lodash");


const personSchema = object({
    firstName: string().default("Toto"),
    lastName: string().default("Tata"),
});

const person = personSchema.getDefault();

const person2 = {
    age: 20,
    lastName: "Titi",
}

const person3 = merge({}, person, person2, null, {});

console.log("===> Person: ", {person, person2, person3});

