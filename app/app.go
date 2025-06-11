package app

import (
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
			Value: "devbook.com.br",
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
