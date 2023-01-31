const host = 'carbon-apontamento.sbmtech.com.br';

export const environment = {
  environmentName: 'QA',
  production: true,
  api: `https://${host}:8443`,
  jasper: `http://${host}:8080/jasperserver`,
  printerApi: `http://localhost:8090`
};
