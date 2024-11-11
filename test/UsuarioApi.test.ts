import axios from "axios";

test("register api", async () => 
{
    const dados = await axios.post("http://localhost:3000/register", {name: "Davi123", passoword: "1234"});
    const usuario = dados.data[0];
    expect(usuario.name).toBe("Davi123");
});

test("Register api DELETE",  async () => {
    const dados = await axios.delete(
        "http://localhost:3000/register", 
        {
            data: {name: "Davi123", passoword: "1234"}
        });
    const usuario = dados.data;
    expect(usuario.message).toBe("Usuario deletado");
});