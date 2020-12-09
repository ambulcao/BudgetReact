const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

require('./models/budget');
const Budget = mongoose.model('budget');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

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

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: 'a34d9cb9d71aa1', // generated ethereal user
            pass: 'f832c6e43d67a0', // generated ethereal password
        },
    });

    var emailHtml = 'Prezado(a)<br><br> Recebi a solicitação de orçamento. <br><br>Em breve será encaminhado o orçamento<br><br>';

    var emailText = 'Prezado(a)\n\n Recebi a solicitação de orçamento. \n\n Em breve será encaminhado o orçamento \n\n';

    var emailSendInfo = {
        from: 'aa9c81446b-846c53@inbox.mailtrap.io', // sender address
        to: req.body.email, // list of receivers
        subject: "Recebi a solicitação de Orçamento", // Subject line
        text: emailText, // plain text body
        html: emailHtml,
    }

    await transport.sendMail(emailSendInfo, function(err){
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Solicitação de orçamento não enviada com sucesso!"
        });
        return res.json({
            error: false,
            message: "Solicitação de orçamento enviada com sucesso!"
        });
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});
