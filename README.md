# Deno Clipboard

Simple clipboard API for text so I can use it in my projects :)

## Usage

### `copy`

```ts
import { copy } from "https://deno.land/x/clipboard/mod.ts";

await copy("Hello, world!"); // Copies "Hello, world!" to clipboard
```

### paste

```ts
import { paste } from "https://deno.land/x/clipboard/mod.ts";

console.log(await paste()); // Prints "Hello, world!" to console
```
