import axios from "axios";

test("testando post AtivosApi POST", async function()
{
    let lancamentoGet: string;
    const newLancamento =  {
                ticket: "VALE3",
                quantidade: 10,
                preco: 63,
                data: new Date("10-20-2024"),
                compra: true
            }

    async function post() 
    {
        const output: any = await axios.post(
            "http://localhost:3000/lancamento", newLancamento
        );
        const id = output.data.lancamento;
        expect(typeof id).toBe("string"); 
    }

    async function get()
    {
        const output: any = await axios.get("http://localhost:3000/lancamento");
        const lancamento = output.data[0];
        lancamentoGet = lancamento.id;
        console.log(lancamento);
        expect(lancamento.preco).toBe(newLancamento.preco); 
    }

    async function put()
    {
        const output: any = await axios.put(
            "http://localhost:3000/lancamento",
            {
                id: lancamentoGet,
                quantidade: 20,
                preco: newLancamento.preco,
                data: newLancamento.data,
                compra: newLancamento.compra
            }
        );
        const lancamento = output.data;
        expect(lancamento.message).toBe("Atualizado com sucesso"); 
    }

    async function deleteL()
    {
        const output: any = await axios.delete(
            "http://localhost:3000/lancamento",
            {
                data: {
                    id: lancamentoGet
                }
            }
        );
        const ativo = output.data;
        expect(ativo.message).toBe("Deletado com sucesso"); 
    }

    await post();
    await get();
    await put();
});
