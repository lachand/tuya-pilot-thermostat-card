import { LitElement, html, css, property, customElement } from 'lit-element';

// Valeur Tuya → label FR
const TUYA_MODES: Record<string, string> = {
  Standby:     'Éteint',
  Comfort:     'Confort',
  ECO:         'Éco',
  Anti_forst:  'Hors-gel',
  Thermostat:  'Températures',
  Programming: 'Programmation',
};

// Labels FR → valeur Tuya (inverse)
const MODES_FR_TO_TUYA: Record<string, string> = Object.fromEntries(
  Object.entries(TUYA_MODES).map(([k, v]) => [v, k])
);

// Liste ordonnée des labels FR (hors Éteint, géré par hvac_mode)
const ACTIVE_MODES_FR = ['Confort', 'Éco', 'Hors-gel', 'Températures', 'Programmation'];

// ---------- Éditeur visuel ----------

// Suffixes des unique_id définis dans l'intégration tuya_thermostat
const SUFFIX_MAP: Record<string, string> = {
  '_mode':        'mode_entity',
  '_heating':     'heating_entity',
  '_window':      'window_entity',
  '_fault':       'fault_entity',
  '_power':       'power_entity',
  '_child_lock':  'child_lock_entity',
  // electricity_statistics sensor : unique_id se termine par rien de spécifique,
  // on le détecte par domaine + présence de "elec" dans l'unique_id
};

@customElement('tuya-thermostat-card-editor')
export class TuyaThermostatCardEditor extends LitElement {
  @property({ type: Object }) hass: any;
  @property({ type: Object }) private _config: any = {};
  @property({ type: String }) private _autoStatus: string = '';

  static styles = css`
    .grid { display: grid; gap: 8px; }
    h4 {
      margin: 8px 0 2px;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .auto-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }
    .auto-btn {
      padding: 5px 14px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      font-size: 0.85em;
      cursor: pointer;
      white-space: nowrap;
    }
    .auto-btn:hover { background: var(--primary-color); color: #fff; }
    .auto-status { font-size: 0.8em; color: var(--secondary-text-color); }
  `;

  setConfig(config: any) {
    this._config = { ...config };
  }

  private _changed(key: string, value: string) {
    this._config = { ...this._config, [key]: value || undefined };
    this._fire();
  }

