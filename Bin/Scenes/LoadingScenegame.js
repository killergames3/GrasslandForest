class LoadingScenegame extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScenegame' });

    // Backend connection
    this.serverclient = 'https://bgrassland-production.up.railway.app';
    this.playerName   = null;
    this.token        = null;

    // Game state
    this.STATE = {
      slots:      new Array(40).fill(null),
      quickSlots: new Array(7).fill(null),
      selectedItem: null
    };

    // Player properties defaults
    this.posicionplayerx  = 100;
    this.posicionplayery  = 100;
    this.vidaPorcentaje   = 100;
    this.aguaPorcentaje   = 100;
    this.comidaPorcentaje = 100;
    this.speed            = 2.7;
    this.mundo            = 1;
    this.moneda           = 0;
    this.nivel            = 0;
    this.nivel_exp        = 0;
    this.sabiduria        = 0;
    this.sabiduria_exp    = 0;
    this.fuerza           = 0;
    this.fuerza_exp       = 0;
    this.agricultura      = 0;
    this.agricultura_exp  = 0;
    this.misiones         = 0;
    this.Username         = '---';

    // Item definitions
    this.ItemDefinitions = {
      item_1: { src: './Game/Source/recurso.png', maxStack: 10 },
      item_2: { src: './Game/Source/recurso2.png', maxStack: 5 },
      item_3: { src: './Game/Source/tijeras.png', maxStack: 20 }
    };
  }

  preload() {
    // Hide loading bar UI
    document.getElementById('yellow-bar-container').style.display = 'none';

    // Display loading text
    document.fonts.ready.then(() => {
      const xPos = this.scale.width * 0.8;
      const yPos = this.scale.height * 0.8;
      this.add.text(xPos, yPos, 'Cargando...', {
        fontFamily: '"PressStart2P"',
        fontSize: '16px',
        color: '#ffffff',
        resolution: 4
      }).setOrigin(0.5).setScale(1.2, 1.5);
    });

    // Audio and images
    this.load.audio('musicaFondo', './Game/MUSIC/principal.mp3');
    this.load.image('fullscreenButton', './Game/Objetos/parentesis.png');

    // Determine connected account
    const checkk = localStorage.getItem('checkcc');
    const storedAccount = localStorage.getItem('connectedAccount');
    const registryAccount = this.registry.get('account');
    if (checkk == '1') {
      this.playerName = storedAccount || registryAccount;
      if (this.playerName) this.registry.set('account', this.playerName);
      else console.error('No se encontró una cuenta conectada.');
    } else {
      this.playerName = registryAccount || storedAccount;
      this.registry.set('account', this.playerName);
      localStorage.removeItem('connectedAccount');
      if (!this.playerName) {
        this.registry.remove('account');
        console.error('No se encontró una cuenta conectada.');
      }
    }

    // Initialize backend flow
    this.initialize();
  }

  create() {
    // Poll until 'mundo' set by loadPlayerData()
    this.intervalId = setInterval(() => this.checkTransition(), 2000);
  }

  // Transition to the next scene based on mundo
  checkTransition() {
    if (this.mundo === 1 || this.mundo === 2) {
      const next = this.mundo === 1 ? 'GameScene' : 'tiendajuego';
      this.scene.start(next);
      clearInterval(this.intervalId);
    }
  }

  // -----------------------
  // Auth & Data Flow
  // -----------------------

  // Basic JWT format check
  tokenValido(token) {
    return typeof token === 'string' && token.split('.').length === 3;
  }

  // 1) Authenticate and load
  async initialize() {
    if (!this.playerName) return;
    try {
      // Auth
      const authRes = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      if (!authRes.ok) return console.error('Auth fallido', authRes.status);
      const { token } = await authRes.json();
      this.token = token;

      // Load data
      await this.loadPlayerData();
    } catch (err) {
      console.error('Error en initialize:', err);
    }
  }

  // 2) Load player data (renamed to avoid conflict)
  async loadPlayerData() {
    if (!this.token || !this.tokenValido(this.token)) {
      await this.reautenticarYReintentar();
      return;
    }
    try {
      const res = await fetch(`${this.serverclient}/load/${encodeURIComponent(this.playerName)}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) return console.error('Error al cargar:', data);

      // Initialize state
      this.STATE = { slots: new Array(40).fill(null), quickSlots: new Array(7).fill(null), selectedItem: null };
      data.inventory?.forEach(s => {
        if (typeof s.id === 'number' && s.objeto && s.id < 40)
          this.STATE.slots[s.id] = { id: s.objeto, count: s.cantidad };
      });
      data.chest?.forEach(s => {
        if (typeof s.id === 'number' && s.objeto && s.id < 7)
          this.STATE.quickSlots[s.id] = { id: s.objeto, count: s.cantidad };
      });

      // Render slots
      for (let i = 0; i < 40; i++) this.renderSlot(i);
      for (let i = 0; i < 7;  i++) this.renderSlot(i);

      // Assign player props
      ['posicionplayerx','posicionplayery','vidaPorcentaje','aguaPorcentaje','comidaPorcentaje','speed','mundo','moneda','nivel','nivel_exp','sabiduria','sabiduria_exp','fuerza','fuerza_exp','agricultura','agricultura_exp','misiones','Username']
        .forEach(prop => { if (data[prop] !== undefined) this[prop] = data[prop]; });

      if (this.player) {
        this.player.setVisible(true);
        this.player.x = this.posicionplayerx;
        this.player.y = this.posicionplayery;
      }
      console.log('Datos cargados exitosamente');
    } catch (e) {
      console.error('Error de red al cargar:', e);
    }
  }

  // 3) Re-auth & retry load
  async reautenticarYReintentar() {
    try {
      const res = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      const data = await res.json();
      if (data.token) {
        this.token = data.token;
        console.log('Token renovado, recargando datos...');
        await this.loadPlayerData();
      }
    } catch (err) {
      console.error('Error al reautenticar:', err);
    }
  }

  // 4) Save game state
  async savegg() {
    if (!this.token) return;
    const inventoryData = this.STATE.slots.map((s, i) => ({ id: i, objeto: s?.id ?? null, cantidad: s?.count ?? 0, tipo: 'inventario' }));
    const chestData     = this.STATE.quickSlots.map((s, i) => ({ id: i, objeto: s?.id ?? null, cantidad: s?.count ?? 0, tipo: 'cofre' }));
    const payload = {
      posicionplayerx: this.posicionplayerx, posicionplayery: this.posicionplayery,
      vidaPorcentaje: this.vidaPorcentaje, aguaPorcentaje: this.aguaPorcentaje, comidaPorcentaje: this.comidaPorcentaje,
      nivel: this.nivel, nivel_exp: this.nivel_exp, sabiduria: this.sabiduria, sabiduria_exp: this.sabiduria_exp,
      fuerza: this.fuerza, fuerza_exp: this.fuerza_exp, agricultura: this.agricultura, agricultura_exp: this.agricultura_exp,
      speed: this.speed, mundo: this.mundo, moneda: this.moneda, Username: this.Username, misiones: this.misiones,
      inventory: inventoryData, chest: chestData
    };
    try {
      const resp = await fetch(`${this.serverclient}/save/${encodeURIComponent(this.playerName)}`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify(payload)
      });
      const text = await resp.text();
      const resData = JSON.parse(text);
      if (!resp.ok) {
        console.error('Error al guardar:', resData);
        if (resData.error?.includes('Token inválido') || resData.error?.includes('expirado'))
          await this.reautenticarYGuardar();
        return;
      }
      console.log('Datos guardados correctamente');
    } catch (e) {
      console.error('Error de red al guardar:', e);
    }
  }

  // 5) Re-auth & retry save
  async reautenticarYGuardar() {
    try {
      const res = await fetch(`${this.serverclient}/auth`, {
        method: 'POST', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: this.playerName })
      });
      const data = await res.json();
      if (data.token) {
        this.token = data.token;
        console.log('Token renovado, guardando datos...');
        await this.savegg();
      }
    } catch (err) {
      console.error('Error al reautenticar para guardar:', err);
    }
  }

  // Render inventory and quick-slot UI
  renderSlot(index) {
    // Inventory
    const invDiv = document.querySelector(`.inv-slot[data-slot-index=\"${index}\"]`);
    if (invDiv) {
      invDiv.innerHTML = '';
      const item = this.STATE.slots[index];
      if (item && this.ItemDefinitions[item.id]) {
        const img = document.createElement('img');
        img.src = this.ItemDefinitions[item.id].src;
        img.alt = item.id;
        invDiv.appendChild(img);
        if (item.count > 1) {
          const span = document.createElement('span'); span.classList.add('item-count'); span.textContent = 'x'+item.count;
          invDiv.appendChild(span);
        }
      }
      invDiv.classList.remove('highlight');
    }
    // Quick slots
    const quickDiv = document.querySelector(`.quick-slot[data-slot-index=\"${index}\"]`);
    if (quickDiv) {
      quickDiv.innerHTML = '';
      const item = this.STATE.quickSlots[index];
      if (item && this.ItemDefinitions[item.id]) {
        const img = document.createElement('img'); img.src = this.ItemDefinitions[item.id].src; img.alt = item.id;
        quickDiv.appendChild(img);
        if (item.count > 1) {
          const span = document.createElement('span'); span.classList.add('item-count'); span.textContent = 'x'+item.count;
          quickDiv.appendChild(span);
        }
      }
      quickDiv.classList.remove('highlight');
    }
  }
}