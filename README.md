Pour lancer l'application mobile en mode développeur, deux cas possibles:

1) Vous disposez d'un portable ou d'une tablette capable de lancer l'application
    -Entrer la commande "npm install" pour récupérer le dossier node_modules
	-Installer l'application Expo sur le portable
	-Ouvrir un terminal de commande (comme git Bash par exemple)
	-Avec les commandes, se déplacer jusqu'à la source du projet de l'application mobile
	-Entrer la commande "npm start" ou bien "npm run android"
	-Expo Development Tools se lance
	-Mettre la connection en "Tunnel" ("LAN" est choisi par défaut)
	-Sur le portable, lancer Expo et cliquer sur "Scan QR Code"
	-Scanner le QR Code qui se trouve sur le fenêtre d'Expo Development Tools
	-L'application se lance sur le portable
	
2) Vous ne disposez pas de portable ou tablette capable de lancer l'application

    -Entrer la commande "npm install" pour récupérer le dossier node_modules
	-Lancer Android Studio
	-Ouvrir le projet mobile
	-Dans le terminal, entrer la commande "npm run android"
	-Lancer l'émulateur d'Android Studio
	-Dans la fenêtre d'Expo Development Tools, cliquer sur "Run on android device/emulator"