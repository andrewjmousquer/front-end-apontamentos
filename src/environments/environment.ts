const host = 'localhost';

export const environment = {
  environmentName: 'DEV',
  production: false,
  api: `http://${host}:8443`,
  jasper: `http://${host}:8080/jasperserver`,
  printerApi: `http://${host}:8090`
};
