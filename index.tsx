// Direct Execution Edition - No Eval / No JSX
// Standardized for iPad / GitHub Pages compatibility
const { useState, useEffect, useRef, useMemo } = (window as any).React;
const e = (window as any).React.createElement;

const translations = {
  en: {
    langName: "English", traineeLabel: "Member", selectDate: "Date", selectTime: "Time",
    dash: "Dashboard", att: "Log Sheets", manage: "Trainees", logs: "Master Records",
    welcome: "Welcome, Coach", total: "Total Members", today: "Completed Today",
    search: "Search members...", openSheet: "Open Log Sheet", add: "New Member",
    lessons: "Session Limit", sign: "Save Signature", reset: "Reset", cancel: "Cancel",
    trainerSign: "Coach Signature", memberSign: "Member Signature", del: "Delete", confirmDel: "Delete student record?",
    lang: "Language", theme: "Theme", cycle: "Cycle", renew: "New Cycle",
    pkgInfo: "Progress", totalSessions: "Total Sessions", cycleNum: "Cycle",
    save: "Start Cycle", active: "Active", date: "Date", progress: "Progress",
    history: "History", noHistory: "No history found", delLog: "Delete this record?",
    searchLogs: "Search records...", done: "Done", confirm: "Confirm",
    yes: "Delete", no: "Cancel", pending: "Draft", completed: "Complete",
    allHistory: "Historical Records", selectToView: "Select a member to view records",
    completeAt: "Attendance Timestamp", selectMember: "Select Student", saveChange: "Confirm", clear: "Clear Session",
    sessionInfo: "Session Schedule", placeholder: "Tap to Schedule"
  },
  zh_cn: {
    langName: "简体中文", traineeLabel: "学员姓名", selectDate: "日期", selectTime: "时间",
    dash: "仪表盘", att: "签到表", manage: "学员", logs: "记录查询",
    welcome: "欢迎回来，教练", total: "学员总数", today: "今日完成",
    search: "搜索姓名...", openSheet: "打开签到表", add: "添加学员",
    lessons: "购买课时", sign: "保存签名", reset: "重置", cancel: "取消",
    trainerSign: "教练签名", memberSign: "学员确认", del: "删除", confirmDel: "确定删除学员记录？",
    lang: "语言切换", theme: "主题", cycle: "期数", renew: "开启新期",
    pkgInfo: "进度", totalSessions: "总课时", cycleNum: "期数",
    save: "开启新期", active: "活跃", date: "日期", progress: "进度",
    history: "历史记录", noHistory: "暂无历史", delLog: "确定删除此记录？",
    searchLogs: "搜索历史...", done: "完成", confirm: "确认操作",
    yes: "确认删除", no: "取消", pending: "草稿", completed: "已完成",
    allHistory: "历史存档", selectToView: "选择学员查看记录",
    completeAt: "签到完成时间", selectMember: "选择学员", saveChange: "确认", clear: "清除时间",
    sessionInfo: "课程安排", placeholder: "点击排课"
  },
  zh_tw: {
    langName: "繁體中文", traineeLabel: "學員姓名", selectDate: "日期", selectTime: "時間",
    dash: "儀表板", att: "簽到表", manage: "學員管理", logs: "記錄查詢",
    welcome: "歡迎回來，教練", total: "學員總數", today: "今日完成",
    search: "搜尋姓名...", openSheet: "打開簽到表", add: "添加學員",
    lessons: "購買課時", sign: "保存簽名", reset: "重置", cancel: "取消",
    trainerSign: "教練簽名", memberSign: "學員簽名", del: "刪除", confirmDel: "確定刪除學員記錄？",
    lang: "語言切換", theme: "主題", cycle: "期數", renew: "開啟新期",
    pkgInfo: "進度", totalSessions: "總課時", cycleNum: "期數",
    save: "開啟新期", active: "活躍", date: "日期", progress: "進度",
    history: "歷史記錄", noHistory: "暫無歷史", delLog: "確定刪除此記錄？",
    searchLogs: "搜尋歷史...", done: "完成", confirm: "確認操作",
    yes: "確認刪除", no: "取消", pending: "學員草稿", completed: "已完成",
    allHistory: "歷史存檔", selectToView: "選擇學員查看記錄",
    completeAt: "簽到完成時間", selectMember: "選擇學員", saveChange: "確認", clear: "清除時間",
    sessionInfo: "課程安排", placeholder: "尚未排課"
  },
  es: {
    langName: "Español", traineeLabel: "Miembro", selectDate: "Fecha", selectTime: "Hora",
    dash: "Panel", att: "Asistencia", manage: "Miembros", logs: "Registros",
    welcome: "Bienvenido, Entrenador", total: "Total Miembros", today: "Hoy Completado",
    search: "Buscar...", openSheet: "Ver Hoja", add: "Nuevo Miembro",
    lessons: "Límite Sesiones", sign: "Guardar Firma", reset: "Reiniciar", cancel: "Cancelar",
    trainerSign: "Firma Entrenador", memberSign: "Firma Miembro", del: "Eliminar", confirmDel: "¿Eliminar registro?",
    lang: "Idioma", theme: "Tema", cycle: "Ciclo", renew: "Nuevo Ciclo",
    pkgInfo: "Progreso", totalSessions: "Total Sesiones", cycleNum: "Ciclo",
    save: "Iniciar Ciclo", active: "Active", date: "Fecha", progress: "Progreso",
    history: "Historial", noHistory: "Sin historial", delLog: "¿Borrar registro?",
    searchLogs: "Buscar...", done: "Listo", confirm: "Confirmar",
    yes: "Eliminar", no: "Cancelar", pending: "Borrador", completed: "Completo",
    allHistory: "Historial Completado", selectToView: "Seleccionar para ver",
    completeAt: "Finalización", selectMember: "Elegir Estudiante", saveChange: "Confirmar", clear: "Limpiar",
    sessionInfo: "Horario de Sesión", placeholder: "Programar"
  },
  de: {
    langName: "Deutsch", traineeLabel: "Mitglied", selectDate: "Datum", selectTime: "Zeit",
    dash: "Dashboard", att: "Protokolle", manage: "Mitglieder", logs: "Stammdaten",
    welcome: "Willkommen, Coach", total: "Gesamt Mitglieder", today: "Heute Fertig",
    search: "Suche...", openSheet: "Öffnen", add: "Neu",
    lessons: "Sitzungslimit", sign: "Unterschrift Speichern", reset: "Reset", cancel: "Abbrechen",
    trainerSign: "Coach Unterschrift", memberSign: "Mitglied Unterschrift", del: "Löschen", confirmDel: "Löschen?",
    lang: "Sprache", theme: "Thema", cycle: "Zyklus", renew: "Neuer Zyklus",
    pkgInfo: "Fortschritt", totalSessions: "Gesamt", cycleNum: "Zyklus",
    save: "Start", active: "Aktiv", date: "Datum", progress: "Fortschritt",
    history: "Verlauf", noHistory: "Kein Verlauf", delLog: "Löschen?",
    searchLogs: "Suche...", done: "Fertig", confirm: "Bestätigen",
    yes: "Löschen", no: "Abbrechen", pending: "Entwurf", completed: "Fertig",
    allHistory: "Historie", selectToView: "Anzeigen",
    completeAt: "Zeitstempel", selectMember: "Mitglied wählen", saveChange: "Bestätigen", clear: "Leeren",
    sessionInfo: "Sitzungsplan", placeholder: "Planen"
  },
  fr: {
    langName: "Français", traineeLabel: "Membre", selectDate: "Date", selectTime: "Heure",
    dash: "Tableau de bord", att: "Feuilles", manage: "Membres", logs: "Archives",
    welcome: "Bienvenue, Coach", total: "Total Membres", today: "Terminés",
    search: "Rechercher...", openSheet: "Ouvrir", add: "Nouveau",
    lessons: "Limite Sessions", sign: "Enregistrer Signature", reset: "Réinitialiser", cancel: "Annuler",
    trainerSign: "Signature Coach", memberSign: "Signature Membre", del: "Supprimer", confirmDel: "Supprimer?",
    lang: "Langue", theme: "Thème", cycle: "Cycle", renew: "Nouveau Cycle",
    pkgInfo: "Progrès", totalSessions: "Total Sessions", cycleNum: "Cycle",
    save: "Lancer", active: "Actif", date: "Date", progress: "Progrès",
    history: "Historique", noHistory: "Aucun historique", delLog: "Supprimer?",
    searchLogs: "Rechercher...", done: "Terminé", confirm: "Confirmer",
    yes: "Supprimer", no: "Annuler", pending: "Brouillon", completed: "Complet",
    allHistory: "Archives", selectToView: "Sélectionner",
    completeAt: "Horodatage", selectMember: "Choisir Membre", saveChange: "Confirmer", clear: "Effacer",
    sessionInfo: "Calendrier Session", placeholder: "Planifier"
  }
};

