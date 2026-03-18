import { LitElement, html, css, property, customElement } from 'lit-element';

const TUYA_MODES: Record<string, string> = {
  Standby:     'Éteint',
  Comfort:     'Confort',
  ECO:         'Éco',
  Anti_forst:  'Hors-gel',
  Thermostat:  'Températures',
  Programming: 'Programmation',
};

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
    const hvacMode: string = climate.state; // 'off' | 'heat'
    const isOn = hvacMode !== 'off';

    // Mode détaillé (entité select séparée)
    const modeEnt = this._modeEntity;
    const currentMode: string | null = modeEnt ? modeEnt.state : null;
    const modeOptions: string[] = modeEnt ? (modeEnt.attributes.options ?? []) : [];

    // Binary sensors
    const windowOpen = this._windowEntity?.state === 'on';
    const fault = this._faultEntity?.state === 'on';
    const heating = this._heatingEntity?.state === 'on';

    // Puissance
    const powerEnt = this._powerEntity;
    const power: number | null = powerEnt ? parseFloat(powerEnt.state) : null;
    const powerUnit: string = powerEnt?.attributes.unit_of_measurement ?? 'W';

    // Statistiques électriques
    const elecEnt = this._elecEntity;
    const elecVal: string | null = elecEnt ? elecEnt.state : null;
    const elecUnit: string = elecEnt?.attributes.unit_of_measurement ?? '';

    // Verrou enfant
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

  static getStubConfig() {
    return {
      entity: 'climate.thermostat',
      mode_entity: 'select.thermostat_mode',
    };
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tuya-thermostat-card',
  name: 'Tuya Thermostat Card',
  preview: true,
  description: 'Carte Lovelace pour le thermostat Tuya (tuya_thermostat)',
});
