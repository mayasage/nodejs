import ini from 'ini'

export const iniStrategy = {
  serialize: data => ini.stringify(data),
  deserialize: data => ini.parse(data),
}

export const jsonStrategy = {
  serialize: data => JSON.stringify(data, null, '  '),
  deserialize: data => JSON.parse(data),
}
