# Guía de trabajo con Git – Actein

## Estructura de ramas
```
master  →  base inicial, no se toca
dev     →  integración del equipo (rama principal de trabajo)
qa      →  testing
prod    →  producción
```

El trabajo del día a día ocurre en ramas personales que salen de `dev` y vuelven a `dev`.

---

## Flujo normal de trabajo

### 1. Antes de arrancar a trabajar

Siempre actualizá `dev` antes de crear tu rama:
```bash
git checkout dev
git pull origin dev
```

### 2. Crear tu rama de trabajo
```bash
git checkout -b feature/nicolas-nombre-de-lo-que-vas-a-hacer
```

Ejemplos de nombres:
- `feature/nicolas-listado-productos`
- `feature/cristian-formulario-contacto`
- `fix/nicolas-validacion-email`

### 3. Trabajar y commitear

A medida que avanzás, guardás tu trabajo con commits. Tratá de que cada commit represente algo concreto:
```bash
git add .
git commit -m "feat: agrega listado de productos al catálogo"
```

Ejemplos de mensajes:
- `feat: agrega filtro por categoría`
- `fix: corrige error en formulario de cotización`
- `chore: actualiza dependencias`

### 4. Subir tu rama a GitHub
```bash
git push -u origin feature/nicolas-nombre-de-lo-que-vas-a-hacer
```

### 5. Cuando terminás la tarea: Pull Request

1. Entrás a GitHub
2. Te va a aparecer un botón *Compare & pull request* sobre tu rama
3. Destino: `dev`
4. Le ponés un título descriptivo y creás el PR
5. Mergeás

### 6. Limpiar la rama local que ya no necesitás
```bash
git checkout dev
git pull origin dev
git branch -d feature/nicolas-nombre-de-lo-que-vas-a-hacer
```

---

## Cómo actualizar tu rama cuando Cristian mergeó cambios a dev

Situación: estás trabajando en tu rama, Cristian mergeó algo a `dev` y querés traerte esos cambios sin perder tu trabajo.
```bash
# Estando en tu rama personal
git fetch origin
git merge origin/dev
```

Si no hay conflictos, listo. Tu rama queda actualizada con los cambios de Cristian y los tuyos intactos.

### Si hay conflictos

VSCode te va a marcar los archivos en conflicto. Abrís cada uno y ves algo así:
```
<<<<<<< HEAD
tu código
=======
código de Cristian
>>>>>>> origin/dev
```

Resolvés quedándote con lo que corresponde (o combinando ambos), guardás el archivo y luego:
```bash
git add .
git commit -m "merge: incorpora cambios de dev"
```

---

## Regla de oro

> Antes de arrancar a trabajar cada día, actualizá tu rama con los cambios de `dev`.
```bash
git fetch origin
git merge origin/dev
```

Así los conflictos son pequeños y manejables.