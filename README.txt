L'API exploitée pour obtenir les informations des trains du réseau STIF est l'API navitia. 
Une autre API de la RATP permettant d'accéder aux pictogrammes des lignes du réseau a été utilisée. 
Les cartes ont été instancié via l'API Leaflet.
Les quatre fonctionnalités du sites sont:
- la recherche des prochains horaires des trains d'une station à une certaine heure. 
Par défault, si l'heure n'est pas indiquée par l'utilisateur, c'est l'heure de la recherche (l'heure actuelle) 
qui est prise en compte.
- le tableau d'horaires qui affiche toutes les horaires de la journée actuelle pour les trains d'une station donnée
- la recherche de station sur une carte, l'utilisateur clique sur la carte et les stations situées
à moins d'un kilomètre du point cliqué sont affichés, en cliquant sur l'une d'elle on obtient les deux prochaines
horaires des trains de la station.
- l'itinéraire entre deux points que l'utilisateur choisit en cliquant sur une carte  
Le framework Jest est utilisé pour les tests unitaires.
Possibilités d'amélioration: la fonctionnalité d'itinéraire n'est pas très pratique est pourrait
grandement être améliorée en traçant le chemin des lignes de trains sur la carte et en ajoutant
la possibilité d'écrire le nom d'une station où d'une adresse au lieu de cliquer sur la carte.