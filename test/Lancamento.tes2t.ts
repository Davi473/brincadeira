import axios from "axios";

test("testando post Lançamento", async function()
{
    const output: any = await axios.post(
        "http://localhost:3000/lancamento",
        {
            ticket: "VALE3",
            quantidade: 20,
            preco: 63,
            data: "30-10-2024", 
            compra: true
        }
    );
    const lancamento = output.data;
    expect(lancamento.quantidade).toBe(10); //
});