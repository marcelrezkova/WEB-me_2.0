# Nasazení na Netlify

1. Vytvořte build projektu:
   ```bash
   npm run build
   ```
2. Nahrajte obsah složky `dist` do Netlify (nebo nastavte build přímo v Netlify).
3. Ujistěte se, že v kořeni projektu je soubor `netlify.toml` a `_redirects` (oba jsou ve složce `netlify`).
4. V Netlify nastavte `publish directory` na `dist`.

SPA routování je zajištěno pomocí `_redirects` a `netlify.toml`.

Pokud potřebujete env proměnné, přidejte je v Netlify v sekci Environment variables.
