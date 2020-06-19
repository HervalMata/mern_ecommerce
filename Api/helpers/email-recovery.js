const transporter = require("nodemailer").createTransport(require("../config/email"));
const { api: link } = require("../config/index");
module.exports = ({usuario, recovery}, cb) => {
    const message = `
        <h1 style="text-align: center;">Recuperação de Senha</h1>
        <br/>
        <p>Aqui está o link para redefinir a sua senha. Acesse ela e digite sua nova senha.</p>
        <a href="${link}/vi/api/usuarios/senha-recuperada?token=${recovery.token}">
            ${link}/v1/api/usuarios/senha-recuperada?token=${recover.token}
        </a>
        <br/>
        <br/>
        <hr/>
        <p>Obs.: Se você não solicitou a redefinição, apenas ignore esse email</p>
        <br/>
        <p>Atenciosamente, Laços da Cris</p>
    `;
    const opcoesEmail = {
        from: "naoresponder@loja.com",
        to: usuario.email,
        subject: "Redefinição de Senha - Laços ada Cris",
        html: message
    };
    if (process.env.NODE_ENV === "production"){
        transporter.sendMail(opcoesEmail, (error, info) => {
            if (error){
                console.log(error);
                return cb("Aconteceu um erro no envio do email, tente novamente.");
            } else {
                return cb(null, "Link para redefinição de senha foi enviada com sucesso para seu email.");
            }
        });
    } else {
        console.log(opcoesEmail);
        return cb(null, "Link para redefinição de senha foi enviada com sucesso para seu email.");
    }
};