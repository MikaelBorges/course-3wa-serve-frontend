//on mets les informations, dans un fichier de config
export let config = {
  // api_url: 'http://localhost:3306',
  api_url: 'https://mikaelborges-serve.herokuapp.com',
}

export function changeConfig(newUrlApi) {
  config = {
    api_url: newUrlApi,
  }
}
