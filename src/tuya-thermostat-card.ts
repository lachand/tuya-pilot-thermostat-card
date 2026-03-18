import { LitElement, html, css, property, customElement } from 'lit-element';

const TUYA_MODES: Record<string, string> = {
  Standby:     'Éteint',
  Comfort:     'Confort',
  ECO:         'Éco',
  Anti_forst:  'Hors-gel',
  Thermostat:  'Températures',
  Programming: 'Programmation',
};

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
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .full { grid-column: 1 / -1; }
    label {
      display: block;
      font-size: 0.8em;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      font-size: 0.95em;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    input:focus { outline: 2px solid var(--primary-color); }
    h4 {
      grid-column: 1 / -1;
      margin: 8px 0 2px;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--secondary-text-color);
    }
    .auto-row {
      grid-column: 1 / -1;
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
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

  private _changed(key: string, e: Event) {
    const val = (e.target as HTMLInputElement).value;
    this._config = { ...this._config, [key]: val || undefined };
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
    if (!climateId || !this.hass?.entities) {
      this._autoStatus = 'Entité climate non définie ou hass.entities indisponible.';
      return;
    }

    const climateEntry = this.hass.entities[climateId];
    if (!climateEntry?.device_id) {
      this._autoStatus = 'Aucun appareil lié à cette entité.';
      return;
    }

    const deviceId: string = climateEntry.device_id;

    // Toutes les entités du même appareil
    const siblings: any[] = Object.values(this.hass.entities as Record<string, any>)
      .filter((e: any) => e.device_id === deviceId && e.entity_id !== climateId);

    const detected: Record<string, string> = {};

    for (const entry of siblings) {
      const uid: string = entry.unique_id ?? '';
      const eid: string = entry.entity_id;
      const domain: string = eid.split('.')[0];

      // Correspondance par suffixe de l'unique_id
      for (const [suffix, key] of Object.entries(SUFFIX_MAP)) {
        if (uid.endsWith(suffix)) {
          detected[key] = eid;
          break;
        }
      }

      // Sensor statistiques électriques (unique_id contient "elec" ou "electricity")
      if (domain === 'sensor' && !detected['elec_entity'] &&
          (uid.includes('elec') || uid.includes('electricity'))) {
        detected['elec_entity'] = eid;
      }
    }

    const count = Object.keys(detected).length;
    if (count === 0) {
      this._autoStatus = 'Aucune entité associée détectée.';
      return;
    }

    this._config = { ...this._config, ...detected };
    this._autoStatus = `${count} entité(s) détectée(s) automatiquement.`;
    this._fire();
  }

  private _field(key: string, label: string, placeholder = '') {
    return html`
      <div>
        <label>${label}</label>
        <input
          type="text"
          .value=${this._config[key] || ''}
          placeholder=${placeholder}
          @change=${(e: Event) => this._changed(key, e)}
        />
      </div>
    `;
  }

  render() {
    return html`
      <div class="grid">
        <div class="full">${this._field('entity', 'Entité climate *', 'climate.mon_thermostat')}</div>
        <div class="full">${this._field('name', 'Nom (optionnel)', 'Thermostat salon')}</div>

        <div class="auto-row">
          <button class="auto-btn" @click=${() => this._autoDetect()}>
            Autodétection
          </button>
          ${this._autoStatus ? html`<span class="auto-status">${this._autoStatus}</span>` : ''}
        </div>

        <h4>Entités optionnelles</h4>
        ${this._field('mode_entity',       'Select — Mode',          'select.thermostat_mode')}
        ${this._field('heating_entity',    'Binary sensor — Chauffe','binary_sensor.thermostat_chauffe')}
        ${this._field('window_entity',     'Binary sensor — Fenêtre','binary_sensor.thermostat_fenetre')}
        ${this._field('fault_entity',      'Binary sensor — Défaut', 'binary_sensor.thermostat_alarme')}
        ${this._field('power_entity',      'Sensor — Puissance',     'sensor.thermostat_puissance')}
        ${this._field('elec_entity',       'Sensor — Conso élec.',   'sensor.thermostat_electricite')}
        ${this._field('child_lock_entity', 'Switch — Verrou enfant', 'switch.thermostat_verrou')}
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
    const currentMode: string | null = modeEnt ? modeEnt.state : null;
    const modeOptions: string[] = modeEnt ? (modeEnt.attributes.options ?? []) : [];

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

        <div class="btn-row">
          <button class="chip-btn${!isOn ? ' selected' : ''}" @click=${() => this._setHvac('off')}>
            ${t('Off', 'Éteint')}
          </button>
          <button class="chip-btn${isOn ? ' selected' : ''}" @click=${() => this._setHvac('heat')}>
            ${t('Heat', 'Chauffer')}
          </button>
        </div>

        ${modeOptions.length ? html`
          <hr class="divider">
          <div class="section-label">${t('Mode', 'Mode')}</div>
          <div class="btn-row">
            ${modeOptions.map((opt: string) => html`
              <button
                class="chip-btn${currentMode === opt ? ' selected' : ''}"
                @click=${() => this._setMode(opt)}
              >${TUYA_MODES[opt] ?? opt}</button>
            `)}
          </div>
        ` : ''}

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

  private _setMode(option: string) {
    this.hass.callService('select', 'select_option', {
      entity_id: this.config.mode_entity,
      option,
    });
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tuya-thermostat-card',
  name: 'Tuya Thermostat Card',
  preview: true,
  description: 'Carte Lovelace pour le thermostat Tuya (tuya_thermostat)',
});
