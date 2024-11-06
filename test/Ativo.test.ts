import AtivoService from "../src/Ativo/Service";
import { AtivoDAOMemoria } from "../src/Ativo/Repository";
const repository = new AtivoService(new AtivoDAOMemoria());
const ativos = [
    {
        tipo: "Ações",
        ticket: "VALE3"
    },
    {
        tipo: "Fiis",
        ticket: "MXRF11"
    },
]

test.each([
    ativos
])("fazendo post", async (ativo: any) =>
{
    const output: any = await repository.post(ativo);
    const idAtivo = !!output;
    expect(idAtivo).toBe(true);
});

test("fazendo get", async () =>
{
    const output = await repository.get({ ticket: ativos[0].ticket });
    const _ativo = output[0];
    expect(_ativo.tipo).toBe(ativos[0].tipo);
});

test("fazendo delete", async () =>
{
    await repository.delete(ativos[1]);
    const output = await repository.get({ ticket: ativos[1].ticket });
    expect(output[0]).toBe(undefined);
});