  private _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    }));
  }

  private _autoDetect() {
    const climateId: string = this._config.entity;
    if (!climateId) {
      this._autoStatus = 'Sélectionnez d\'abord l\'entité climate.';
      return;
    }

    // Stratégie 1 : via hass.entities (device_id ou config_entry_id)
    let siblings: any[] = [];
    if (this.hass?.entities) {
      const climateEntry = this.hass.entities[climateId] as any;
      if (climateEntry) {
        // Essai par config_entry_id (plus fiable que device_id)
        if (climateEntry.config_entry_id) {
          siblings = Object.values(this.hass.entities as Record<string, any>)
            .filter((e: any) => e.config_entry_id === climateEntry.config_entry_id
                              && e.entity_id !== climateId);
        }
        // Fallback : device_id
        if (siblings.length === 0 && climateEntry.device_id) {
          siblings = Object.values(this.hass.entities as Record<string, any>)
            .filter((e: any) => e.device_id === climateEntry.device_id
                              && e.entity_id !== climateId);
        }
      }
    }

    // Stratégie 2 : si hass.entities vide/indisponible, chercher par préfixe
    // dans hass.states (ex: climate.salon → cherche select.salon_*, sensor.salon_*, etc.)
    if (siblings.length === 0 && this.hass?.states) {
      const objectId = climateId.split('.')[1]; // ex: "salon_thermostat"
      // Racine commune : on retire les suffixes courants du climate
      const base = objectId.replace(/_thermostat$|_climate$/, '');
      siblings = Object.keys(this.hass.states)
        .filter(eid => eid !== climateId && eid.split('.')[1].startsWith(base))
        .map(eid => ({ entity_id: eid, unique_id: '' }));
    }

    if (siblings.length === 0) {
      this._autoStatus = 'Aucune entité associée trouvée pour ce thermostat.';
      return;
    }

    const detected: Record<string, string> = {};

    for (const entry of siblings) {
      const uid: string = (entry.unique_id ?? '').toLowerCase();
      const eid: string = entry.entity_id;
      const domain: string = eid.split('.')[0];
      const name: string = eid.split('.')[1].toLowerCase();

      // Par suffixe unique_id (intégration tuya_thermostat)
      for (const [suffix, key] of Object.entries(SUFFIX_MAP)) {
        if (uid.endsWith(suffix) && !detected[key]) {
          detected[key] = eid; continue;
        }
      }

      // Par domaine + mots-clés dans l'entity_id (fallback)
      if (domain === 'select' && !detected['mode_entity']) {
        detected['mode_entity'] = eid;
      } else if (domain === 'binary_sensor') {
        if (!detected['heating_entity'] && /heat|chauffe|running/.test(name)) {
          detected['heating_entity'] = eid;
        } else if (!detected['window_entity'] && /window|fen.tre|vitre/.test(name)) {
          detected['window_entity'] = eid;
        } else if (!detected['fault_entity'] && /fault|alarm|d.faut/.test(name)) {
          detected['fault_entity'] = eid;
        }
      } else if (domain === 'sensor') {
        if (!detected['power_entity'] && /power|puissance/.test(name)) {
          detected['power_entity'] = eid;
        } else if (!detected['elec_entity'] && /elec|conso|statistic/.test(name)) {
          detected['elec_entity'] = eid;
        }
      } else if (domain === 'switch' && !detected['child_lock_entity']
                 && /child|lock|verrou/.test(name)) {
        detected['child_lock_entity'] = eid;
      }
    }

    const count = Object.keys(detected).length;
    if (count === 0) {
      this._autoStatus = 'Aucune entité associée détectée.';
      return;
    }

    this._config = { ...this._config, ...detected };
    this._autoStatus = `${count} entité(s) détectée(s).`;
    this._fire();
  }

  private _picker(key: string, label: string, domain: string | string[], entityFilter?: (e: any) => boolean) {
    const domains = Array.isArray(domain) ? domain : [domain];
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[key] || ''}
        .includeDomains=${domains}
        .entityFilter=${entityFilter}
        .label=${label}
        allow-custom-entity
        @value-changed=${(e: CustomEvent) => this._changed(key, e.detail.value)}
      ></ha-entity-picker>
    `;
  }

  // Filtre : select avec plus de 2 options → exclut le sélecteur d'unité (c/f)
  private readonly _modeFilter = (stateObj: any) =>
    (stateObj.attributes.options?.length ?? 0) > 2;

  render() {
    return html`
      <div class="grid">
        ${this._picker('entity', 'Entité climate *', 'climate')}

        <paper-input
          .label=${'Nom (optionnel)'}
          .value=${this._config.name || ''}
          placeholder="Thermostat salon"
          @value-changed=${(e: CustomEvent) => this._changed('name', e.detail.value)}
        ></paper-input>

        <div class="auto-row">
          <button class="auto-btn" @click=${() => this._autoDetect()}>
            Autodétection
          </button>
          ${this._autoStatus ? html`<span class="auto-status">${this._autoStatus}</span>` : ''}
        </div>

        <h4>Entités optionnelles</h4>
        ${this._picker('mode_entity',       'Select — Mode',          'select', this._modeFilter)}
        ${this._picker('heating_entity',    'Binary sensor — Chauffe','binary_sensor')}
        ${this._picker('window_entity',     'Binary sensor — Fenêtre','binary_sensor')}
        ${this._picker('fault_entity',      'Binary sensor — Défaut', 'binary_sensor')}
        ${this._picker('power_entity',      'Sensor — Puissance',     'sensor')}
        ${this._picker('elec_entity',       'Sensor — Conso élec.',   'sensor')}
        ${this._picker('child_lock_entity', 'Switch — Verrou enfant', 'switch')}
      </div>
    `;
  }
}

// ---------- Carte principale ----------

@customElement('tuya-thermostat-card')
export class TuyaThermostatCard extends LitElement {
  @property({ type: Object }) hass: any;
  @property({ type: Object }) config: any;

  static styles = css`
    :host { display: block; }

    ha-card {
      font-family: var(--primary-font-family, 'Roboto', Arial, sans-serif);
      padding: 1.2em 1.4em 1em;
      box-sizing: border-box;
    }

    .alert {
      background: var(--error-color, #e53935);
      color: #fff;
      border-radius: 6px;
      padding: 0.4em 0.8em;
      margin-bottom: 0.8em;
      font-size: 0.9em;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1em;
    }

    .title {
      font-size: 1.1em;
      font-weight: 500;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      gap: 0.4em;
    }

    .badge {
      font-size: 1em;
      cursor: default;
    }

    .status-row {
      display: flex;
      gap: 0.5em;
      margin-top: 0.3em;
      flex-wrap: wrap;
    }

    .status-chip {
      font-size: 0.75em;
      border-radius: 10px;
      padding: 0.1em 0.6em;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
    }

    .status-chip.heating {
      background: var(--state-icon-active-color, #ff6f00);
      color: #fff;
    }

    .temp-current {
      font-size: 2.2em;
      font-weight: 300;
      color: var(--primary-text-color);
      line-height: 1;
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.2em;
      margin: 0.6em 0;
    }

    .temp-target {
      font-size: 1.6em;
      font-weight: 400;
      color: var(--primary-text-color);
      min-width: 4em;
      text-align: center;
    }

    .temp-btn {
      width: 2.4em;
      height: 2.4em;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #f5f5f5);
      font-size: 1.4em;
      cursor: pointer;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }

    .temp-btn:hover {
      background: var(--state-icon-active-color, var(--accent-color));
      color: #fff;
      border-color: transparent;
    }

    .divider {
      border: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      margin: 0.8em 0;
    }

    .section-label {
      font-size: 0.75em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
      margin-bottom: 0.4em;
    }

    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4em;
    }

    .chip-btn {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      padding: 0.25em 0.9em;
      font-size: 0.85em;
      cursor: pointer;
      background: transparent;
      color: var(--primary-text-color);
      transition: all 0.15s;
    }

    .chip-btn:hover {
      border-color: var(--state-icon-active-color, var(--accent-color));
      color: var(--state-icon-active-color, var(--accent-color));
    }

    .chip-btn.selected {
      background: var(--state-icon-active-color, var(--accent-color));
      border-color: transparent;
      color: #fff;
      font-weight: 500;
    }

    .footer {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      margin-top: 0.6em;
    }

    .stat {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }

    .stat b {
      color: var(--primary-text-color);
    }
  `;

  setConfig(config: any) {
    if (!config.entity) throw new Error('entity (climate) est requis');
    this.config = config;
  }

  static getConfigElement() {
    return document.createElement('tuya-thermostat-card-editor');
  }

  static getStubConfig() {
    return {
      entity: 'climate.thermostat',
      mode_entity: 'select.thermostat_mode',
    };
  }

  private get _climate() { return this.hass?.states[this.config.entity]; }
  private get _modeEntity() { return this.config.mode_entity ? this.hass?.states[this.config.mode_entity] : null; }
  private get _windowEntity() { return this.config.window_entity ? this.hass?.states[this.config.window_entity] : null; }
  private get _faultEntity() { return this.config.fault_entity ? this.hass?.states[this.config.fault_entity] : null; }
  private get _heatingEntity() { return this.config.heating_entity ? this.hass?.states[this.config.heating_entity] : null; }
  private get _powerEntity() { return this.config.power_entity ? this.hass?.states[this.config.power_entity] : null; }
  private get _childLockEntity() { return this.config.child_lock_entity ? this.hass?.states[this.config.child_lock_entity] : null; }
  private get _elecEntity() { return this.config.elec_entity ? this.hass?.states[this.config.elec_entity] : null; }

  render() {
    if (!this.hass || !this.config || !this._climate) {
      return html`<ha-card><div style="padding:1em;color:var(--error-color)">Configuration manquante — vérifiez l'entity.</div></ha-card>`;
    }

    const lang = (this.hass.language as string) || 'en';
    const t = (en: string, fr: string) => lang.startsWith('fr') ? fr : en;

    const climate = this._climate;
    const currentTemp: number | undefined = climate.attributes.current_temperature;
    const targetTemp: number | undefined = climate.attributes.temperature;
    const hvacMode: string = climate.state;
    const isOn = hvacMode !== 'off';

    const modeEnt = this._modeEntity;
    // state de l'entité select = label FR (ex: "Confort") ou null
    const currentMode: string | null = modeEnt ? modeEnt.state : null;
    // Options : depuis l'entité select si dispo, sinon liste hardcodée
    const modeOptions: string[] = modeEnt?.attributes.options?.length
      ? modeEnt.attributes.options
      : ACTIVE_MODES_FR;

    const windowOpen = this._windowEntity?.state === 'on';
    const fault = this._faultEntity?.state === 'on';
    const heating = this._heatingEntity?.state === 'on';

    const powerEnt = this._powerEntity;
    const power: number | null = powerEnt ? parseFloat(powerEnt.state) : null;
    const powerUnit: string = powerEnt?.attributes.unit_of_measurement ?? 'W';

    const elecEnt = this._elecEntity;
    const elecVal: string | null = elecEnt ? elecEnt.state : null;
    const elecUnit: string = elecEnt?.attributes.unit_of_measurement ?? '';

    const childLockEnt = this._childLockEntity;
    const childLock: boolean | null = childLockEnt ? childLockEnt.state === 'on' : null;

    const name: string = this.config.name || climate.attributes.friendly_name || 'Thermostat';
    const modeLabel = currentMode ? (TUYA_MODES[currentMode] ?? currentMode) : null;

    return html`
      <ha-card>
        ${fault ? html`
          <div class="alert">⚠ ${t('Fault detected — check your device.', 'Défaut détecté — vérifiez l\'appareil.')}</div>
        ` : ''}

        <div class="header">
          <div>
            <div class="title">
              ${name}
              ${windowOpen ? html`<span class="badge" title="${t('Window open', 'Fenêtre ouverte')}">🪟</span>` : ''}
              ${childLock ? html`<span class="badge" title="${t('Child lock', 'Verrou enfant')}">🔒</span>` : ''}
            </div>
            <div class="status-row">
              ${isOn ? html`<span class="status-chip${heating ? ' heating' : ''}">
                ${heating ? t('Heating', 'En chauffe') : t('Idle', 'En attente')}
              </span>` : html`<span class="status-chip">${t('Off', 'Éteint')}</span>`}
              ${modeLabel ? html`<span class="status-chip">${modeLabel}</span>` : ''}
            </div>
          </div>
          <div class="temp-current">
            ${currentTemp !== undefined ? `${currentTemp}°` : '--'}
          </div>
        </div>

        <div class="controls">
          <button class="temp-btn" @click=${() => this._adjustTemp(-0.5)}>−</button>
          <span class="temp-target">${targetTemp !== undefined ? `${targetTemp}°C` : '--'}</span>
          <button class="temp-btn" @click=${() => this._adjustTemp(+0.5)}>+</button>
        </div>

        <hr class="divider">

        <div class="section-label">${t('Mode', 'Mode')}</div>
        <div class="btn-row">
          <button class="chip-btn${!isOn ? ' selected' : ''}" @click=${() => this._setHvac('off')}>
            ${t('Off', 'Éteint')}
          </button>
          ${modeOptions.map((opt: string) => html`
            <button
              class="chip-btn${isOn && currentMode === opt ? ' selected' : ''}"
              @click=${() => this._activateMode(opt)}
            >${TUYA_MODES[opt] ?? opt}</button>
          `)}
        </div>

        ${(power !== null || elecVal !== null) ? html`
          <hr class="divider">
          <div class="footer">
            ${power !== null ? html`<span class="stat">${t('Power', 'Puissance')}: <b>${power} ${powerUnit}</b></span>` : ''}
            ${elecVal !== null ? html`<span class="stat">${t('Consumption', 'Conso')}: <b>${elecVal} ${elecUnit}</b></span>` : ''}
          </div>
        ` : ''}
      </ha-card>
    `;
  }

  private _adjustTemp(delta: number) {
    const current = this._climate?.attributes.temperature ?? 20;
    const next = Math.round((current + delta) * 2) / 2;
    this.hass.callService('climate', 'set_temperature', {
      entity_id: this.config.entity,
      temperature: next,
    });
  }

  private _setHvac(mode: string) {
    this.hass.callService('climate', 'set_hvac_mode', {
      entity_id: this.config.entity,
      hvac_mode: mode,
    });
  }

  private _activateMode(optionFr: string) {
    // Allumer si éteint
    if (this._climate?.state === 'off') {
      this.hass.callService('climate', 'set_hvac_mode', {
        entity_id: this.config.entity,
        hvac_mode: 'heat',
      });
    }
    if (this.config.mode_entity) {
      // L'entité select attend un label FR (défini dans l'intégration)
      this.hass.callService('select', 'select_option', {
        entity_id: this.config.mode_entity,
        option: optionFr,
      });
    } else {
      // Sans mode_entity : écriture directe via climate preset_mode si disponible,
      // sinon on ne peut pas changer le mode — juste allumer suffit
    }
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tuya-thermostat-card',
  name: 'Tuya Thermostat Card',
  preview: true,
  description: 'Carte Lovelace pour le thermostat Tuya (tuya_thermostat)',
});
