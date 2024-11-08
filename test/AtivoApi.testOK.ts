import axios from "axios";
let ativoGet: string;
test("testando post AtivosApi POST", async function()
{
    const output: any = await axios.post(
        "http://localhost:3000/ativo",
        {
            ticket: "VALE3",
            tipo: "Acões",
        }
    );
    const id = output.data.ativo;
    expect(typeof id).toBe("string"); 
});

test("testando post AtivosApi GET", async () =>
{
    const output: any = await axios.get("http://localhost:3000/ativo");
    const ativo = output.data[0];
    ativoGet = ativo.id;
    expect(ativo.ticket).toBe("VALE3"); 
});

test("testando post AtivosApi DELETE", async function()
{
    const output: any = await axios.delete(
        "http://localhost:3000/ativo",
        {
            data: {id: ativoGet},
        }
    );
    const ativo = output.data;
    expect(ativo.message).toBe("Deletado com sucesso"); 
});