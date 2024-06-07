# Enregistrement des Composants dans MongoDB

## Aperçu du Processus

Le processus pour enregistrer les composants de la bibliothèque dans la base de données MongoDB implique les étapes suivantes :

1. **Lecture des fichiers de composants** : Une route API lit les fichiers de composants situés dans les sous-dossiers du répertoire `src/components-library/src/components`.
2. **Mutation GraphQL pour enregistrer les composants** : Les fichiers de composants sont envoyés à une mutation GraphQL qui les enregistre dans MongoDB.

## Routes API et GraphQL

### 1. Route API pour lire les composants

Cette route API lit les fichiers `.tsx` situés dans les sous-dossiers de `src/components-library/src/components` et renvoie leur contenu sous forme de JSON. Cette route est définie dans `src/app/api/components/route.js`.

- **Méthode HTTP** : GET
- **URL** : `/api/components`
- **Fonctionnalité** : Lire les fichiers de composants des sous-dossiers et renvoyer leur contenu.

### 2. Route API GraphQL

La route API GraphQL gère les requêtes et mutations GraphQL. Cette route est définie dans `src/app/api/graphql/route.js`.

- **Méthode HTTP** : POST
- **URL** : `/api/graphql`
- **Fonctionnalité** : Gérer les requêtes et mutations GraphQL.

### 3. Mutation GraphQL pour enregistrer les composants

La mutation `saveComponents` accepte une liste de composants et les enregistre dans MongoDB. Le schéma GraphQL est défini dans `src/graphql/schema.js`.

- **Mutation** : `saveComponents`
- **Arguments** :
  - `components`: Liste d'objets de type `ComponentInput` (contenant `name` et `content`).
- **Retour** : Liste des composants enregistrés avec leur `_id`, `name` et `content`.

## Composant SaveComponentButton

Le composant `SaveComponentButton` envoie une requête GET à l'API pour lire les composants, puis envoie une mutation GraphQL pour les enregistrer dans MongoDB.

### Fonctionnalité du composant

1. **Lecture des composants** : Envoie une requête GET à `/api/components` pour lire les fichiers de composants.
2. **Enregistrement des composants** : Utilise la mutation GraphQL `saveComponents` pour enregistrer les composants récupérés dans MongoDB.

## Résumé

- **Lecture des fichiers de composants** : La route API `/api/components` lit les fichiers `.tsx` situés dans les sous-dossiers de `src/components-library/src/components`.
- **Enregistrement des composants** : Le composant `SaveComponentButton` utilise la route API pour lire les composants et envoie une mutation GraphQL à `/api/graphql` pour les enregistrer dans MongoDB.
