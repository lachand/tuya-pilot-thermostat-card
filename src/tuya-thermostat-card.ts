import { LitElement, html, css, property, customElement } from 'lit-element';

// ── Font injection (une seule fois dans document.head) ─────────────────────
(() => {
  if (document.querySelector('#kinetic-fonts')) return;
  const link = Object.assign(document.createElement('link'), {
    id: 'kinetic-fonts', rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap',
  });
  document.head.appendChild(link);
})();

// ── Modes Tuya ─────────────────────────────────────────────────────────────
interface ModeInfo { fr: string; icon: string; color: string }
const MODES: Record<string, ModeInfo> = {
  Standby:     { fr: 'Éteint',    icon: 'power_settings_new',  color: '#adaaaa' },
  Comfort:     { fr: 'Confort',   icon: 'local_fire_department',color: '#8eff71' },
  ECO:         { fr: 'Éco',       icon: 'eco',                  color: '#6bfe9c' },
  Anti_forst:  { fr: 'Hors-gel',  icon: 'ac_unit',              color: '#69daff' },
  Thermostat:  { fr: 'Temp.',     icon: 'device_thermostat',    color: '#8eff71' },
  Programming: { fr: 'Prog.',     icon: 'schedule',             color: '#69daff' },
};

const FR_TO_KEY: Record<string, string> = Object.fromEntries(
  Object.entries(MODES).map(([k, v]) => [v.fr, k])
);

// ── Éditeur visuel ─────────────────────────────────────────────────────────
const SUFFIX_MAP: Record<string, string> = {
  '_mode':        'mode_entity',
  '_heating':     'heating_entity',
  '_window':      'window_entity',
  '_fault':       'fault_entity',
  '_power':       'power_entity',
  '_child_lock':  'child_lock_entity',
  '_upper_temp':  'upper_temp_entity',
  '_lower_temp':  'lower_temp_entity',
  '_boost':       'boost_entity',
  '_holiday':     'holiday_entity',
};

@customElement('tuya-thermostat-card-editor')
export class TuyaThermostatCardEditor extends LitElement {
  @property({ type: Object }) hass: any;
  @property({ type: Object }) private _config: any = {};
  @property({ type: String }) private _autoStatus: string = '';

  static styles = css`
    .grid { display: grid; gap: 8px; }
    h4 {
      margin: 10px 0 2px;
      font-size: 0.75em;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--secondary-text-color);
    }
    .auto-row { display: flex; align-items: center; gap: 8px; margin: 6px 0; }
    .auto-btn {
      padding: 5px 14px;
      border-radius: 4px;
      border: 1px solid var(--primary-color);
      background: transparent;
      color: var(--primary-color);
      font-size: 0.85em;
      cursor: pointer;
    }
    .auto-btn:hover { background: var(--primary-color); color: #fff; }
    .auto-status { font-size: 0.78em; color: var(--secondary-text-color); }
  `;

  setConfig(config: any) { this._config = { ...config }; }

  private _changed(key: string, value: string) {
    this._config = { ...this._config, [key]: value || undefined };
    this._fire();
  }

