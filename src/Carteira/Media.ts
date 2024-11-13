
export default class Media 
{
    private media: number = 0;
    private quantidade: number = 0;
    private valorTotal: number = 0;

    constructor(private lancamentos: any[]) 
    {
        this.mediaCalcular();
    }

    private mediaCalcular ()
    {
        this.lancamentos.forEach((lancamento) => 
        {
            this.valorTotal = this.buy(lancamento.compra, this.valorTotal, lancamento.preco);
            this.quantidade =+ this.buy(lancamento.compra, this.valorTotal, lancamento.quantidade);
            if (this.valorTotal > 0 || this.quantidade > 0)
            {
                this.valorTotal = 0;
                this.quantidade = 0;
            }
        });
        if (this.quantidade === 0) this.media = 0;
        if(this.quantidade < 0) this.media = this.valorTotal / this.quantidade;
    }

    private buy (buy: boolean, valueSum:  number, value: number)
    {
        switch (buy)
        {
            case true: return valueSum + value;
            case false: return valueSum - value;
        }
    }

    public getMedia ()
    {
        return this.media;
    }

    public getQuantidade ()
    {
        return this.quantidade;
    }

    public getValorTotal ()
    {
        return this.valorTotal;
    }
}