const db = {
  KEYS: { TR: 'fit_tr_v21', LG: 'fit_lg_v21', TM: 'fit_theme_v21', LN: 'fit_lang_v21' },
  get: (k) => {
    try {
      const val = localStorage.getItem(k);
      if (!val) return k === db.KEYS.LN ? 'en' : k === db.KEYS.TM ? 'dark' : [];
      return JSON.parse(val);
    } catch { return k === db.KEYS.LN ? 'en' : k === db.KEYS.TM ? 'dark' : []; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
};

const Icon = ({ name, className }) => {
  const lucide = (window as any).lucide;
  const iconData = lucide.icons[name.charAt(0).toLowerCase() + name.slice(1)] || lucide.icons[name];
  if (!iconData) return null;
  const [tag, attrs, children] = iconData;
  return e(tag, { ...attrs, className: className || 'w-6 h-6', stroke: 'currentColor' }, 
    children.map((child, i) => e(child[0], { ...child[1], key: i }))
  );
};

const formatSessionDisplay = (dateStr, timeStr) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-');
    const dateFormatted = `${d}/${m}/${y}`; // DD/MM/YYYY
    let timeFormatted = "";
    if (timeStr) {
        const [h, min] = timeStr.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'pm' : 'am';
        const h12 = hour % 12 || 12;
        timeFormatted = `${h12}:${min}${ampm}`;
    }
    return `${dateFormatted} • ${timeFormatted || '--:--'}`;
};

const SignatureModal = ({ isOpen, title, onSave, onCancel, t, isDark }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getPos = (ev) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clientX = (ev.touches ? ev.touches[0].clientX : ev.clientX);
    const clientY = (ev.touches ? ev.touches[0].clientY : ev.clientY);
    return { x: (clientX - rect.left) * (canvas.width / rect.width), y: (clientY - rect.top) * (canvas.height / rect.height) };
  };

  const start = (ev) => { if (ev.cancelable) ev.preventDefault(); const { x, y } = getPos(ev); const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(x, y); setIsDrawing(true); };
  const move = (ev) => { if (!isDrawing) return; if (ev.cancelable) ev.preventDefault(); const { x, y } = getPos(ev); const ctx = canvasRef.current.getContext('2d'); ctx.lineTo(x, y); ctx.stroke(); };
  const stop = () => setIsDrawing(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 3 * dpr; ctx.strokeStyle = isDark ? '#818cf8' : '#4f46e5';
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen, isDark]);

  if (!isOpen) return null;

  return e('div', { className: "fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6" },
    e('div', { className: `w-full max-w-xl p-8 border rounded-[3rem] ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}` },
      e('h3', { className: `text-2xl font-black uppercase mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}` }, title),
      e('div', { className: `h-64 border-2 rounded-[2rem] overflow-hidden mb-6 ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}` },
        e('canvas', { ref: canvasRef, onMouseDown: start, onMouseMove: move, onMouseUp: stop, onMouseOut: stop, onTouchStart: start, onTouchMove: move, onTouchEnd: stop, className: "w-full h-full block touch-none" })
      ),
      e('div', { className: "flex gap-4" },
        e('button', { onClick: () => { const c = canvasRef.current; c.getContext('2d').clearRect(0, 0, c.width, c.height); }, className: `flex-1 py-4 rounded-xl font-bold uppercase transition-all active:scale-95 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}` }, t.reset),
        e('button', { onClick: onCancel, className: `flex-1 py-4 rounded-xl font-bold uppercase transition-all active:scale-95 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}` }, t.cancel),
        e('button', { onClick: () => onSave(canvasRef.current.toDataURL()), className: "flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase shadow-xl transition-all active:scale-95" }, t.sign)
      )
    )
  );
};

