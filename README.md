# rsc-esm-notes

A minimal implementation exploring React Server Components using experimental React Flight ESM bindings without frameworks and bundlers.

## 🔧 Tech

- React Server Components (Experimental Flight ESM)
- Native ESM modules
- Hono for lightweight server
- Server Actions for state mutations
- Custom RSC loader implementation
- Custom client-side router implementation

## 📁 Project Structure

```
├── server/                     # Hono server + RSC handlers
├── ui/                         # React components
├── public/                     # Static assets
└── package.json                # Minimal dependencies
```

## ⚠️ Experimental Features

This uses `react-server-dom-esm`, an experimental React Flight bindings for DOM using ESM.
[Official Repository](https://github.com/facebook/react/tree/main/packages/react-server-dom-esm)
