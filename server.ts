import getSwaggerOptions from "./src/docs/config/head";
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import app from "./src/app"; 

// Definir a port
const port: number = Number(process.env.PORT) || 3020;

// Configuração do Swagger
const swaggerOptions = getSwaggerOptions();
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerOptions)));

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});