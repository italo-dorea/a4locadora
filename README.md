# A4 Locadora

Site da A4 Locadora (a4locadora.com.br). Next.js com **export estático** (sem backend), Tailwind v4 e ícones Phosphor.

## Comandos

```powershell
npm install
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # gera o site estático na pasta out/
npm run lint     # checagem de tipos
npm run assets   # reotimiza as imagens de assets-src/ para public/assets/ (webp)
```

Para publicar, envie o conteúdo da pasta `out/` para a hospedagem (inclui `.htaccess` com a página 404).

## Dados em JSON (editar sem mexer em código)

| Arquivo | O que controla |
|---|---|
| `src/data/veiculos.json` | Frota: cards, carrossel do topo e opções do formulário. Para adicionar um veículo, copie um bloco, coloque a imagem em `public/assets/` e rode o build. `disponivel: false` tira o veículo do formulário e do carrossel. |
| `src/data/planos.json` | Planos: preços, caução, benefícios e as opções do formulário. |
| `src/data/faq.json` | Perguntas frequentes (também geram o schema FAQ para buscadores). |
| `src/data/site.json` | Email de destino do formulário, WhatsApp, endereço e redes sociais. |

## Formulário de contato (sem backend)

Ao enviar, em segundo plano (sem sair da página):

1. **Email**: enviado via [FormSubmit](https://formsubmit.co) (endpoint AJAX) para `emailContato` em `site.json` (hoje `contato@a4locadora.com.br`), com os mesmos campos e anexos do formulário original.
2. **WhatsApp**: abre `wa.me` com uma mensagem montada com os dados preenchidos (arquivos não podem ir por link, por isso seguem só por email).

Se o email falhar, o formulário continua preenchido, o WhatsApp abre mesmo assim e o usuário pode tentar de novo.

> O FormSubmit exige confirmar o endereço de destino no primeiro envio (chega um email de ativação na caixa de entrada).