  private _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config }, bubbles: true, composed: true,
    }));
  }

  private _autoDetect() {
    const cid: string = this._config.entity;
    if (!cid) { this._autoStatus = "Sélectionnez d'abord l'entité climate."; return; }

    let siblings: any[] = [];
    if (this.hass?.entities) {
      const entry = this.hass.entities[cid] as any;
      if (entry?.config_entry_id) {
        siblings = Object.values(this.hass.entities as Record<string, any>)
          .filter((e: any) => e.config_entry_id === entry.config_entry_id && e.entity_id !== cid);
      } else if (entry?.device_id) {
        siblings = Object.values(this.hass.entities as Record<string, any>)
          .filter((e: any) => e.device_id === entry.device_id && e.entity_id !== cid);
      }
    }
    if (!siblings.length && this.hass?.states) {
      const base = cid.split('.')[1].replace(/_thermostat$|_climate$/, '');
      siblings = Object.keys(this.hass.states)
        .filter(e => e !== cid && e.split('.')[1].startsWith(base))
        .map(e => ({ entity_id: e, unique_id: '' }));
    }
    if (!siblings.length) { this._autoStatus = 'Aucune entité associée trouvée.'; return; }

    const det: Record<string, string> = {};
    for (const e of siblings) {
      const uid = (e.unique_id ?? '').toLowerCase();
      const eid: string = e.entity_id;
      const dom = eid.split('.')[0];
      const nm  = eid.split('.')[1].toLowerCase();

      for (const [sfx, key] of Object.entries(SUFFIX_MAP)) {
        if (uid.endsWith(sfx) && !det[key]) { det[key] = eid; break; }
      }
      if (dom === 'select' && !det.mode_entity) {
        // Exclure le sélecteur d'unité (c/f) : le mode a forcément plus de 2 options
        const opts = this.hass?.states[eid]?.attributes?.options;
        if (!opts || opts.length > 2) det.mode_entity = eid;
      } else if (dom === 'binary_sensor') {
        if (!det.heating_entity  && /heat|chauffe|running/.test(nm)) det.heating_entity = eid;
        else if (!det.window_entity  && /window|fen|vitre/.test(nm))  det.window_entity = eid;
        else if (!det.fault_entity   && /fault|alarm|d.faut/.test(nm)) det.fault_entity = eid;
      } else if (dom === 'sensor') {
        if (!det.power_entity && /power|puissance/.test(nm)) det.power_entity = eid;
        else if (!det.elec_entity && /elec|conso|statistic/.test(nm)) det.elec_entity = eid;
      } else if (dom === 'switch' && !det.child_lock_entity && /child|lock|verrou/.test(nm)) {
        det.child_lock_entity = eid;
      } else if (dom === 'number') {
        if (!det.upper_temp_entity && /upper|haute|max/.test(nm))    det.upper_temp_entity = eid;
        else if (!det.lower_temp_entity && /lower|basse|min/.test(nm)) det.lower_temp_entity = eid;
        else if (!det.boost_entity && /boost/.test(nm))               det.boost_entity = eid;
        else if (!det.holiday_entity && /holiday|vacanc/.test(nm))    det.holiday_entity = eid;
      }
    }
    const n = Object.keys(det).length;
    if (!n) { this._autoStatus = 'Aucune entité détectée.'; return; }
    this._config = { ...this._config, ...det };
    this._autoStatus = `${n} entité(s) détectée(s).`;
    this._fire();
  }

  private _picker(key: string, label: string, domain: string | string[], filter?: (e: any) => boolean) {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${this._config[key] || ''}
        .includeDomains=${Array.isArray(domain) ? domain : [domain]}
        .entityFilter=${filter}
        .label=${label}
        allow-custom-entity
        @value-changed=${(e: CustomEvent) => this._changed(key, e.detail.value)}
      ></ha-entity-picker>
    `;
  }

  // Filtre : select avec plus de 2 options → exclut le sélecteur d'unité (c/f)
  private readonly _modeFilter = (s: any) => (s.attributes.options?.length ?? 0) > 2;

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
          <button class="auto-btn" @click=${() => this._autoDetect()}>Autodétection</button>
          ${this._autoStatus ? html`<span class="auto-status">${this._autoStatus}</span>` : ''}
        </div>

        <h4>Contrôle</h4>
        ${this._picker('mode_entity', 'Select — Mode', 'select', this._modeFilter)}

        <h4>Surveillance</h4>
        ${this._picker('heating_entity', 'Binary sensor — Chauffe',  'binary_sensor')}
        ${this._picker('window_entity',  'Binary sensor — Fenêtre',  'binary_sensor')}
        ${this._picker('fault_entity',   'Binary sensor — Défaut',   'binary_sensor')}

        <h4>Énergie</h4>
        ${this._picker('power_entity', 'Sensor — Puissance',    'sensor')}
        ${this._picker('elec_entity',  'Sensor — Conso élec.',  'sensor')}

        <h4>Paramètres avancés</h4>
        ${this._picker('child_lock_entity',  'Switch — Verrou enfant',       'switch')}
        ${this._picker('upper_temp_entity',  'Number — Limite haute (°C)',   'number')}
        ${this._picker('lower_temp_entity',  'Number — Limite basse (°C)',   'number')}
        ${this._picker('boost_entity',       'Number — Durée boost (min)',   'number')}
        ${this._picker('holiday_entity',     'Number — Mode vacances (j)',   'number')}
      </div>
    `;
  }
}

// ── Carte principale ───────────────────────────────────────────────────────
type Tab = 'climate' | 'energy' | 'settings' | 'schedule';

