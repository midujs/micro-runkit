// Import third party
// const os = require('os');
const path = require('path');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const cpr = require('child_process');
const groupBy = require('lodash.groupby');
const template = require('json-templater/object');

const { validateParam } = require('./utils');

// Global const
const buildDir = 'build';
const execOpt = { stdio: 'inherit' };
const realPath = path => `${buildDir}/${path}`;
const lsDir = dir => fs.readdirSync(realPath(dir));

const listServices = param => {
  const { image } = param;

  // Ensure "tmp" folder exists
  fs.ensureDirSync(buildDir);

  const appSrc = '/app/src';
  const copyTo = realPath('src');
  const serviceDir = 'src/services';
  const container = `app-${new Date().getTime()}`;

  const stopCmd = `docker stop --time 0 ${container}`;
  const copyCmd = `docker cp ${container}:${appSrc} ${copyTo}`;
  const runCmd = `docker run --rm --detach --name ${container} ${image} tail -f /dev/null`;

  cpr.execSync(runCmd, execOpt);
  cpr.execSync(copyCmd, execOpt);
  cpr.execSync(stopCmd, execOpt);

  const serviceGroups = lsDir(serviceDir);

  const services = serviceGroups
    .map(group => {
      const groupDir = path.join(serviceDir, group);
      const serviceFiles = lsDir(groupDir);

      return serviceFiles //
        .map(file => {
          const name = file.split('.').shift();
          const filePath = path.join(groupDir, file);
          return { group, name, filePath };
        });
    })
    .reduce((arr, services) => [...arr, ...services], []);

  return services;
};

/**
 * Generate Stack compose-file as JSON
 * @param {*} param
 */
const genStack = param => {
  validateParam(['image', 'domain', 'serverEnv'])(param);

  const {
    image,
    domain,
    serverEnv,
    runInGroup,
    ignoreServices = [],
    apiGatewayPort = '3000',
    traefikNetwork = 'traefik-net',
    serviceConfig = require('./template/service.json'),
    apiGatewayServiceConfig = require('./template/api-gateway-service.json'),
  } = param;

  const allServices = listServices(param);

  const services = allServices.filter(service => {
    const ignored = ignoreServices.includes(service.filePath);
    return ignored ? false : true;
  });

  const dockerServices = (runInGroup //
    ? groupService(services)
    : services
  ).reduce((hashMap, service) => {
    const { group, name, filePath } = service;
    const serviceName = `${group}-${name}`.toLowerCase();

    const isApiGateway = group === 'api';
    const serviceTmpl = isApiGateway ? apiGatewayServiceConfig : serviceConfig;

    hashMap[serviceName] = template(serviceTmpl, {
      IMAGE: image,
      DOMAIN: domain,
      SERVICE: filePath,
      SERVER_ENV: serverEnv,
      TRAEFIK_NETWORK: traefikNetwork,
      API_GATEWAY_PORT: apiGatewayPort,
    });

    return hashMap;
  }, {});

  return {
    version: '3.3',
    services: dockerServices,
    networks: {
      net: {
        driver: 'overlay',
        attachable: true,
      },
      [traefikNetwork]: {
        external: true,
      },
    },
    secrets: {
      [serverEnv]: {
        external: true,
      },
    },
  };
};

/**
 * Generate Stack compose-file as JSON
 * Deploy service in group
 * @param {*} param
 */
const groupService = services => {
  const mapGroups = groupBy(services, service => service.group);

  return Object.keys(mapGroups).reduce((bucket, group) => {
    const name = 'all';
    const filePath = `src/services/${group}`;
    const aliasService = { name, filePath, group };

    return [...bucket, aliasService];
  }, []);
};

/**
 * Generate Client compose-file as JSON
 * @param {*} param
 */
const genClient = param => {
  validateParam(['image', 'domain'])(param);

  const { image, domain, traefikNetwork = 'traefik-net' } = param;
  const clientTmpl = require('./template/client.json');

  const clientConf = template(clientTmpl, {
    IMAGE: image,
    DOMAIN: domain,
    TRAEFIK_NETWORK: traefikNetwork,
  });

  return {
    version: '3.3',
    services: {
      client: clientConf,
    },
    networks: {
      net: {
        driver: 'overlay',
        attachable: true,
      },
      [traefikNetwork]: {
        external: true,
      },
    },
  };
};

const buildYamlFile = param => {
  const { object, filePath = realPath('docker-compose.yml') } = param;
  const yamlStr = yaml.safeDump(object, { noRefs: true });
  fs.outputFileSync(filePath, yamlStr);
};

module.exports = {
  genStack,
  genClient,
  buildYamlFile,
};
