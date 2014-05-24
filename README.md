Versicherungsanbindung SAGA Projekt.

Um dieses Projekt bauen und deployen zu können müssen folgende Programme installiert sein:

* node.js
* npm (Node Package Manager, Teil der node.js Installation)
* grunt (Build Management):

Für die reine Entwicklung sind diese Programme zwar nicht notwendig, aber zumindest für Build und Deployment sind sie zwingend notwendig.
Ausserdem kann die Applikation über grunt als kleinen Webserver auch lokal ausgeführt werden.

Installationsanleitung:
===========================================
1. node.js installieren (http://www.nodejs.org), dabei wird auch gleich "npm" mitinstalliert
3. Proxy für npm setzen, folgendes auf der Kommandozeile ausführen:
   npm set http-proxy http://proxy:80
   npm set https-proxy http://proxy:80
4. grunt-cli global installieren, wieder auf der Kommandozeile ausführen:

        npm install -g grunt-cli

   Danach sollte der Befehl "grunt.cmd" über die Kommandozeile ausführbar sein

5. Jetzt müssen im Hauptordner dieses Projekts (hwa-mobile) noch die lokalen (projektspezifischen) node.js Abhängigkeiten
   (ähnlich Maven-Abhängigkeiten) installiert werden:

        npm install

   Fertig.

Lokales Ausführen
============================================

Die Ajax-Requests gegen den Rest-Service funktionieren nicht, wenn man die index.html über das Dateisystem im Browser öffnet, dies
wird vom Browser gesperrt. Deshalb muss die Applikation immer über einen Webserver abgerufen werden. Das Build-System hat dafür ein
spezielles Build-Target vorgesehen.

Folgenden Befehl kann man auf der Kommandozeile ausführen:

   grunt web

Dieser Befehl startet einen kleinen Webserver auf Port 8000, die Applikation kann dann im Browser geöffnet werden:

   http://localhost:8000/src/main/index.html

Nebenbei führt dieser Befehl bei Änderungen im Source-Code auch automatisch ein jsLint durch und führt auch die Unit-
und UI-Tests aus. Die Ausgaben sind dann in der Konsole sichtbar.


Build und Deployment
============================================

Ähnlich einem Ant-Projekt unterstützt dieses Projekt bestimmte Build-Tasks die über grunt ausführbar sind.

Achtung: unter Windows muss der Aufruf von grunt immer mittels "grunt <task>" erfolgen.

Folgende Tasks werden u.a. momentan unterstützt:

	clean - Löscht das Build-Verzeichnis

	jshint - führt Code-Qualitätsprüfung "jsLint" durch

	install[:systemumgebung] - baut die Anwendung im "target"-Ordner zusammen, kopiert alle notwendigen Dateien, fügt
				alle JS-Dateien in eine einzige zusammen, Ergebnis ist eine Deploy-fähige Dateistruktur. Die Angabe der
				Systemumgebung ist dabei optional. Wenn angegeben, wird die entsprechende Konfigurationsdatei benutzt,
				um das Artefakt zu erstellen, z.B. prod, qs, perfest, etc. Wenn die Systemumgebung fehlt, wird die
				Standard-Konfigurationsdatei benutzt, wie sie im Source-Code verwendet wird.

	deploy[:systemumgebung] - führt den "install"-Task mit der angegebenen Systemumgebung durch und kopiert das
				entstehende Artefakt in den in der package.json konfigurierten Deployment-Ordner. Die Angabe der
				Systemumgebung ist dabei optional. Wenn angegeben, wird die entsprechende Konfigurationsdatei benutzt,
				den install-Task auszuführen, z.B. prod, qs, perfest, etc. Das Artefakt wird im Deployment-Ordner in
				einen der Systemumgebung entsprechenden Unterordner kopiert oder wenn die Systemumgebung fehlt direkt
				im Deployment-Ordner abgelegt.
	licenses: erstellt eine Liste aller im Projekt benutzten Pakete, deren Lizenz und deren Homepage (falls bekannt),
				in der Datei LICENSES aus (standardmässig als CSV)

Beispiele:
  grunt deploy:qs
  grunt install:wstest
  grunt deploy

