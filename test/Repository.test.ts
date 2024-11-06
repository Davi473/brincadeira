import { LancamentoDAOMemoria, LancamentoInsert } from "../src/Lancamento/Repository";
const repository = new LancamentoDAOMemoria();
test.each([
	{
    id_ativo: "jniwdf929834234", id_user: "kd9fsdfu3", quantidade: 10, 
    preco: 34, data: new Date("30-10-2024"), compra: true
  }
])("Adicionar lancamentos", async (lancamento: LancamentoInsert) => {
	await repository.insert(lancamento)
});

test("Adicionar lancamentos", async () => {
  
	const lancamentos = await repository.select("kd9fsdfu3");
  console.log(lancamentos);
  expect(lancamentos[0].quantidade).toBe(10);
});