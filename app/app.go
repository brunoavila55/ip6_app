package app

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"

	"github.com/urfave/cli"
)

// Gerar vai retornar a aplicação de linha de comando pronta para ser executada
func Gerar() *cli.App {
	app := cli.NewApp()
	app.Name = "Aplicação de linha de comando"
	app.Usage = "Busca IPs e nomes de servidor na internet"

	flags := []cli.Flag{
		cli.StringFlag{
			Name:  "host",
			Value: "ip6.com.br",
		},
	}
	app.Commands = []cli.Command{
		{
			Name:   "ip",
			Usage:  "Busca IPs de endereços na internet",
			Flags:  flags,
			Action: buscarIps,
		},
		{
			Name:   "servidores",
			Usage:  "Busca o nome dos servidores na internet",
			Flags:  flags,
			Action: buscarServidores,
		},
		{
			Name:   "meuip",
			Usage:  "Busca o meu IP publico v4 e v6",
			Action: buscarMeuIP,
		},
		{
			Name:   "server",
			Usage:  "Inicia o servidor web na porta 8080",
			Action: iniciarServidor,
		},
	}

	return app
}

func buscarIps(c *cli.Context) {
	host := c.String("host")

	ips, err := net.LookupIP(host)
	if err != nil {
		log.Fatal(err)
	}

	for _, ip := range ips {
		fmt.Println(ip)
	}
}

func buscarServidores(c *cli.Context) {
	host := c.String("host")

	servidores, err := net.LookupNS(host) // name server
	if err != nil {
		log.Fatal(err)
	}

	for _, servidor := range servidores {
		fmt.Println(servidor.Host)
	}
}

func buscarMeuIP(c *cli.Context) error {
	//IPV4
	ipv4, err := buscarIP("https://api.ipify.org")
	if err != nil {
		fmt.Println("Erro ao buscar meu IPv4:", err)
	} else {
		fmt.Println("IP Público IPv4:", ipv4)
	}

	//IPV6
	ipv6, err := buscarIP("https://api64.ipify.org")
	if err != nil {
		fmt.Println("Erro ao buscar meu IPv6:", err)
	} else {
		fmt.Println("IP Público IPv6:", ipv6)
	}

	return nil
}

func buscarIP(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("erro ao buscar IP: %s", resp.Status)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

// Estruturas para JSON responses
type IPResponse struct {
	IPs []string `json:"ips"`
}

type ServidoresResponse struct {
	Servidores []string `json:"servidores"`
}

type MeuIPResponse struct {
	IPv4 string `json:"ipv4"`
	IPv6 string `json:"ipv6"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}

// Função para iniciar o servidor web
func iniciarServidor(c *cli.Context) error {
	// Configurar CORS
	http.HandleFunc("/api/ip", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}

		if r.Method != "GET" {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			return
		}

		host := r.URL.Query().Get("host")
		if host == "" {
			host = "ip6.com.br"
		}

		ips, err := net.LookupIP(host)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(ErrorResponse{Error: err.Error()})
			return
		}

		var ipStrings []string
		for _, ip := range ips {
			ipStrings = append(ipStrings, ip.String())
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(IPResponse{IPs: ipStrings})
	})

	http.HandleFunc("/api/servidores", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}

		if r.Method != "GET" {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			return
		}

		host := r.URL.Query().Get("host")
		if host == "" {
			host = "ip6.com.br"
		}

		servidores, err := net.LookupNS(host)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(ErrorResponse{Error: err.Error()})
			return
		}

		var servidorStrings []string
		for _, servidor := range servidores {
			servidorStrings = append(servidorStrings, servidor.Host)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(ServidoresResponse{Servidores: servidorStrings})
	})

	http.HandleFunc("/api/meuip", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}

		if r.Method != "GET" {
			http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
			return
		}

		ipv4, err4 := buscarIP("https://api.ipify.org")
		ipv6, err6 := buscarIP("https://api64.ipify.org")

		response := MeuIPResponse{}

		if err4 != nil {
			response.IPv4 = "Erro: " + err4.Error()
		} else {
			response.IPv4 = ipv4
		}

		if err6 != nil {
			response.IPv6 = "Erro: " + err6.Error()
		} else {
			response.IPv6 = ipv6
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	fmt.Println("Servidor iniciado na porta 8080")
	fmt.Println("Acesse: http://localhost:8080")
	return http.ListenAndServe(":8080", nil)
}

// Função para habilitar CORS
func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
