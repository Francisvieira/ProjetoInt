
const request = require("supertest");
const app = require("./index");



describe('Aplicacao Produto',()=>{
    it('Teste de Rota produtos/listar',async() =>{

        const res = await request(app).get("/produtos/listar");
        console.log(res);
        expect(res.body).toHaveProperty("output");

    }); 

    it(`Teste de Rota de buscar produtos/buscar/:id`,async()=>{
        const res_buscar = await request(app).get("/produtos/buscar/1")
        expect(res_buscar.body).toHaveProperty("output");
    });

    it(`teste da rota de cadastro produtos/cadastro`,async()=>{
        const res_cadastro =await request(app).post("/produto/cadastro")
        .send({
            nomeproduto:"hamburguer teste",
            descricao:"testando hamb",
            preco:20.00,
            foto:"hamb.jpg"
        }) 
        .set("Accept","application/json")
        .expect(201)
        .console.log(res_cadastro.text)
    });

    it(` teste de rota de atualizacao/atualizar/id`,async()=>{
        const res_atualizar = await request (app)
        .put("/produto/ataulizar/1")
        .send({
            nomeproduto:"hamb",
            descricao:"testando hamb",
            preco:20.00,
            foto:"burguer.jpg"
        })
        .set("Accept","application/json")
        .expect(200)
        .console.log(res_atualizar.text)
    });

    it(`teste de rota de Deletar prodto/apagar`,async()=>{
        const res_apagar = await request (app)
        .delete("/produto/apagar/1")
        .set("Accept","application/json")
        .expect(204)
    });
});  