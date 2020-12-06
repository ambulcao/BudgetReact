const express = require('express');
const mongoose = require('mongoose');

require('./models/budget');
const Budget = mongoose.model('budget');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com BD realizado com sucesso!");
}).catch((err) => {
    console.log("Erro na conexão com o BD: " + err);
});

app.post('/budget', async  (req, res) => {
    await Budget.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: solicitação de orçamento não enviado com sucesso!"
        });
    });
    {/*res.send('Budget AMB Tech Solutions');*/}
}); 

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
