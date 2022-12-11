# Madrasati


### Description
Dans le cadre du projet d’intégration de la troisième année licence en Technologies de l'Inforatique spécialité Développement des Systèmes d’Information, on souhaite développer une application cross plateforme Ionic/VueJS dynamique, moderne, attractif et professionnel. Le projet consiste a instaurer une plateforme de communication pour les écoles primaires.

Vous trouvez dans ce Repository la base du projet à développer. La partie de l'authentification est déjà implémentée, c'est à vous de reprendre le développement de votre partie concernée.

---

## Installation

Placez-vous dans le dossier où vous souhaitez sauvegarder ce projet. Puis, exécutez les commandes suivantes en utilisant **Git Bash**

```sh
git clone https://github.com/kg-boss/madrasati.git madrasati
cd madrasati
npm install
```

## Consignes Importantes

### 1. APIs
Les APIs d'authenification sont sauvegardés dans le ficher `src/config/urls.ts`.
```sh
├── src
│   ├── config
│   │   ├── urls.ts
│   ├── router
│   ├── theme
│   ├── views
│   ├── ...
├── ...
```
Veuillez configuer l'URL de base de votre Backend. Pour ce faire, veuillez modifier la ligne suivante du fichier `urls.ts`
```ts
const BASE_URL = "http://YOUR_BACKEND_SERVER_IP_ADDRESS/Madrasati/public/api";
```
L'URL de base est configuré pour une application nommée ***Madrasati*** développée en ***Laravel/Php*** qui s'exécute sur un serveur ***Laragon***. Cela explique d'où vienne le `Madrasati/public`. Le dernier `/api` est ajouté en tant que raccourci puisque toutes les routes sont des APIs. Vous pouvez remplacer la totalité de l'URL selon votre besoin, à condition que la modification n'interfère pas avec le bon fonctionnement des APIs d'authentification.

##### Rôle

Veuillez mentionner le rôle de l'utilisateur de votre application:
+ `admin`: Un administrateur
+ `teacher`: Un enseignant
+ `parent`: Un parent
+ `student`: Un élève
Pour ce faire, veuillez modifier la valeur `YOUR_ROLE` dans le même fichier `urls.ts`
```ts
const UrlResolver = {

    role: "YOUR_ROLE", // Choose ONE of the following: ['admin', 'teacher', 'parent', 'student']

    ...
}
```


##### NOTE
Il est recommandé de configurer tous les autres liens dans le même fichier, à condition qu'il y ait pas une confusion avec les liens prédéfinis

```ts
const UrlResolver = {

    ...

    // Exemple d'un nouvel API qui s'exécute sur le même serveur d'authenitifacation
    monNouveauApi: BASE_URL + "/chemainDeMonNouveauAPI",

    // Exemple d'un nouvel API qui s'exécute un serveur différent
    monDeuxiemeApi: "http://mondomaine.tld/chemainmonDeuxiemeAPI",

}
```

### 2. Authentification

L'authentification se base sur un système simple de connection avec un `email` et un `mot de passe`. Il est possible de demander le changement de `mot de passe` en cas d'oubli par l'intermidiare d'un courrier électronique. Il est possible de créer un compte mais à condition que les données de l'utilisateur soient déjà existantes dans la base. Ceci est vérifié à l'aide d'un identifiant unique (IDU) qui doit être fourni lors de la création du compte. Cet IDU est fourni par l'administration.

Dans ce projet, 3 pages sont créées pour l'authentification. Elles sont placées dans le dossier `src/views/auth`
```sh
├── src
│   ├── config
│   ├── router
│   ├── theme
│   ├── views
│   │   ├── auth
│   │   │   ├── ForgotPasswordPage.vue
│   │   │   ├── LoginPage.vue
│   │   │   ├── RegisterPage.vue
│   │   ├── HomePage.vue
│   ├── ...
├── ...
```

> Le router est déjà configuré pour se déplacer entre ces 3 pages. La page `LoginPage` est configurée en tant que point d'entrer à l'application

##### NOTE
Après une connexion réussie, l'utilisateur est redirigé vers la page `HomePage` avec un ***Token*** d'authentification. Ce ***Token*** sera requis pour tout autre API pour confirmer l'identité de l'utilisateur. Assurez que ce ***Token*** est transmis entre tous différents pages.

## Contribution

Prière de ne pas modifier le code source sur **GitHub** (`no pushing`). Ce projet sert comme un point pour entamer le développement de l'application. Ce repository n'est pas conçu pour englober la totalité de l'application.

Veuillez me contacter pour toute suggestion

