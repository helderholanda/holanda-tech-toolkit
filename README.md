# Holanda Tech Toolkit

Central de ferramentas da Holanda Informática. Projeto estático preparado para publicação no GitHub Pages.

## 1. Arquivos do projeto

- `index.html` — estrutura da página.
- `style.css` — aparência e layout responsivo.
- `app.js` — pesquisa, filtros e funcionamento dos botões.
- `programas.json` — catálogo de ferramentas e endereços de download.

## 2. Publicar no GitHub Pages

1. Entre em https://github.com/ e faça login.
2. Clique em **New repository**.
3. Nome sugerido: `holanda-tech-toolkit`.
4. Selecione **Public** (necessário para o fluxo gratuito padrão do GitHub Pages).
5. Crie o repositório.
6. Clique em **Add file > Upload files**.
7. Envie os quatro arquivos deste projeto, mantendo todos na raiz do repositório.
8. Clique em **Commit changes**.
9. Abra **Settings > Pages**.
10. Em **Build and deployment**, selecione **Deploy from a branch**.
11. Escolha a branch `main` e a pasta `/ (root)`.
12. Clique em **Save**.
13. Aguarde a publicação. O endereço aparecerá na própria página de configurações do Pages.

## 3. Como configurar um download

Abra `programas.json`. Cada ferramenta possui um campo `url`.

Exemplo:

```json
{
  "id": "chrome",
  "name": "Google Chrome",
  "category": "utilities",
  "tag": "NAVEGADOR",
  "icon": "C",
  "description": "Instalador do Google Chrome.",
  "status": "Disponível",
  "url": "https://endereco-do-download",
  "button": "Download"
}
```

Troque `https://endereco-do-download` pelo endereço real e confiável. Salve e envie o `programas.json` atualizado ao GitHub. O botão da ferramenta ficará habilitado automaticamente.

Para ferramentas que não podem ser redistribuídas, use o link oficial do fabricante. Não hospede instaladores de terceiros sem verificar os termos de distribuição e a licença.

## 4. Distribuir pacotes RAR pelas GitHub Releases

1. No repositório, abra **Releases**.
2. Clique em **Create a new release**.
3. Crie uma tag, por exemplo `pacotes-v1.0`.
4. Adicione um título e uma descrição.
5. Arraste os arquivos `.rar` permitidos para a área de anexos.
6. Publique a Release.
7. Copie o endereço do arquivo anexado e coloque esse endereço no campo `url` da ferramenta correspondente em `programas.json`.

O GitHub Releases aceita anexos de até 2 GiB por arquivo. Não use o repositório Git comum para instaladores grandes. Confira sempre os limites e as condições atuais do GitHub.

## 5. Como adicionar uma ferramenta

Copie um objeto de ferramenta dentro da lista de `programas.json`, respeitando as vírgulas e o formato JSON. Use uma destas categorias:

- `windows`
- `office`
- `drivers`
- `utilities`
- `security`

Exemplo:

```json
{
  "id": "meu-utilitario",
  "name": "Meu Utilitário",
  "category": "utilities",
  "tag": "UTILITÁRIO",
  "icon": "M",
  "description": "Descrição curta da ferramenta.",
  "status": "Link a configurar",
  "url": "",
  "button": "Download"
}
```

Deixe `url` vazio enquanto o download não estiver pronto. O botão ficará desabilitado e aparecerá como **Em preparação**.

## 6. Limitação desta versão

Esta versão é um catálogo web. Por segurança, navegadores não permitem que uma página comum execute livremente programas `.exe`, `.bat` ou comandos no computador do visitante. Para executar ferramentas diretamente de um pendrive, será necessário desenvolver um aplicativo Windows complementar.

## 7. Segurança e licenciamento

- Use instaladores obtidos de fontes oficiais ou cuja redistribuição seja expressamente permitida.
- Verifique assinatura digital, integridade e licença dos programas.
- Não inclua cracks, ativadores ou métodos de contorno de licenciamento.
- Não publique chaves, senhas, dados de clientes ou informações privadas.
- Teste os pacotes em ambiente controlado antes de disponibilizá-los.

---

**Holanda Informática — Holanda Tech Toolkit**
