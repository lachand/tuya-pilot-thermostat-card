# Tuya Thermostat Card

Carte Lovelace Home Assistant pour le contrôle des thermostats Tuya (LAN).

## Fonctionnalités principales
- Affichage et réglage de la température
- Sélection du mode (off, heat, auto...)
- Affichage de l'état (chauffe, standby...)
- Contrôle du verrou enfant, boost, vacances
- Affichage de la puissance, statistiques, etc.

## Installation
1. Copier le contenu du dossier dans `www/community/tuya-thermostat-card` de Home Assistant
2. Ajouter la ressource dans l'interface Lovelace
3. Utiliser la carte dans votre dashboard

## Exemple de configuration
```yaml
type: custom:tuya-thermostat-card
entity: climate.votre_thermostat
name: Salon
show_power: true
show_child_lock: true
show_boost: true
```

## Dépendances
- Home Assistant >= 2024.1
- Intégration custom `tuya_thermostat` (LAN)

## Développement
Inspiré de [tuya-ev-charger-card](https://github.com/lachand/tuya-ev-charger-card)

## Licence
MIT
