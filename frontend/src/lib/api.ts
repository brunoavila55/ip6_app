const API_BASE_URL = 'http://localhost:8080/api'

export interface IPResponse {
  ips: string[]
}

export interface ServidoresResponse {
  servidores: string[]
}

export interface MeuIPResponse {
  ipv4: string
  ipv6: string
}

export interface ErrorResponse {
  error: string
}

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`)
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  try {
    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status)
    }
    
    const data = await response.json()
    
    if ('error' in data) {
      throw new APIError(data.error)
    }
    
    return data
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError('Erro de conexão. Verifique se o servidor está rodando.')
    }
    
    throw new APIError('Erro desconhecido ao fazer a requisição')
  }
}

export const api = {
  async buscarIPs(host: string): Promise<IPResponse> {
    return fetchAPI<IPResponse>('/ip', { host })
  },

  async buscarServidores(host: string): Promise<ServidoresResponse> {
    return fetchAPI<ServidoresResponse>('/servidores', { host })
  },

  async buscarMeuIP(): Promise<MeuIPResponse> {
    return fetchAPI<MeuIPResponse>('/meuip')
  },
}