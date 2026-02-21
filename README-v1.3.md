# UMADC v1.3-stable — Guia Rápido

## ✨ O QUE É NOVO NA v1.3

### 1️⃣ TODOS OS LINKS INSTAGRAM REAIS ✅
```
UMADC GERAL
└─ https://www.instagram.com/umadccurtibaoficial/

REGIONAIS
├─ CIC → https://www.instagram.com/umadcregionalcic_oficial/
├─ Boa Vista → https://www.instagram.com/umadcregionalbv/
├─ Cajuru → https://www.instagram.com/umadcregionalcajuru_/
├─ Bairro Novo → https://www.instagram.com/umadcbairronovo/
├─ Boqueirão → https://www.instagram.com/umadc_regional.boqueirao/
├─ Tatuquara → https://www.instagram.com/umadcregionaltatuquara/
├─ Pinheirinho → https://www.instagram.com/umadcregionalpinheirinho/
├─ Portão → https://www.instagram.com/umadc.regionalportao/
├─ Santa Felicidade → https://www.instagram.com/regionalstafelicidade/
└─ Matriz → https://www.instagram.com/umadc_regionalmatriz/
```

### 2️⃣ ÍCONES SVG OFICIAIS ✅
- ✅ Ícone Instagram profissional (não emoji)
- ✅ Aparece em 2 locais:
  - Topo da página principal (index)
  - Slide 2 de cada regional

### 3️⃣ BOTÃO INSTAGRAM GERAL ✅
- **Local:** Página principal / Index
- **Texto:** "Acompanhe a UMADC"
- **Link:** https://www.instagram.com/umadccurtibaoficial/
- **Estilo:** Gradient roxo/rosa com ícone SVG

---

## 🎯 ONDE VER OS BOTÕES

### Na Página Principal
```
┌─────────────────────────────────┐
│  10 REGIONAIS                   │
│  1 VISÃO                         │
│                                 │
│  ATÉ QUE TODOS OUÇAM            │
│                                 │
│  [🔷 Acompanhe a UMADC] ← NOVO  │
│                                 │
│  📊 Estatísticas                │
└─────────────────────────────────┘
```

### Em Cada Regional (Slide 2)
```
┌──────────────────────────────┐
│ Regional [Nome]              │
│ Descrição...                 │
│                              │
│ [🔷 Acompanhe no Instagram]  │
│                              │
│ Cards de dados               │
│ (Igrejas, Population, etc)   │
└──────────────────────────────┘
```

---

## 📱 LINKS POR REGIONAL

| Regional | Instagram |
|----------|-----------|
| **GERAL** | @umadccurtibaoficial |
| CIC | @umadcregionalcic_oficial |
| Boa Vista | @umadcregionalbv |
| Cajuru | @umadcregionalcajuru_ |
| Bairro Novo | @umadcbairronovo |
| Boqueirão | @umadc_regional.boqueirao |
| Tatuquara | @umadcregionaltatuquara |
| Pinheirinho | @umadcregionalpinheirinho |
| Portão | @umadc.regionalportao |
| Santa Felicidade | @regionalstafelicidade |
| Matriz | @umadc_regionalmatriz |

---

## 🚀 COMO TESTAR

### 1. Página Principal
1. Acesse: `http://localhost:8000/index.html`
2. Procure o botão no topo (logo após "ATÉ QUE TODOS OUÇAM")
3. Clique em "Acompanhe a UMADC"
4. Deve abrir o Instagram oficial em nova aba ✅

### 2. Página Regional
1. Acesse: `http://localhost:8000/regional.html?regional=CIC`
2. Role para o Slide 2 (Dados da Regional)
3. Procure o botão "Acompanhe no Instagram"
4. Clique para abrir o Instagram da regional ✅

### 3. Teste Outra Regional
1. Mude a URL: `regional.html?regional=BoaVista`
2. Verifique se o link mudou para o Instagram correto
3. Repita para outras regionais ✅

---

## 🎨 DETALHES VISUAIS

### Ícone Instagram
- **Tamanho:** Escalável (16px até 100px)
- **Design:** Oficial Instagram
- **Cor:** Branca (herdada do botão)
- **Formato:** SVG (vetorial, sem perda de qualidade)

### Botão
- **Estilo:** Gradient roxo → rosa (#667eea → #764ba2)
- **Padding:** 8px 16px (index: 10px 20px)
- **Border radius:** 25px
- **Hover:** Mais escuro (backdrop do gradient)
- **Transição:** Suave (0.3s)

---

## 📊 O QUE INCLUI v1.3

✅ **Links Instagram**
- 11 links oficiais verificados
- 1 geral + 10 regionais
- Todos funcionando ✅

✅ **Ícones SVG**
- Design oficial Instagram
- Profissional e escalável
- 2 implementações (index + regional)

✅ **Footer**
- Direitos reservados
- Link do criador (@oedsonluizz)

✅ **WhatsApp Aprimorado**
- Novo visual nas regionais
- Ícone + texto

✅ **Base PWA**
- Funcional offline
- Cache otimizado
- 100% responsivo

---

## 🔧 CUSTOMIZAR

Se precisar mudar algum link:

### Index.html
Procure por:
```html
href="https://www.instagram.com/umadccurtibaoficial/"
```
E substitua pela URL desejada.

### Regional.html
Procure na seção `const REGIONAIS`:
```javascript
'CIC': {
    instagram: 'https://www.instagram.com/umadcregionalcic_oficial/',
}
```
E atualize conforme necessário.

---

## ✅ GARANTIAS

✔️ **Todos os Links Verificados**
- Testados em 21 de fevereiro de 2026
- Contas ativas e acessíveis
- Abrem corretamente

✔️ **Ícones Funcionando**
- SVG renderiza em todos navegadores
- Escalável sem perda de qualidade
- Sem dependências externas

✔️ **Responsivo**
- Mobile ✅
- Tablet ✅
- Desktop ✅
- Qualquer resolução ✅

✔️ **Performance**
- Zero impacto
- PWA continua funcional
- Carregamento mantido

---

## 📞 DÚVIDAS

**P: Como mudar o link do Instagram?**
R: Edite o arquivo (index.html ou regional.html) e procure pela URL. Substitua mantendo o formato.

**P: O ícone fica ruim em mobile?**
R: Não! SVG é escalável. Fica perfeito em qualquer tamanho.

**P: Preciso de um novo link?**
R: Sim, basta editar a URL no código. Não requer recompilação.

**P: E se o Instagram der erro?**
R: O link está clicável e aberto. Se a conta não existir, o Instagram avisa. Não é culpa do código.

---

## 📝 RESUMO FINAL

| Versão | Destaques |
|--------|-----------|
| v1.0 | Base completa |
| v1.1 | + Instagram regional + WhatsApp |
| v1.2 | + Footer |
| **v1.3** | **+ Links reais + Ícones SVG + Instagram geral** |

---

**Status:** ✅ Pronto para Produção  
**Data:** 21 de fevereiro de 2026  
**Links:** ✅ Todos Verificados  

Desenvolvido por Edson Luiz
