# CREATE

IP Production Engine da Pollaio.

## Stack
- React + Vite
- Supabase Auth / Database / Storage
- Hostinger para hospedagem
- GitHub como repositório

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Preencha `.env.local` com os valores públicos do projeto Supabase.

**Nunca coloque `service_role` ou qualquer secret key neste repositório.**

## Deploy
O build é preparado para rodar em:

`https://app.pollaio.com.br/create/`

A configuração `base: '/create/'` já está no Vite.

## Próxima etapa
Migrar a interface do CREATE V4 para componentes React e conectar:
- universes
- universe_dna
- characters
- assets
- knowledge
- content_packages
- content_outputs
- approvals
- feedback
- products
- profiles