@customElement('tuya-thermostat-card')
export class TuyaThermostatCard extends LitElement {
  @property({ type: Object }) hass: any;
  @property({ type: Object }) config: any;
  @property({ type: String, attribute: false }) private _tab: Tab = 'climate';

  static styles = css`
    :host { display: block; }

    ha-card {
      background: #0e0e0e;
      border-radius: 16px;
      overflow: hidden;
      padding: 0;
    }

    /* ── Root layout ── */
    .k {
      display: flex;
      flex-direction: column;
      min-height: 520px;
      font-family: 'Inter', var(--primary-font-family, sans-serif);
      color: #ffffff;
    }

    /* ── Material Symbols ── */
    .ms {
      font-family: 'Material Symbols Outlined';
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      font-size: 1.3em;
      line-height: 1;
    }
    .ms.fill { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

    /* ── Header ── */
    .k-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 18px 12px;
      background: #131313;
    }
    .k-logo {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1em;
      letter-spacing: 0.15em;
      color: #8eff71;
      text-transform: uppercase;
    }
    .k-chips { display: flex; gap: 6px; align-items: center; }
    .k-chip {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 100px;
      background: #262626;
      color: #adaaaa;
    }
    .k-chip.on  { background: rgba(142,255,113,.15); color: #8eff71; }
    .k-chip.err { background: rgba(255,115,81,.15);  color: #ff7351; }

    /* ── Scrollable content ── */
    .k-content { flex: 1; overflow-y: auto; }

    /* ── Alert ── */
    .k-alert {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 12px 16px 0;
      padding: 10px 14px;
      border-radius: 10px;
      background: rgba(185,41,2,.15);
      border: 1px solid rgba(255,115,81,.25);
      font-size: 0.82em;
      font-weight: 600;
      color: #ff7351;
    }

    /* ── Gauge ── */
    .k-gauge-wrap {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 20px 4px;
    }
    .k-gauge-svg { width: 200px; height: 200px; }
    .k-gauge-inner {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -44%);
      text-align: center;
      pointer-events: none;
    }
    .k-temp-label {
      font-size: 0.58em;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #adaaaa;
    }
    .k-temp-current {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 3.6em;
      font-weight: 700;
      line-height: 1;
    }
    .k-temp-current sup { font-size: 0.3em; color: #8eff71; vertical-align: super; }
    .k-glow {
      position: absolute;
      width: 110px; height: 110px;
      background: radial-gradient(circle, rgba(142,255,113,.07), transparent 70%);
      border-radius: 50%;
      top: 50%; left: 50%;
      transform: translate(-50%, -44%);
      pointer-events: none;
    }

    /* ── Target temp controls ── */
    .k-target {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 2px 20px 14px;
    }
    .k-target-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.7em;
      font-weight: 400;
      min-width: 4.5em;
      text-align: center;
    }
    .k-btn-round {
      width: 42px; height: 42px;
      border-radius: 50%;
      border: 1px solid #484847;
      background: #1a1a1a;
      color: #8eff71;
      font-size: 1.3em;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .15s;
    }
    .k-btn-round:hover { background: #8eff71; color: #0d6100; border-color: transparent; }

    /* ── Mode grid ── */
    .k-modes-wrap { padding: 0 14px 14px; }
    .k-section-label {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #adaaaa;
      margin-bottom: 10px;
    }
    .k-modes {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
    }
    .k-mode-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 12px 4px;
      border-radius: 12px;
      border: 1px solid transparent;
      background: #1a1a1a;
      color: #adaaaa;
      cursor: pointer;
      transition: all .2s;
      font-family: 'Inter', sans-serif;
    }
    .k-mode-btn:hover:not(.active):not(:disabled) { background: #262626; }
    .k-mode-btn.active {
      background: rgba(142,255,113,.1);
      border-color: rgba(142,255,113,.3);
      box-shadow: 0 0 14px rgba(142,255,113,.08);
    }
    .k-mode-btn:disabled { opacity: .35; cursor: not-allowed; }
    .k-mode-label { font-size: 0.62em; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }

    .k-warn {
      font-size: 0.73em;
      color: #f4b400;
      margin-bottom: 8px;
    }

    /* ── Divider ── */
    .k-hr { border: none; border-top: 1px solid rgba(72,72,71,.4); margin: 0 14px; }

    /* ── Shared section ── */
    .k-section { padding: 14px 14px; }

    /* ── Stats rows ── */
    .k-stat-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px;
      background: #131313;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-stat-lbl {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8em;
      color: #adaaaa;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .k-stat-icon { color: rgba(142,255,113,.6); }
    .k-stat-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.05em;
      font-weight: 700;
    }
    .k-stat-unit { font-size: 0.68em; font-weight: 400; color: #adaaaa; margin-left: 2px; }

    /* Power hero */
    .k-power-hero {
      position: relative;
      overflow: hidden;
      padding: 18px 18px 16px;
      background: #131313;
      border-radius: 12px;
      margin-bottom: 10px;
    }
    .k-power-lbl {
      font-size: 0.62em;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #adaaaa;
      margin-bottom: 6px;
    }
    .k-power-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.8em;
      font-weight: 700;
      line-height: 1;
    }
    .k-power-unit { font-size: 0.38em; color: #8eff71; margin-left: 4px; }
    .k-power-bg {
      position: absolute;
      top: 0; right: 0;
      font-family: 'Material Symbols Outlined';
      font-size: 5.5em;
      opacity: 0.05;
      padding: 8px;
      color: #8eff71;
      line-height: 1;
    }

    /* ── Settings ── */
    .k-setting {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 14px;
      background: #131313;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-setting-info { display: flex; flex-direction: column; gap: 2px; }
    .k-setting-title { font-size: 0.88em; font-weight: 600; }
    .k-setting-sub { font-size: 0.68em; color: #adaaaa; letter-spacing: 0.04em; text-transform: uppercase; }

    /* Toggle */
    .k-toggle { position: relative; display: inline-block; width: 46px; height: 25px; cursor: pointer; }
    .k-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
    .k-track {
      position: absolute; inset: 0;
      background: #262626;
      border-radius: 100px;
      transition: background .2s;
    }
    .k-toggle input:checked + .k-track { background: rgba(142,255,113,.3); }
    .k-thumb {
      position: absolute;
      width: 19px; height: 19px;
      border-radius: 50%;
      background: #adaaaa;
      top: 3px; left: 3px;
      transition: all .2s;
      pointer-events: none;
    }
    .k-toggle input:checked ~ .k-thumb { background: #8eff71; transform: translateX(21px); }

    /* Number control */
    .k-num-ctrl { display: flex; align-items: center; gap: 6px; }
    .k-num-btn {
      width: 30px; height: 30px;
      border-radius: 50%;
      border: 1px solid #484847;
      background: #1a1a1a;
      color: #8eff71;
      font-size: 1.05em;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all .15s;
    }
    .k-num-btn:hover { background: #8eff71; color: #0d6100; border-color: transparent; }
    .k-num-val {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1em;
      font-weight: 600;
      min-width: 52px;
      text-align: center;
    }

    /* Alarm */
    .k-alarm {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 13px 14px;
      border-radius: 10px;
      margin-bottom: 8px;
    }
    .k-alarm.active { background: rgba(185,41,2,.15); border: 1px solid rgba(255,115,81,.25); }
    .k-alarm.ok     { background: #131313; }
    .k-alarm-icon   { font-size: 1.3em; }
    .k-alarm.active .k-alarm-icon { color: #ff7351; }
    .k-alarm.ok     .k-alarm-icon { color: #adaaaa; }
    .k-alarm-title { font-weight: 600; font-size: 0.88em; }
    .k-alarm-sub   { font-size: 0.68em; color: #adaaaa; text-transform: uppercase; letter-spacing: 0.04em; }

    /* ── Schedule placeholder ── */
    .k-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 48px 24px;
      text-align: center;
      color: #adaaaa;
    }
    .k-placeholder .ms { font-size: 3em; color: #484847; }
    .k-placeholder-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1em;
      font-weight: 600;
      color: #ffffff;
    }
    .k-placeholder-sub { font-size: 0.8em; line-height: 1.55; max-width: 280px; }

    /* ── Bottom nav ── */
    .k-nav {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 10px 6px 14px;
      background: rgba(19,19,19,.95);
      backdrop-filter: blur(12px);
    }
    .k-nav-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      padding: 6px 14px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 12px;
      transition: all .15s;
      color: #adaaaa;
      font-family: 'Inter', sans-serif;
    }
    .k-nav-btn.active { background: #1a1a1a; color: #8eff71; }
    .k-nav-icon {
      font-family: 'Material Symbols Outlined';
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      font-size: 1.4em;
      line-height: 1;
    }
    .k-nav-btn.active .k-nav-icon {
      font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .k-nav-label { font-size: 0.58em; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
  `;

