# Export MailCimp To customCSV

## Description

Dit script zort er voor dat mailcimp export bestanden kunnen worden geimporeed in het backoffice van Mondovino.nl.

## Getting Started

### instaleren script

1. Clone de repo.
2. Run `npm install` in de root van de repo.

### Gebruik

1. Maak een export van de mailchimp lijst die je wilt importeren.
2. Exporteer de .xsl bestanden in exel naar een .csv bestand.
3. Sla deze op in de import map.
4. Run nu het script.

```bash
node index.js --input -input "FileName" --group "SubscribedGroups"
```

## Options

| Option  | Description                               |
| ------- | ----------------------------------------- |
| --input | The name of the file you want to import.  |
| --group | The name of the group you want to import. |
