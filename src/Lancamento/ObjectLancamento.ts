export default class Lancamento 
{
    private id: string;
    constructor (private lancamento: any) 
    { 
        this.id = this.lancamento.id;
        if (!this.lancamento.id) this.id = crypto.randomUUID();
    }
    public getID (): string { return this.id; }
    public getIDUser () { return this.lancamento.id_user; }
    public getIDAtivo () { return this.lancamento.id_ativo; }
    public getQuantidade () { return this.lancamento.quantidade; }
    public getPreco () { return this.lancamento.preco; }
    public getData () { return this.lancamento.data; }
    public getCompra () { return this.lancamento.compra; }
    public setPreco (preco: number) { this.lancamento.preco = preco; }
    public setQuantidade (quantidade: number) { this.lancamento.quantidade = quantidade; }
    public setData (data: Date) { this.lancamento.data = data; }
    public setCompra (compra: boolean) { this.lancamento.compra = compra; }
}
    