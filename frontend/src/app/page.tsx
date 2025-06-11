'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, IPResponse, ServidoresResponse, MeuIPResponse } from '@/lib/api'

export default function Home() {
  const [host, setHost] = useState('ip6.com.br')
  const [loading, setLoading] = useState<string | null>(null)
  const [results, setResults] = useState<{
    ips?: IPResponse
    servidores?: ServidoresResponse
    meuip?: MeuIPResponse
  }>({})
  const [errors, setErrors] = useState<{
    ips?: string
    servidores?: string
    meuip?: string
  }>({})

  const handleBuscarIPs = async () => {
    setLoading('ips')
    setErrors(prev => ({ ...prev, ips: undefined }))
    
    try {
      const result = await api.buscarIPs(host)
      setResults(prev => ({ ...prev, ips: result }))
    } catch (error) {
      setErrors(prev => ({ ...prev, ips: error instanceof Error ? error.message : 'Erro desconhecido' }))
    } finally {
      setLoading(null)
    }
  }

  const handleBuscarServidores = async () => {
    setLoading('servidores')
    setErrors(prev => ({ ...prev, servidores: undefined }))
    
    try {
      const result = await api.buscarServidores(host)
      setResults(prev => ({ ...prev, servidores: result }))
    } catch (error) {
      setErrors(prev => ({ ...prev, servidores: error instanceof Error ? error.message : 'Erro desconhecido' }))
    } finally {
      setLoading(null)
    }
  }

  const handleBuscarMeuIP = async () => {
    setLoading('meuip')
    setErrors(prev => ({ ...prev, meuip: undefined }))
    
    try {
      const result = await api.buscarMeuIP()
      setResults(prev => ({ ...prev, meuip: result }))
    } catch (error) {
      setErrors(prev => ({ ...prev, meuip: error instanceof Error ? error.message : 'Erro desconhecido' }))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Ferramenta de Consulta de Rede
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Busque informações de IPs, servidores DNS e descubra seu IP público de forma rápida e fácil.
        </p>
      </div>

      {/* Input Section */}
      <Card variant="elevated" className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🔍 Consultar Host</CardTitle>
          <CardDescription>
            Digite o domínio ou host que deseja consultar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Ex: google.com, ip6.com.br"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="flex-1"
            />
            <div className="flex gap-2">
              <Button
                onClick={handleBuscarIPs}
                loading={loading === 'ips'}
                disabled={!host.trim() || loading !== null}
              >
                Buscar IPs
              </Button>
              <Button
                variant="secondary"
                onClick={handleBuscarServidores}
                loading={loading === 'servidores'}
                disabled={!host.trim() || loading !== null}
              >
                Buscar Servidores
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meu IP Section */}
      <Card variant="elevated" className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🌐 Meu IP Público</CardTitle>
          <CardDescription>
            Descubra seus endereços IP públicos IPv4 e IPv6
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleBuscarMeuIP}
            loading={loading === 'meuip'}
            disabled={loading !== null}
            className="w-full"
          >
            Descobrir Meu IP
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* IPs Results */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📍 Endereços IP
              {results.ips && (
                <span className="text-sm font-normal text-gray-500">
                  ({results.ips.ips.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errors.ips && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm">{errors.ips}</p>
              </div>
            )}
            {results.ips ? (
              <div className="space-y-2">
                {results.ips.ips.map((ip, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 font-mono text-sm border animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {ip}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Clique em "Buscar IPs" para ver os endereços IP do host
              </p>
            )}
          </CardContent>
        </Card>

        {/* Servidores Results */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🖥️ Servidores DNS
              {results.servidores && (
                <span className="text-sm font-normal text-gray-500">
                  ({results.servidores.servidores.length})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {errors.servidores && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm">{errors.servidores}</p>
              </div>
            )}
            {results.servidores ? (
              <div className="space-y-2">
                {results.servidores.servidores.map((servidor, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-3 font-mono text-sm border animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {servidor}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Clique em "Buscar Servidores" para ver os servidores DNS do host
              </p>
            )}
          </CardContent>
        </Card>

        {/* Meu IP Results */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>🏠 Meu IP Público</CardTitle>
          </CardHeader>
          <CardContent>
            {errors.meuip && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm">{errors.meuip}</p>
              </div>
            )}
            {results.meuip ? (
              <div className="space-y-3">
                <div className="animate-slide-up">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IPv4
                  </label>
                  <div className="bg-blue-50 rounded-lg p-3 font-mono text-sm border border-blue-200">
                    {results.meuip.ipv4}
                  </div>
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IPv6
                  </label>
                  <div className="bg-green-50 rounded-lg p-3 font-mono text-sm border border-green-200">
                    {results.meuip.ipv6}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Clique em "Descobrir Meu IP" para ver seus endereços IP públicos
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card className="max-w-4xl mx-auto bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold text-gray-900 mb-1">Busca de IPs</h3>
              <p className="text-sm text-gray-600">
                Encontre todos os endereços IP associados a um domínio
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🖥️</div>
              <h3 className="font-semibold text-gray-900 mb-1">Servidores DNS</h3>
              <p className="text-sm text-gray-600">
                Descubra os servidores de nomes responsáveis pelo domínio
              </p>
            </div>
            <div>
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="font-semibold text-gray-900 mb-1">IP Público</h3>
              <p className="text-sm text-gray-600">
                Veja seus endereços IP públicos IPv4 e IPv6
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}