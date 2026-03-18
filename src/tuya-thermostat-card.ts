import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('tuya-thermostat-card')
export class TuyaThermostatCard extends LitElement {
  @property({ type: Object }) hass: any;
  @property({ type: Object }) config: any;

  static styles = css`
    :host {
      display: block;
      font-family: var(--primary-font-family, 'Roboto', Arial, sans-serif);
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow);
      padding: 1.5em;
      min-width: 300px;
      render() {
        if (!this.hass || !this.config || !this.entity) {
          return html`<ha-card>Missing configuration</ha-card>`;
        }
        // Détection automatique de la langue
        const lang = (this.hass && this.hass.language) ? this.hass.language : 'en';
        const t = (en, fr) => lang.startsWith('fr') ? fr : en;

        const state = this.entity;
        const temp = state.attributes.current_temperature || state.attributes.temperature;
        const target = state.attributes.temperature;
        const mode = state.state;
        const modes = state.attributes.hvac_modes || ['off', 'heat', 'auto'];
        // Récupération des stats énergie
        const energyDay = state.attributes.energy_day || state.attributes.elec_statistics_day;
        const energyMonth = state.attributes.energy_month || state.attributes.elec_statistics_month;
        const energyYear = state.attributes.energy_year || state.attributes.elec_statistics_year;
        // Préparation des valeurs pour le mini-graphique (si possible)
        let energyValues: number[] = [];
        if (Array.isArray(energyDay)) {
          energyValues = energyDay;
        } else if (typeof energyDay === 'string' && energyDay.length > 0) {
          // Décodage base64 ou CSV simple si besoin
          try {
            const decoded = atob(energyDay);
            energyValues = Array.from(decoded).map(c => c.charCodeAt(0));
          } catch {
            energyValues = [];
          }
        }
        // Fenêtre ouverte ?
        const windowOpen = !!state.attributes.window_state;
        // Ajout d'une classe CSS à l'élément racine si fenêtre ouverte
        if (windowOpen) {
          this.classList.add('window-open');
        } else {
          this.classList.remove('window-open');
        }
        // Gestion des alertes (défaut/erreur)
        let alertMsg = '';
        if (state.attributes.fault && state.attributes.fault !== 0) {
          alertMsg = t('Fault detected', 'Défaut détecté') + ' (' + state.attributes.fault + ')';
        } else if (state.attributes.error && state.attributes.error !== 0) {
          alertMsg = t('Error detected', 'Erreur détectée') + ' (' + state.attributes.error + ')';
        }
        // Détection mode nuit/éco
        let ecoNightBadge = '';
        if (mode === 'eco' || mode === 'night') {
          ecoNightBadge = mode === 'eco' ? t('Eco Mode', 'Mode Éco') : t('Night Mode', 'Mode Nuit');
        }

        return html`
      background: var(--state-icon-active-color, var(--accent-color));
    }
    .footer {
      margin-top: 1.5em;
      display: flex;
      gap: 1em;
      flex-wrap: wrap;
    }
    .stat {
      font-size: 0.9em;
      color: var(--secondary-text-color, #6c757d);
    }
    .window-icon {
      color: var(--error-color, #e53935);
      margin-left: 0.5em;
      vertical-align: middle;
    }
  `;

  setConfig(config: any) {
    if (!config.entity) {
      throw new Error('Entity is required');
    }
    this.config = config;
  }

  get entity() {
    return this.hass.states[this.config.entity];
  }

  render() {
        // Gestion des alertes (défaut/erreur)
        let alertMsg = '';
        if (state.attributes.fault && state.attributes.fault !== 0) {
          alertMsg = 'Défaut détecté (' + state.attributes.fault + ')';
        } else if (state.attributes.error && state.attributes.error !== 0) {
          alertMsg = 'Erreur détectée (' + state.attributes.error + ')';
        }
    if (!this.hass || !this.config || !this.entity) {
      return html`<ha-card>Configuration manquante</ha-card>`;
    }
    const state = this.entity;
    const temp = state.attributes.current_temperature || state.attributes.temperature;
    const target = state.attributes.temperature;
    const mode = state.state;
    const modes = state.attributes.hvac_modes || ['off', 'heat', 'auto'];
    // Récupération des stats énergie
    const energyDay = state.attributes.energy_day || state.attributes.elec_statistics_day;
    const energyMonth = state.attributes.energy_month || state.attributes.elec_statistics_month;
    const energyYear = state.attributes.energy_year || state.attributes.elec_statistics_year;

    // Préparation des valeurs pour le mini-graphique (si possible)
    let energyValues: number[] = [];
    if (Array.isArray(energyDay)) {
      energyValues = energyDay;
    } else if (typeof energyDay === 'string' && energyDay.length > 0) {
      // Décodage base64 ou CSV simple si besoin
      try {
        const decoded = atob(energyDay);
        energyValues = Array.from(decoded).map(c => c.charCodeAt(0));
      } catch {
        energyValues = [];
      }
    }

    // Fenêtre ouverte ?
    const windowOpen = !!state.attributes.window_state;
    // Ajout d'une classe CSS à l'élément racine si fenêtre ouverte
    if (windowOpen) {
      this.classList.add('window-open');
    } else {
      this.classList.remove('window-open');
    }

    // Détection mode nuit/éco
    let ecoNightBadge = '';
    if (mode === 'eco' || mode === 'night') {
      ecoNightBadge = mode === 'eco' ? 'Mode Éco' : 'Mode Nuit';
    }

    return html`
      ${alertMsg ? html`<div class="alert"><span class="alert-icon">&#9888;</span> ${alertMsg}</div>` : ''}
      <div class="header">
        <div>
          <div>
            ${this.config.name || state.attributes.friendly_name}
            ${windowOpen ? html`<span class="window-icon" title="${t('Window open','Fenêtre ouverte')}">&#128719;</span>` : ''}
            ${ecoNightBadge ? html`<span class="stat" style="background:var(--state-icon-active-color,#2196f3);color:#fff;border-radius:6px;padding:0.2em 0.7em;margin-left:0.5em;">${ecoNightBadge}</span>` : ''}
          </div>
          <div class="stat">${mode.toUpperCase()}</div>
        </div>
        <div class="temp">${temp}°C</div>
      </div>
      <div class="controls">
        <button @click=${() => this._setTemp(target - 0.5)}>-</button>
        <span>${target}°C</span>
        <button @click=${() => this._setTemp(target + 0.5)}>+</button>
      </div>
      <div class="controls">
        ${modes.map((m: string) => html`
          <button class="mode-btn${mode === m ? ' selected' : ''}" @click=${() => this._setMode(m)}>${m}</button>
        `)}
      </div>
      <div class="footer">
        ${this.config.show_power && state.attributes.power ? html`<div class="stat">${t('Power','Puissance')}: ${state.attributes.power} W</div>` : ''}
        ${this.config.show_child_lock && 'child_lock' in state.attributes ? html`<div class="stat">${t('Child lock','Verrou enfant')}: ${state.attributes.child_lock ? t('On','Activé') : t('Off','Désactivé')}</div>` : ''}
        ${this.config.show_boost && 'boost' in state.attributes ? html`<div class="stat">Boost: ${state.attributes.boost ? t('On','On') : t('Off','Off')}</div>` : ''}
        ${'temp_correction' in state.attributes ? html`<div class="stat">${t('Correction','Correction')}: ${state.attributes.temp_correction}°C</div>` : ''}
        ${('upper_temp' in state.attributes || 'lower_temp' in state.attributes) ? html`<div class="stat">${t('Limits','Limites')}: ${state.attributes.lower_temp ?? '-'}°C / ${state.attributes.upper_temp ?? '-'}°C</div>` : ''}
      </div>
      <div class="footer">
        <div class="stat"><b>${t('Energy','Énergie')}</b> :
          ${energyDay ? html`${t('Day','Jour')}: ${energyDay}` : ''}
          ${energyMonth ? html`&nbsp;${t('Month','Mois')}: ${energyMonth}` : ''}
          ${energyYear ? html`&nbsp;${t('Year','Année')}: ${energyYear}` : ''}
        </div>
        ${energyValues.length > 1 ? html`
          <svg width="100" height="30" style="margin-top:0.5em;">
            <polyline
              fill="none"
              stroke="#2196f3"
              stroke-width="2"
              points="${energyValues.map((v, i) => `${i * 5},${30 - (v / Math.max(...energyValues) * 28)}`).join(' ')}"
            />
          </svg>
        ` : ''}
      </div>
    `;
  }

  _setTemp(value: number) {
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this.config.entity,
      temperature: value
    });
  }

  _setMode(mode: string) {
    this.hass.callService('climate', 'set_hvac_mode', {
      entity_id: this.config.entity,
      hvac_mode: mode
    });
  }
}

// @ts-ignore
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'tuya-thermostat-card',
  name: 'Tuya Thermostat Card',
  preview: true,
  description: 'Carte Lovelace pour contrôler un thermostat Tuya (LAN)'
});
