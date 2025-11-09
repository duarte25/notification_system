declare module 'faker-br' {
  export const br: {
    cpf: () => string;
    cnpj: () => string;
    rg: () => string;
    nome: () => string;
    cidade: () => string;
  };

  export const name: {
    firstName: () => string;
    lastName: () => string;
  };

  export const internet: {
    email: () => string;
  };
}