  setConfig(config: any) {
    if (!config.entity) throw new Error('entity (climate) est requis');
    this.config = config;
  }

  static getConfigElement() { return document.createElement('tuya-thermostat-card-editor'); }

  static getStubConfig() {
    return { entity: 'climate.thermostat', mode_entity: 'select.thermostat_mode' };
  }

  // ── Entity getters ───────────────────────────────────────────────────────
  private get _cl() { return this.hass?.states[this.config.entity]; }
  private _ent(k: string) { return this.config[k] ? this.hass?.states[this.config[k]] : null; }

  // ── Helpers ──────────────────────────────────────────────────────────────
  private _isValid(id: any): id is string {
    return typeof id === 'string' && /^[a-z_]+\.[a-z0-9_]+$/.test(id);
  }

  private _call(domain: string, svc: string, data: Record<string, any>, eid: string) {
    this.hass.callService(domain, svc, data, { entity_id: eid });
  }

  private _gaugeArc(value: number, min: number, max: number) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
    const filled = pct * circ;
    return `${filled.toFixed(1)} ${(circ - filled + 0.01).toFixed(1)}`;
  }

  private _currentModeKey(): string | null {
    const ent = this._ent('mode_entity');
    if (!ent) return null;
    const st = ent.state;
    if (MODES[st]) return st;           // état = clé Tuya
    return FR_TO_KEY[st] ?? null;       // état = label FR
  }

  // ── Actions ──────────────────────────────────────────────────────────────
  private _adjustTemp(delta: number) {
    const cur = this._cl?.attributes.temperature ?? 20;
    this._call('climate', 'set_temperature',
      { temperature: Math.round((cur + delta) * 2) / 2 }, this.config.entity);
  }

  private _activateMode(key: string) {
    if (key === 'Standby') {
      this._call('climate', 'set_hvac_mode', { hvac_mode: 'off' }, this.config.entity);
      return;
    }
    if (this._cl?.state === 'off') {
      this._call('climate', 'set_hvac_mode', { hvac_mode: 'heat' }, this.config.entity);
    }
    if (!this._isValid(this.config.mode_entity)) return;
    const ent = this._ent('mode_entity');
    const opts: string[] = ent?.attributes.options ?? [];
    // Détermine si les options sont des labels FR ou des clés Tuya
    const option = opts.includes(key) ? key : (MODES[key]?.fr ?? key);
    this._call('select', 'select_option', { option }, this.config.mode_entity);
  }

  private _toggleChildLock() {
    const eid = this.config.child_lock_entity;
    if (!this._isValid(eid)) return;
    const isOn = this._ent('child_lock_entity')?.state === 'on';
    this._call('switch', isOn ? 'turn_off' : 'turn_on', {}, eid);
  }

  private _adjustNumber(entityKey: string, delta: number) {
    const eid = this.config[entityKey];
    if (!this._isValid(eid)) return;
    const ent = this._ent(entityKey);
    const cur  = parseFloat(ent?.state ?? '0');
    const step = parseFloat(ent?.attributes.step ?? '1');
    const min  = parseFloat(ent?.attributes.min ?? '0');
    const max  = parseFloat(ent?.attributes.max ?? '999');
    const next = Math.max(min, Math.min(max, Math.round((cur + delta) / step) * step));
    this._call('number', 'set_value', { value: next }, eid);
  }

  // ── Tab : Climate ─────────────────────────────────────────────────────────
  private _renderClimate() {
    const cl = this._cl;
    const isOn = cl?.state !== 'off';
    const cur: number  = cl?.attributes.current_temperature ?? 0;
    const tgt: number  = cl?.attributes.temperature ?? 20;
    const minT: number = cl?.attributes.min_temp ?? 5;
    const maxT: number = cl?.attributes.max_temp ?? 35;
    const heating    = this._ent('heating_entity')?.state === 'on';
    const windowOpen = this._ent('window_entity')?.state === 'on';
    const fault      = this._ent('fault_entity')?.state === 'on';
    const modeKey    = this._currentModeKey();
    const hasModeEnt = this._isValid(this.config.mode_entity);
    const dashArray  = this._gaugeArc(cur, minT, maxT);
    const arcColor   = isOn && heating ? '#8eff71' : '#484847';

    return html`
      ${(windowOpen || fault) ? html`
        <div class="k-alert">
          <span class="ms fill">${windowOpen ? 'window' : 'warning'}</span>
          ${windowOpen ? 'Fenêtre ouverte détectée' : "Défaut détecté — vérifiez l'appareil"}
        </div>
      ` : ''}

      <div class="k-gauge-wrap">
        <div class="k-glow"></div>
        <svg class="k-gauge-svg" viewBox="0 0 100 100"
          style="transform:rotate(-90deg);overflow:visible;">
          <defs>
            <filter id="kglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1a1a1a" stroke-width="7"/>
          <circle cx="50" cy="50" r="44" fill="none"
            stroke="${arcColor}"
            stroke-width="7"
            stroke-linecap="round"
            stroke-dasharray="${dashArray}"
            filter="${isOn && heating ? 'url(#kglow)' : ''}"
            style="transition:stroke-dasharray .5s ease,stroke .3s ease;"
          />
        </svg>
        <div class="k-gauge-inner">
          <div class="k-temp-label">${this.config.name || cl?.attributes.friendly_name || 'Thermostat'}</div>
          <div class="k-temp-current">${cur !== undefined ? cur : '--'}<sup>°C</sup></div>
          <div style="margin-top:6px;">
            ${isOn
              ? html`<span class="k-chip on" style="font-size:.65em;">
                  ${heating ? '⚡ En chauffe' : '⏸ En attente'}
                </span>`
              : html`<span class="k-chip" style="font-size:.65em;">Éteint</span>`}
          </div>
        </div>
      </div>

      <div class="k-target">
        <button class="k-btn-round" @click=${() => this._adjustTemp(-0.5)}>−</button>
        <span class="k-target-val">${tgt}°C</span>
        <button class="k-btn-round" @click=${() => this._adjustTemp(+0.5)}>+</button>
      </div>

      <hr class="k-hr">

      <div class="k-modes-wrap" style="padding-top:12px;">
        <div class="k-section-label">Mode</div>
        ${!hasModeEnt ? html`
          <div class="k-warn">⚠ Configurez mode_entity pour changer de mode.</div>
        ` : ''}
        <div class="k-modes">
          ${Object.entries(MODES).map(([key, info]) => {
            const active = key === 'Standby'
              ? !isOn
              : (isOn && modeKey === key);
            const col = active ? info.color : '';
            return html`
              <button
                class="k-mode-btn ${active ? 'active' : ''}"
                ?disabled=${!hasModeEnt && key !== 'Standby'}
                @click=${() => this._activateMode(key)}
                style="${active ? `color:${col};border-color:${col}40;background:${col}14;` : ''}"
              >
                <span class="ms" style="${active ? `color:${col};font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;` : ''}">${info.icon}</span>
                <span class="k-mode-label">${info.fr}</span>
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  // ── Tab : Energy ──────────────────────────────────────────────────────────
  private _renderEnergy() {
    const powerEnt = this._ent('power_entity');
    const elecEnt  = this._ent('elec_entity');
    const heating  = this._ent('heating_entity')?.state === 'on';
    const power    = powerEnt ? parseFloat(powerEnt.state) : null;
    const powerUnit= powerEnt?.attributes.unit_of_measurement ?? 'W';
    const elecVal  = elecEnt?.state ?? null;
    const elecUnit = elecEnt?.attributes.unit_of_measurement ?? '';

    return html`
      <div class="k-section">
        <div class="k-section-label" style="margin-bottom:12px;">Énergie</div>

        ${power !== null ? html`
          <div class="k-power-hero">
            <div class="k-power-bg">electric_bolt</div>
            <div class="k-power-lbl">Puissance moyenne</div>
            <div class="k-power-val">${isNaN(power) ? '--' : power}<span class="k-power-unit">${powerUnit}</span></div>
          </div>
        ` : ''}

        <div class="k-stat-row">
          <span class="k-stat-lbl">
            <span class="ms k-stat-icon">mode_fan</span>
            État chauffe
          </span>
          <span class="k-stat-val" style="color:${heating ? '#8eff71' : '#adaaaa'}">
            ${heating ? 'Active' : 'Veille'}
          </span>
        </div>

        ${elecVal !== null ? html`
          <div class="k-stat-row">
            <span class="k-stat-lbl">
              <span class="ms k-stat-icon">bolt</span>
              Consommation
            </span>
            <span class="k-stat-val">${elecVal}<span class="k-stat-unit">${elecUnit}</span></span>
          </div>
        ` : ''}

        ${!powerEnt && !elecEnt ? html`
          <div class="k-placeholder" style="padding:30px 0;">
            <span class="ms" style="font-size:2.5em;color:#484847;">insights</span>
            <span class="k-placeholder-title">Données énergie</span>
            <span class="k-placeholder-sub">
              Configurez <strong>power_entity</strong> et/ou <strong>elec_entity</strong>
              dans les options de la carte pour afficher les statistiques.
            </span>
          </div>
        ` : ''}
      </div>
    `;
  }

  // ── Tab : Settings ────────────────────────────────────────────────────────
  private _renderSettings() {
    const cl          = this._cl;
    const childLockEnt= this._ent('child_lock_entity');
    const childLock   = childLockEnt?.state === 'on';
    const upperEnt    = this._ent('upper_temp_entity');
    const lowerEnt    = this._ent('lower_temp_entity');
    const boostEnt    = this._ent('boost_entity');
    const holidayEnt  = this._ent('holiday_entity');
    const fault       = this._ent('fault_entity')?.state === 'on';

    const upperVal  = upperEnt  ? `${parseFloat(upperEnt.state)}°C`   : (cl?.attributes.upper_temp  != null ? `${cl.attributes.upper_temp}°C`  : '—');
    const lowerVal  = lowerEnt  ? `${parseFloat(lowerEnt.state)}°C`   : (cl?.attributes.lower_temp  != null ? `${cl.attributes.lower_temp}°C`  : '—');
    const boostVal  = boostEnt  ? `${parseInt(boostEnt.state, 10)} min` : null;
    const holidayVal= holidayEnt? `${parseInt(holidayEnt.state, 10)} j` : null;

    return html`
      <div class="k-section">
        <div class="k-section-label" style="margin-bottom:12px;">Paramètres avancés</div>

        ${childLockEnt ? html`
          <div class="k-setting">
            <div class="k-setting-info">
              <span class="k-setting-title">Verrou enfant</span>
              <span class="k-setting-sub">switch.verrou_enfant</span>
            </div>
            <label class="k-toggle">
              <input type="checkbox" ?checked=${childLock}
                @change=${() => this._toggleChildLock()}>
              <div class="k-track"></div>
              <div class="k-thumb"></div>
            </label>
          </div>
        ` : ''}

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Limite haute</span>
            <span class="k-setting-sub">number.limite_haute_temperature</span>
          </div>
          ${upperEnt ? html`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${() => this._adjustNumber('upper_temp_entity', -0.5)}>−</button>
              <span class="k-num-val">${upperVal}</span>
              <button class="k-num-btn" @click=${() => this._adjustNumber('upper_temp_entity', +0.5)}>+</button>
            </div>
          ` : html`<span class="k-stat-val" style="color:#adaaaa">${upperVal}</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Limite basse</span>
            <span class="k-setting-sub">number.limite_basse_temperature</span>
          </div>
          ${lowerEnt ? html`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${() => this._adjustNumber('lower_temp_entity', -0.5)}>−</button>
              <span class="k-num-val">${lowerVal}</span>
              <button class="k-num-btn" @click=${() => this._adjustNumber('lower_temp_entity', +0.5)}>+</button>
            </div>
          ` : html`<span class="k-stat-val" style="color:#adaaaa">${lowerVal}</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Durée boost</span>
            <span class="k-setting-sub">number.duree_boost</span>
          </div>
          ${boostEnt ? html`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${() => this._adjustNumber('boost_entity', -5)}>−</button>
              <span class="k-num-val">${boostVal}</span>
              <button class="k-num-btn" @click=${() => this._adjustNumber('boost_entity', +5)}>+</button>
            </div>
          ` : html`<span style="color:#484847;font-size:0.78em;">Non configuré</span>`}
        </div>

        <div class="k-setting">
          <div class="k-setting-info">
            <span class="k-setting-title">Mode vacances</span>
            <span class="k-setting-sub">number.duree_vacances</span>
          </div>
          ${holidayEnt ? html`
            <div class="k-num-ctrl">
              <button class="k-num-btn" @click=${() => this._adjustNumber('holiday_entity', -1)}>−</button>
              <span class="k-num-val">${holidayVal}</span>
              <button class="k-num-btn" @click=${() => this._adjustNumber('holiday_entity', +1)}>+</button>
            </div>
          ` : html`<span style="color:#484847;font-size:0.78em;">Non configuré</span>`}
        </div>

        <hr class="k-hr" style="margin:12px 0;">
        <div class="k-section-label" style="margin-bottom:8px;">Alarmes techniques</div>

        <div class="k-alarm ${fault ? 'active' : 'ok'}">
          <span class="ms k-alarm-icon fill">${fault ? 'warning' : 'check_circle'}</span>
          <div>
            <div class="k-alarm-title">${fault ? 'Défaut détecté' : 'Système nominal'}</div>
            <div class="k-alarm-sub">binary_sensor.alarme_defaut</div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Tab : Schedule ────────────────────────────────────────────────────────
  private _renderSchedule() {
    return html`
      <div class="k-placeholder">
        <span class="ms" style="font-size:3em;color:#484847;">calendar_today</span>
        <span class="k-placeholder-title">Programmation</span>
        <span class="k-placeholder-sub">
          Les créneaux horaires (Matin / Jour / Soir / Nuit) nécessitent
          des entités dédiées dans l'intégration, actuellement en développement.<br><br>
          En attendant, activez le mode <strong>Prog.</strong> depuis l'onglet Climat.
        </span>
      </div>
    `;
  }

  // ── Nav ───────────────────────────────────────────────────────────────────
  private _renderNav() {
    const tabs: Array<{ key: Tab; icon: string; label: string }> = [
      { key: 'climate',  icon: 'thermostat',    label: 'Climat'   },
      { key: 'schedule', icon: 'calendar_today', label: 'Prog.'    },
      { key: 'energy',   icon: 'insights',       label: 'Énergie'  },
      { key: 'settings', icon: 'settings',       label: 'Réglages' },
    ];
    return html`
      <nav class="k-nav">
        ${tabs.map(t => html`
          <button class="k-nav-btn ${this._tab === t.key ? 'active' : ''}"
            @click=${() => { this._tab = t.key; }}>
            <span class="k-nav-icon">${t.icon}</span>
            <span class="k-nav-label">${t.label}</span>
          </button>
        `)}
      </nav>
    `;
  }

  // ── Main render ───────────────────────────────────────────────────────────
  render() {
    if (!this.hass || !this.config || !this._cl) {
      return html`<ha-card>
        <div style="padding:1.2em;color:var(--error-color,#e53935);">
          ⚠ Configuration manquante — vérifiez l'entity.
        </div>
      </ha-card>`;
    }

    const cl = this._cl;
    const isOn       = cl.state !== 'off';
    const heating    = this._ent('heating_entity')?.state === 'on';
    const windowOpen = this._ent('window_entity')?.state === 'on';
    const fault      = this._ent('fault_entity')?.state === 'on';
    const name       = this.config.name || cl.attributes.friendly_name || 'Thermostat';

    let content;
    switch (this._tab) {
      case 'climate':  content = this._renderClimate();  break;
      case 'energy':   content = this._renderEnergy();   break;
      case 'settings': content = this._renderSettings(); break;
      case 'schedule': content = this._renderSchedule(); break;
    }

    return html`
      <ha-card>
        <div class="k">
          <header class="k-header">
            <span class="k-logo">⚡ ${name}</span>
            <div class="k-chips">
              ${isOn
                ? html`<span class="k-chip on">${heating ? 'Chauffe' : 'Actif'}</span>`
                : html`<span class="k-chip">Éteint</span>`}
              ${windowOpen ? html`<span class="k-chip err">🪟</span>` : ''}
              ${fault      ? html`<span class="k-chip err">⚠</span>` : ''}
            </div>
          </header>

          <div class="k-content">${content}</div>

          ${this._renderNav()}
        </div>
      </ha-card>
    `;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tuya-thermostat-card',
  name: 'Tuya Thermostat Card (Kinetic)',
  preview: true,
  description: 'Carte Lovelace style Kinetic pour le thermostat Tuya',
});
