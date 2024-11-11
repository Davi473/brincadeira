import axios from "axios";

test("test login usuario", async () =>
{
   const output: any = await axios.post(
            "http://localhost:3000/login", { name: "Davi", passoword: "1234" }
        );
    const id = typeof output.data === "string";
    expect(id).toBe(true);  
});