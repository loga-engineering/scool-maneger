



const person = {
    name: "Lame",
    age: 20,
    address: "Bamako"
}


const {name, ...toto} = person;

const person2 = {...toto, name}

console.log("Name: ", name);
console.log("Toto: ", toto);

console.log(person)
console.log(person2)

const nb = [2, 3, 4, 5, 8];

const [a, b, ...other] = nb;

console.log("A: ", a)
console.log("B: ", b)
console.log("Other: ", other)
