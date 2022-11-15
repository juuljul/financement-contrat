# finance-contrat

## Le projet


Ce projet de financement participatif permet à des utilisateurs de financer en __ethers__ un contrat décentralisé, et au premier contributeur de pouvoir récupérer les gains du contrat au moment où il le souhaite.


## Utilisation


Ce projet s'utilise avec l'extension __metamask__ ajoutée à votre navigateur.

Cloner le projet.

Pour lancer le projet, aller dans le dossier frontend
```
cd frontend
yarn start
```
(si ce n'est pas fait automatiquement aller à l'url http://localhost:3000/)

Pour activer des comptes sur le réseau localhost, aller dans le dossier backend
```
cd backend
yarn hardhat node
```

Au besoin, rajouter le réseau hardhat-localhost à l'extension metamask (chainid 31337).

Importer un ou plusieurs comptes via leur private key dans l'extension metamask.

Ces comptes permettront de financer le contrat.