const App = () => {
  const [lang, setLang] = useState(() => db.get(db.KEYS.LN));
  const [theme, setTheme] = useState(() => db.get(db.KEYS.TM));
  const [view, setView] = useState('dash');
  const [trainees, setTrainees] = useState(() => db.get(db.KEYS.TR));
  const [logs, setLogs] = useState(() => db.get(db.KEYS.LG));
  const [search, setSearch] = useState('');
  
  const [activeUser, setActiveUser] = useState(null);
  const [historyUser, setHistoryUser] = useState(null);
  
  const [sigModal, setSigModal] = useState({ isOpen: false, type: null, rowIndex: null });
  const [isAdding, setIsAdding] = useState(false);
  const [isRenewing, setIsRenewing] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: null, targetId: null });
  const [editSession, setEditSession] = useState(null);

  const t = translations[lang] || translations['en'];
  const isDark = theme === 'dark';

  useEffect(() => {
    document.body.className = isDark ? 'dark-mode bg-slate-950 text-white' : 'light-mode bg-slate-50 text-slate-900';
    db.set(db.KEYS.TM, theme);
  }, [theme, isDark]);

  useEffect(() => db.set(db.KEYS.LN, lang), [lang]);
  useEffect(() => db.set(db.KEYS.LG, logs), [logs]);
  useEffect(() => db.set(db.KEYS.TR, trainees), [trainees]);

  const stats = useMemo(() => ({
    total: trainees.length,
    today: logs.filter(l => l.completed && l.date && new Date(l.date).toDateString() === new Date().toDateString()).length,
    active: trainees.length
  }), [trainees, logs]);

  const userSheetData = useMemo(() => {
    if (!activeUser) return [];
    const userLogs = logs.filter(l => l.traineeId === activeUser.id && l.cycle === activeUser.cycle);
    return Array.from({ length: activeUser.total || 15 }, (_, i) => {
       const found = userLogs.find(l => l.row === i + 1);
       return found || { row: i + 1, date: '', time: '', trainerSig: null, memberSig: null, completed: false };
    });
  }, [activeUser, logs]);

  const updateLogRowBatch = (traineeId, rowNum, updates) => {
    setLogs(prevLogs => {
      const currentCycle = activeUser.cycle;
      const logId = `${traineeId}-${rowNum}-${currentCycle}`;
      const existingIdx = prevLogs.findIndex(l => l.id === logId);
      let newLogs = [...prevLogs];
      let newLog;
      if (existingIdx !== -1) {
         newLog = { ...prevLogs[existingIdx], ...updates };
         newLogs[existingIdx] = newLog;
      } else {
         newLog = { id: logId, traineeId, cycle: currentCycle, row: rowNum, name: activeUser.name, date: '', time: '', trainerSig: null, memberSig: null, completedAt: '', completed: false, ...updates };
         newLogs.push(newLog);
      }
      const isNowComplete = !!(newLog.trainerSig && newLog.memberSig && newLog.date && newLog.time);
      if (isNowComplete && !newLog.completed) {
        const now = new Date();
        newLog.completedAt = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      }
      newLog.completed = isNowComplete;
      return newLogs;
    });
  };

  useEffect(() => {
    if (activeUser) {
        const completedCount = logs.filter(l => l.traineeId === activeUser.id && l.cycle === activeUser.cycle && l.completed).length;
        setTrainees(prev => prev.map(u => u.id === activeUser.id ? { ...u, done: completedCount } : u));
    }
  }, [logs]);

  const handleApplySession = (row) => { if (!editSession) return; updateLogRowBatch(activeUser.id, row, { date: editSession.date, time: editSession.time }); setEditSession(null); };
  
  return e('div', { className: `flex flex-col lg:flex-row h-screen w-screen overflow-hidden ${isDark ? 'text-white' : 'text-slate-900'}` },
    // SIDEBAR
    e('nav', { className: `hidden lg:flex w-64 flex-col gap-6 p-6 border-r shrink-0 ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-slate-200 bg-white'}` },
      e('div', { className: "flex items-center gap-3" }, e('div', { className: "p-2 bg-indigo-600 rounded-xl shadow-lg" }, e(Icon, { name: "Activity", className: "text-white w-5 h-5" })), e('h1', { className: "text-lg font-black uppercase tracking-tighter" }, "FitCheck Pro")),
      e('div', { className: "flex flex-col gap-2 flex-1 overflow-y-auto" },
        [['dash', 'LayoutDashboard', t.dash], ['att', 'Table', t.att], ['manage', 'Users2', t.manage], ['logs', 'ClipboardList', t.logs]].map(([id, icon, label]) => 
          e('button', { key: id, onClick: () => { setView(id); setActiveUser(null); setHistoryUser(null); }, className: `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${view === id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/10' : 'text-slate-500 hover:bg-white/5'}` }, e(Icon, { name: icon, className: "w-4 h-4" }), e('span', { className: "font-black uppercase text-[10px] tracking-widest" }, label))
        )
      ),
      e('div', { className: "mt-auto flex flex-col gap-2" },
        e('button', { onClick: () => setTheme(isDark ? 'light' : 'dark'), className: "flex items-center justify-between p-3 rounded-lg border text-[9px] font-black uppercase transition-all active:scale-95" }, t.theme, e(Icon, { name: isDark ? "Moon" : "Sun", className: "w-3.5 h-3.5 opacity-50" })),
        e('button', { onClick: () => setIsLangOpen(true), className: "flex items-center justify-between p-3 rounded-lg border text-[9px] font-black uppercase transition-all active:scale-95" }, t.lang, e('span', { className: "opacity-50" }, t.langName))
      )
    ),
    // MOBILE HEADER
    e('header', { className: `lg:hidden mobile-header-pad flex justify-between items-center px-4 border-b shrink-0 ${isDark ? 'bg-slate-950 border-white/5' : 'bg-white border-slate-200'} backdrop-blur-xl` },
      e('h1', { className: "font-black uppercase text-lg" }, "FitCheck"),
      e('div', { className: "flex gap-2" },
        e('button', { onClick: () => setTheme(isDark ? 'light' : 'dark'), className: "p-2" }, e(Icon, { name: isDark ? "Moon" : "Sun", className: "w-5 h-5 opacity-60" })),
        e('button', { onClick: () => setIsLangOpen(true), className: "p-2 text-[10px] font-black uppercase" }, lang.toUpperCase())
      )
    ),
    // MAIN CONTENT
    e('main', { className: "flex-1 overflow-hidden flex flex-col p-3 lg:p-6" },
      e('div', { className: "w-full flex-1 flex flex-col overflow-hidden" },
        view === 'dash' && e('div', { className: "space-y-4 overflow-y-auto pr-1 custom-scroll" },
          e('h2', { className: "text-2xl lg:text-4xl font-black mb-1" }, t.welcome),
          e('p', { className: "text-slate-500 font-medium uppercase tracking-widest text-[9px] mb-4" }, "Performance Dashboard"),
          e('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-3" },
            [[t.total, stats.total, 'text-indigo-500'], [t.today, stats.today, 'text-emerald-500'], [t.active, stats.active, 'text-slate-500']].map(([lbl, val, cls]) => 
              e('div', { key: lbl, className: `p-5 rounded-[1.5rem] border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}` }, e('p', { className: "text-[9px] font-black uppercase text-slate-500 tracking-widest" }, lbl), e('p', { className: `text-3xl font-black mt-1 ${cls}` }, val))
            )
          )
        ),
        view === 'att' && !activeUser && e('div', { className: "flex flex-col flex-1 overflow-hidden" },
          e('div', { className: "flex justify-between items-center mb-4" }, e('h2', { className: "text-xl font-black uppercase italic" }, t.att), e('input', { placeholder: t.search, onChange: ev => setSearch(ev.target.value), className: `p-2.5 rounded-lg border outline-none text-xs w-48 ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-slate-200 bg-white'}` })),
          e('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-3 overflow-y-auto custom-scroll pb-24 lg:pb-0" },
            trainees.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => 
              e('div', { key: u.id, className: `p-4 rounded-2xl border flex justify-between items-center ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-white shadow-sm'}` }, 
                e('div', null, e('h3', { className: "font-black" }, u.name), e('p', { className: "text-[9px] font-black opacity-40 uppercase" }, `Cycle ${u.cycle} • ${u.done}/${u.total}`)),
                e('button', { onClick: () => setActiveUser(u), className: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg transition-all active:scale-90" }, e(Icon, { name: "FileText", className: "w-4 h-4 text-white" }))
              )
            )
          )
        ),
        view === 'att' && activeUser && e('div', { className: "flex flex-col flex-1 overflow-hidden" },
          e('button', { onClick: () => setActiveUser(null), className: "text-indigo-500 font-black uppercase text-[8px] mb-2 flex items-center gap-1" }, e(Icon, { name: "ArrowLeft", className: "w-2 h-2" }), "Back"),
          e('h2', { className: "text-xl font-black uppercase italic mb-3" }, activeUser.name),
          e('div', { className: `flex-1 overflow-hidden border rounded-2xl flex flex-col ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}` },
            e('div', { className: "flex-1 overflow-auto custom-scroll" },
              e('table', { className: "log-table" },
                e('thead', { className: `sticky top-0 z-10 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}` }, 
                  e('tr', { className: "text-slate-500" }, 
                    e('th', { style: { width: '8%' } }, "#"), 
                    e('th', { style: { width: '42%' } }, t.sessionInfo), 
                    e('th', { style: { width: '18%' } }, t.trainerSign), 
                    e('th', { style: { width: '18%' } }, t.memberSign), 
                    e('th', { style: { width: '14%' } }, "Status")
                  )
                ),
                e('tbody', null, userSheetData.map(row => 
                  e('tr', { key: row.row, className: `border-t ${isDark ? 'border-white/5' : 'border-slate-100'}` },
                    e('td', { className: "text-center text-[10px] font-black opacity-30" }, row.row),
                    e('td', { className: "p-2 relative" }, 
                      editSession?.row === row.row ? e('div', { className: `flex flex-col gap-1.5 p-1.5 rounded-lg ${isDark ? 'bg-indigo-950/20' : 'bg-indigo-50/50'}` },
                        e('div', { className: "grid grid-cols-1 gap-1" },
                          e('input', { type: "date", value: editSession.date, onChange: ev => setEditSession({ ...editSession, date: (ev.target as HTMLInputElement).value }), className: "session-input" }),
                          e('input', { type: "time", value: editSession.time, onChange: ev => setEditSession({ ...editSession, time: (ev.target as HTMLInputElement).value }), className: "session-input" })
                        ),
                        e('div', { className: "flex gap-1" },
                          e('button', { onClick: () => handleApplySession(row.row), className: "flex-1 py-2 bg-indigo-600 text-white rounded font-black text-[9px] uppercase shadow-md active:scale-90" }, t.saveChange),
                          e('button', { onClick: () => setEditSession(null), className: `flex-1 py-2 rounded font-black text-[9px] uppercase ${isDark ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}` }, t.cancel)
                        )
                      ) : e('button', { onClick: () => setEditSession({ row: row.row, date: row.date || new Date().toISOString().split('T')[0], time: row.time || "10:00" }), className: `w-full text-left p-3 rounded text-[10px] font-black overflow-hidden truncate transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-50 hover:bg-slate-100'}` }, row.date ? formatSessionDisplay(row.date, row.time) : t.placeholder)
                    ),
                    e('td', { className: "text-center cursor-pointer", onClick: () => setSigModal({ isOpen: true, type: 'trainerSig', rowIndex: row.row }) }, row.trainerSig ? e('img', { src: row.trainerSig, className: `h-8 mx-auto object-contain ${isDark ? 'invert opacity-90' : ''}` }) : e(Icon, { name: "PenTool", className: "w-4 h-4 mx-auto opacity-10" })),
                    e('td', { className: "text-center cursor-pointer", onClick: () => setSigModal({ isOpen: true, type: 'memberSig', rowIndex: row.row }) }, row.memberSig ? e('img', { src: row.memberSig, className: `h-8 mx-auto object-contain ${isDark ? 'invert opacity-90' : ''}` }) : e(Icon, { name: "Pen", className: "w-4 h-4 mx-auto opacity-10" })),
                    e('td', { className: "text-center px-1" }, e('span', { className: `px-1 py-0.5 rounded-full text-[7px] font-black uppercase truncate block ${row.completed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}` }, row.completed ? t.completed : t.pending))
                  )
                ))
              )
            )
          )
        ),
        view === 'manage' && e('div', { className: "flex flex-col flex-1 overflow-hidden" },
          e('div', { className: "flex justify-between items-center mb-4" }, e('h2', { className: "text-xl font-black uppercase italic" }, t.manage), e('button', { onClick: () => setIsAdding(true), className: "px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black uppercase shadow-lg active:scale-95" }, t.add)),
          e('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto custom-scroll pb-24 lg:pb-0" },
            trainees.map(tr => e('div', { key: tr.id, className: `p-5 rounded-3xl border flex justify-between items-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}` },
              e('div', null, e('h3', { className: "font-black" }, tr.name), e('p', { className: "text-[9px] font-black opacity-40 uppercase" }, `Cycle ${tr.cycle} • ${tr.total} Sessions`)),
              e('div', { className: "flex gap-2" },
                e('button', { onClick: () => setIsRenewing(tr), className: "p-2 border border-indigo-500/20 text-indigo-500 rounded-lg active:scale-90" }, e(Icon, { name: "RotateCcw", className: "w-4 h-4" })),
                e('button', { onClick: () => setConfirmModal({ isOpen: true, type: 'trainee', targetId: tr.id }), className: "p-2 bg-rose-500/10 text-rose-500 rounded-lg active:scale-90" }, e(Icon, { name: "Trash2", className: "w-4 h-4" }))
              )
            ))
          )
        ),
        view === 'logs' && e('div', { className: "flex flex-col flex-1 overflow-hidden" },
          e('div', { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4" }, 
            e('h2', { className: "text-xl font-black uppercase italic" }, t.logs), 
            e('select', { value: historyUser?.id || "", onChange: ev => setHistoryUser(trainees.find(tr => tr.id == (ev.target as HTMLSelectElement).value)), className: `p-2.5 rounded-lg border text-[10px] font-black uppercase w-48 outline-none ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200'}` }, e('option', { value: "" }, t.selectMember), trainees.map(tr => e('option', { key: tr.id, value: tr.id }, tr.name)))
          ),
          e('div', { className: `flex-1 overflow-hidden border rounded-3xl flex flex-col ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 shadow-xl'}` },
            historyUser ? e('div', { className: "flex-1 overflow-auto custom-scroll p-4" }, 
              [...new Set(logs.filter(l => l.traineeId === historyUser.id && l.completed).map(l => l.cycle))].sort((a: any, b: any) => (b as number) - (a as number)).map(cycleNum => 
                e('div', { key: cycleNum, className: "mb-8" },
                  e('div', { className: "flex items-center gap-2 mb-3" }, e('span', { className: "px-3 py-1 bg-indigo-600 text-white rounded-full text-[8px] font-black uppercase shadow-md" }, `Cycle ${cycleNum}`), e('div', { className: `flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-100'}` })),
                  e('div', { className: `rounded-xl border overflow-hidden ${isDark ? 'border-white/5' : 'border-slate-100'}` },
                    e('table', { className: "log-table" },
                      e('thead', { className: isDark ? 'bg-slate-800' : 'bg-slate-50' }, 
                        e('tr', { className: "text-slate-500" }, 
                          e('th', { style: { width: '8%' } }, "#"), 
                          e('th', { style: { width: '32%' } }, e('div', null, e('p', null, t.sessionInfo), e('p', { className: "text-[8px] opacity-40 font-black mt-0.5" }, "DD/MM/YYYY"))), 
                          e('th', { style: { width: '18%' } }, t.trainerSign), 
                          e('th', { style: { width: '18%' } }, t.memberSign), 
                          e('th', { style: { width: '16%' } }, "Completed"), 
                          e('th', { style: { width: '8%' } }, "Del")
                        )
                      ),
                      e('tbody', null, logs.filter(l => l.traineeId === historyUser.id && l.completed && l.cycle === cycleNum).sort((a: any, b: any) => (a as any).row - (b as any).row).map(l => 
                        e('tr', { key: l.id, className: `border-t ${isDark ? 'border-white/5' : 'border-slate-100'}` },
                          e('td', { className: "text-center opacity-30 text-[10px] font-black" }, l.row),
                          e('td', { className: "p-3 font-black text-[10px] truncate" }, formatSessionDisplay(l.date, l.time)),
                          e('td', { className: "text-center" }, l.trainerSig ? e('img', { src: l.trainerSig, className: `h-8 w-auto mx-auto object-contain ${isDark ? 'invert' : ''}` }) : "--"),
                          e('td', { className: "text-center" }, l.memberSig ? e('img', { src: l.memberSig, className: `h-8 w-auto mx-auto object-contain ${isDark ? 'invert' : ''}` }) : "--"),
                          e('td', { className: "text-right text-[8px] font-bold text-emerald-500 truncate px-2" }, l.completedAt),
                          e('td', { className: "text-center" }, e('button', { onClick: () => setConfirmModal({ isOpen: true, type: 'log', targetId: l.id }), className: "text-rose-500 p-2 bg-rose-500/5 rounded hover:bg-rose-500/10 active:scale-90" }, e(Icon, { name: "Trash2", className: "w-4 h-4" })))
                        )
                      ))
                    )
                  )
                )
              )
            ) : e('div', { className: "flex-1 flex flex-col items-center justify-center opacity-10 gap-3" }, e(Icon, { name: "Users", className: "w-16 h-16" }), e('p', { className: "font-black uppercase tracking-widest text-xs" }, t.selectToView))
          )
        )
      )
    ),
    // MOBILE NAV
    e('nav', { className: `lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around backdrop-blur-3xl pb-[env(safe-area-inset-bottom)] z-[400] ${isDark ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'}` },
      [['dash', 'LayoutDashboard'], ['att', 'Table'], ['manage', 'Users2'], ['logs', 'ClipboardList']].map(([id, icon], i) => 
        e('button', { key: id, onClick: () => { setView(id); setActiveUser(null); setHistoryUser(null); }, className: `flex flex-col items-center gap-0.5 flex-1 transition-all ${view === id ? 'text-indigo-500' : 'text-slate-400'}` }, e(Icon, { name: icon, className: "w-5 h-5" }), e('span', { className: "text-[8px] font-black uppercase tracking-widest" }, t[id]))
      )
    ),
    // MODALS
    e(SignatureModal, { isOpen: sigModal.isOpen, title: sigModal.type === 'trainerSig' ? t.trainerSign : t.memberSign, isDark: isDark, t: t, onCancel: () => setSigModal({ isOpen: false, type: null, rowIndex: null }), onSave: (sig) => { updateLogRowBatch(activeUser.id, sigModal.rowIndex, { [sigModal.type]: sig }); setSigModal({ isOpen: false, type: null, rowIndex: null }); } }),
    
    // ADD MEMBER MODAL
    isAdding && e('div', { className: "fixed inset-0 z-[600] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" },
      e('div', { className: `w-full max-w-xs p-8 rounded-[2rem] border ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}` },
        e('h3', { className: "text-xl font-black uppercase mb-6 text-center italic" }, t.add),
        e('div', { className: "space-y-4" },
          e('div', null, e('label', { className: "text-[8px] font-black uppercase text-slate-500 mb-1 block" }, t.traineeLabel), e('input', { id: "in-name", placeholder: "Name", className: `w-full p-4 rounded-xl border text-sm font-black outline-none ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}` })),
          e('div', null, e('label', { className: "text-[8px] font-black uppercase text-slate-500 mb-1 block" }, t.lessons), e('input', { id: "in-total", type: "number", defaultValue: "15", className: `w-full p-4 rounded-xl border text-sm font-black outline-none ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}` })),
          e('div', { className: "flex flex-col gap-2 pt-2" },
            e('button', { onClick: () => {
              const n = (document.getElementById('in-name') as HTMLInputElement).value;
              const tot = parseInt((document.getElementById('in-total') as HTMLInputElement).value) || 15;
              if (!n) return;
              setTrainees(prev => [...prev, { id: Date.now(), name: n, cycle: 1, total: tot, done: 0 }]);
              setIsAdding(false);
            }, className: "w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] active:scale-95 shadow-lg" }, t.add),
            e('button', { onClick: () => setIsAdding(false), className: "w-full py-2 text-[9px] font-black uppercase opacity-40" }, t.cancel)
          )
        )
      )
    ),

    // RENEW MODAL
    isRenewing && e('div', { className: "fixed inset-0 z-[600] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" },
      e('div', { className: `w-full max-w-xs p-8 rounded-[2rem] border ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}` },
        e('h3', { className: "text-xl font-black uppercase mb-1 text-center italic" }, t.renew),
        e('p', { className: "text-center text-[8px] font-bold text-slate-500 mb-6" }, `Cycle ${isRenewing.cycle + 1}`),
        e('input', { id: "re-total", type: "number", defaultValue: isRenewing.total, className: `w-full p-4 rounded-xl border text-lg font-black text-center mb-6 outline-none ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}` }),
        e('div', { className: "flex flex-col gap-2" },
          e('button', { onClick: () => {
            const tot = parseInt((document.getElementById('re-total') as HTMLInputElement).value) || 15;
            setTrainees(prev => prev.map(u => u.id === isRenewing.id ? { ...u, cycle: u.cycle + 1, total: tot, done: 0 } : u));
            setIsRenewing(null);
          }, className: "w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] active:scale-95 shadow-lg" }, t.save),
          e('button', { onClick: () => setIsRenewing(null), className: "w-full py-2 text-[9px] font-black uppercase opacity-40" }, t.cancel)
        )
      )
    ),

    // CONFIRM MODAL
    confirmModal.isOpen && e('div', { className: "fixed inset-0 z-[800] bg-black/95 flex items-center justify-center p-4 backdrop-blur-2xl" },
      e('div', { className: `w-full max-w-xs p-8 rounded-[2.5rem] border text-center ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}` },
        e('h3', { className: "text-xl font-black uppercase mb-3 italic" }, t.confirm),
        e('p', { className: "text-[11px] text-slate-400 mb-8 font-medium leading-relaxed" }, confirmModal.type === 'trainee' ? t.confirmDel : t.delLog),
        e('div', { className: "flex flex-col gap-2" },
          e('button', { onClick: () => {
            if (confirmModal.type === 'trainee') {
              setTrainees(p => p.filter(x => x.id !== confirmModal.targetId));
              setLogs(p => p.filter(x => x.traineeId !== confirmModal.targetId));
              if (activeUser?.id === confirmModal.targetId) setActiveUser(null);
              if (historyUser?.id === confirmModal.targetId) setHistoryUser(null);
            } else {
              setLogs(p => p.filter(x => x.id !== confirmModal.targetId));
            }
            setConfirmModal({ isOpen: false, type: null, targetId: null });
          }, className: "w-full py-4 bg-rose-500 text-white rounded-xl font-black uppercase text-[10px] active:scale-95 shadow-xl shadow-rose-500/10" }, t.yes),
          e('button', { onClick: () => setConfirmModal({ isOpen: false, type: null, targetId: null }), className: `w-full py-3 rounded-xl font-black text-[9px] uppercase tracking-widest ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}` }, t.no)
        )
      )
    ),

    // LANG SELECT
    isLangOpen && e('div', { className: "fixed inset-0 z-[700] bg-black/80 flex items-center justify-center p-4 backdrop-blur-md" },
      e('div', { className: `w-full max-w-xs p-6 border rounded-[2rem] ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}` },
        e('h3', { className: "font-black uppercase mb-4 text-center text-sm" }, t.lang),
        e('div', { className: "flex flex-col gap-1.5 max-h-[40vh] overflow-y-auto pr-1 custom-scroll" }, 
          Object.keys(translations).map(k => e('button', { key: k, onClick: () => { setLang(k); setIsLangOpen(false); }, className: `p-3.5 rounded-xl font-black text-left flex justify-between items-center text-[10px] transition-all ${lang === k ? 'bg-indigo-600 text-white' : (isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600')}` }, translations[k].langName, lang === k && e(Icon, { name: "CheckCircle", className: "w-3.5 h-3.5" })))
        ),
        e('button', { onClick: () => setIsLangOpen(false), className: "w-full mt-4 text-[9px] opacity-40 uppercase font-black tracking-widest" }, t.cancel)
      )
    )
  );
};

// Mount App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = (window as any).ReactDOM.createRoot(rootElement);
  root.render(e(App));
}
