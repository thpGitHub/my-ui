- thierry poupon

- [Component library on npm ](https://www.npmjs.com/package/my-react-ui-components)

- [Repo documentation component library ](https://github.com/thpGitHub/my-ui-doc)

Le projet n'est pas en ligne car je n'ai pas encore créé une authentification. Il faut cloner le projet pour le tester localement.

## Étapes pour configurer le projet

### 1. Cloner le dépôt

Clonez le dépôt du projet sur votre machine locale :

```bash
git clone https://github.com/thpGitHub/my-ui.git
cd your-repository
```

### 2. Créer un fichier .env.local

Créez un fichier .env.local à la racine du projet my-ui avec la variable d'environnement suivante :

```bash
MONGODB_URI=your_mongodb_connection_string
```

Remplacez your_mongodb_connection_string par votre chaîne de connexion MongoDB.

### 3. Installer les dépendances

Installez les dépendances du projet en exécutant la commande suivante :

```bash
npm install
```

### 4. Démarrer le serveur de développement

Pour démarrer le serveur de développement, exécutez la commande suivante :

```bash
npm run dev
```

### Structure de la base de données MongoDB

Voici un exemple de document dans la base de données MongoDB utilisé par le projet :

```json
{
  "_id": "611f7b4b7f3b3b001f3b3b3b",
  "name": "Button",
  "content": "import React from 'react';\n\nconst Button = ({ text }) => {\n  return <button>{text}</button>;\n};\n\nexport default Button;"
}
```

---

# Enregistrement des Composants dans MongoDB

## Contexte Général

Nous avons une application Next.js qui gère le back-office de notre librairie de composants. Cette librairie de composants est intégrée à l'intérieur de l'application Next.js et utilise React. La librairie de composants a deux rôles principaux :

1. **Créer des composants React** : Développer et maintenir une collection de composants React réutilisables.
2. **Publier les composants sur npm** : Permettre la distribution et la réutilisation des composants via npm.

```plaintext
my-ui/
│
├── src/
│ ├── app/
│ │ ├── api/
│ │ ├── components/
│ │ └── page.tsx
│ ├── components-library/
│ │ ├── src/
│ │ │ └── components/
│ │ │ ├── Button/
│ │ │ │ ├── Button.tsx
│ │ │ │ └── index.ts
│ │ │ └── ...
│ │ ├── package.json
│ │ └── ...
│ ├── graphql/
│ ├── lib/
│ ├── .env.local
│ ├── package.json
│ └── ...
```

# Librairie de Composants

## Fonctionnement de la Librairie

La librairie de composants est une collection de composants React situés dans le dossier `src/components-library/src/components`. Chaque composant est dans son propre sous-dossier et peut être importé et utilisé dans d'autres projets.

### Scripts de la Librairie

Dans le fichier `package.json` de la librairie, il y a les scripts nécessaires pour compiler et publier la librairie. Voici un exemple de configuration.

# Application Next.js

## Processus d'Utilisation de l'Application Back-Office

### Création d'un Composant

Créez un nouveau composant React dans le dossier `src/components-library/src/components`. Par exemple, vous pouvez créer un composant `Button` dans `src/components-library/src/components/Button/Button.tsx`.

### Exécution des Scripts

Exécutez les scripts définis dans `package.json` pour compiler et préparer le composant pour la publication.

```bash
"build:beforeNpmPublish": "npm run clean && npm run build:types && npm run build:components && node scripts/copyIndexFiles.js"
```

### Publication sur npm

```bash
npm publish
```

# Enregistrement des Composants via le Back-Office

## Accéder au Back-Office

Ouvrez l'application Next.js dans votre navigateur.

## Cliquer sur SaveComponentButton

Cliquez sur le bouton `SaveComponentButton` pour enregistrer les composants dans MongoDB. Cela déclenche le processus suivant :

1. **Requête GET à /api/components** : Le composant `SaveComponentButton` envoie une requête GET à l'API pour lire les fichiers de composants.
2. **Lecture des fichiers de composants** : La route API lit les fichiers `.tsx` dans les sous-dossiers de `src/components-library/src/components` et renvoie leur contenu sous forme de JSON.
3. **Mutation GraphQL saveComponents** : Les fichiers de composants sont ensuite envoyés via une mutation GraphQL à `/api/graphql` pour être enregistrés dans MongoDB.

# Routes API et GraphQL

## Route API pour lire les composants

Cette route API lit les fichiers `.tsx` situés dans les sous-dossiers de `src/components-library/src/components` et renvoie leur contenu sous forme de JSON. Cette route est définie dans `src/app/api/components/route.js`.

- **Méthode HTTP** : GET
- **URL** : `/api/components`
- **Fonctionnalité** : Lire les fichiers de composants des sous-dossiers et renvoyer leur contenu.

## Route API GraphQL

La route API GraphQL gère les requêtes et mutations GraphQL. Cette route est définie dans `src/app/api/graphql/route.js`.

- **Méthode HTTP** : POST
- **URL** : `/api/graphql`
- **Fonctionnalité** : Gérer les requêtes et mutations GraphQL.

# Mutation GraphQL pour enregistrer les composants

La mutation `saveComponents` accepte une liste de composants et les enregistre dans MongoDB. Le schéma GraphQL est défini dans `src/graphql/schema.js`.

- **Mutation** : `saveComponents`
- **Arguments** :
  - `components`: Liste d'objets de type `ComponentInput` (contenant `name` et `content`).
- **Retour** : Liste des composants enregistrés avec leur `_id`, `name` et `content`.
