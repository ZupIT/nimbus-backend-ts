import { Expression } from '@zup-it/nimbus-backend-core'
import { request } from '@zup-it/nimbus-backend-core/actions'

interface CepApiResponse {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string,
}

interface Options {
  cep: Expression<string>
}

export const fetchCepAddress = request<CepApiResponse>()
  .compose(({ cep }: Options) => ({ url: `https://viacep.com.br/ws/${cep}/json` }))
