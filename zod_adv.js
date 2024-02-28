const zod = require("zod");

function validateInput(obj) {
    
    const schema = z.object({
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    
    const response = schema.safeParse(obj);
    console.log(response);
}

validateInput({
    email: "satyamraj151.rajgir@gmail.com",
    password: "12345678"
});