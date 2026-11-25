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
| `src/data/veiculos.json` | Frota de motos: cards, carrossel do topo e opções do formulário. Para adicionar uma moto, copie um bloco, coloque a imagem em `public/assets/` e rode o build. `disponivel: false` tira a moto do formulário e do carrossel. |
| `src/data/planos.json` | Planos de locação: diária, valor semanal, caução e a nota dos cards. |
| `src/data/faq.json` | Perguntas frequentes (também geram o schema FAQ para buscadores). |
| `src/data/site.json` | Email de destino do formulário, WhatsApp, endereço, redes, vídeo do YouTube e a mensagem do formulário. |

O conteúdo (textos, motos, planos e FAQ) segue o site anterior em WordPress. O espaçamento é padronizado em `src/lib/ui.ts` (`SECAO` e `CONTAINER`), usado por header, todas as seções e footer.

## Formulário de contato (sem backend)

Ao enviar, em segundo plano (sem sair da página):

1. **Email**: enviado via [FormSubmit](https://formsubmit.co) (endpoint AJAX) para `formulario.destino` em `site.json`, com os campos e anexos do formulário.
2. **WhatsApp**: abre `wa.me` com uma mensagem montada com os dados preenchidos (arquivos não podem ir por link, por isso seguem só por email).

Se o email falhar, o formulário continua preenchido, o WhatsApp abre mesmo assim e o usuário pode tentar de novo.

### Proteção contra bots e envios em massa

No navegador (`src/lib/lead.ts`): campo isca `_honey`, tempo mínimo de 5 segundos, limite de 1 envio por minuto e 3 por hora por aparelho, validação de telefone (DDD real), nome sem links, email com sintaxe, bloqueio de email descartável, sugestão para erro de digitação (gmial.com) e checagem DNS do domínio.
No FormSubmit: `_honey` e `_blacklist` (termos em `site.json`, campo `bloquearTermos`).

Limite honesto: o endpoint do FormSubmit é público, então quem chamar o endpoint direto não passa pelas regras do navegador. Depois de ativar o endereço no FormSubmit, troque `formulario.destino` pelo código aleatório que ele envia por email (email invisível), para o endereço não ficar exposto no código do site.

> O FormSubmit exige confirmar o endereço de destino no primeiro envio (chega um email de ativação na caixa de entrada).

## SEO

- Título, descrição, canonical, Open Graph e dados estruturados (empresa, site, página, FAQ) em `src/app/layout.tsx`, `src/app/page.tsx` e `src/lib/seo.ts`.
- `robots.txt` e `sitemap.xml` são gerados no build (`src/app/robots.ts` e `sitemap.ts`).
- `llms.txt` é gerado dos JSONs a cada `npm run build` (`scripts/gerar-llms.mjs`); não edite o arquivo à mão.
- `public/.htaccess`: HTTPS, domínio sem www, compressão, cache, cabeçalhos de segurança e 404 real. Publique junto com a pasta `out/`.
