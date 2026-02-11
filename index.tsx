import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

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
    yes: "確認刪除", no: "取消", pending: "草稿", completed: "已完成",
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
    save: "Iniciar Ciclo", active: "Activo", date: "Fecha", progress: "Progreso",
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
  get: (k: string) => {
    try {
      const val = localStorage.getItem(k);
      if (!val) return k === db.KEYS.LN ? 'en' : k === db.KEYS.TM ? 'dark' : [];
      return JSON.parse(val);
    } catch {
      return k === db.KEYS.LN ? 'en' : k === db.KEYS.TM ? 'dark' : [];
    }
  },
  set: (k: string, v: any) => localStorage.setItem(k, JSON.stringify(v))
};

const Icon = ({ name, className }: { name: string, className?: string }) => {
  const iconData = (window as any).lucide.icons[name.charAt(0).toLowerCase() + name.slice(1)] || (window as any).lucide.icons[name];
  if (!iconData) return null;
  const [tag, attrs, children] = iconData;
  return React.createElement(tag, { ...attrs, className: className || 'w-6 h-6', stroke: 'currentColor' }, 
    children.map((child: any, i: number) => React.createElement(child[0], { ...child[1], key: i }))
  );
};

const formatSessionDisplay = (dateStr: string, timeStr: string) => {
    if (!dateStr) return null;
    const [y, m, d] = dateStr.split('-');
    const dateFormatted = `${m}/${d}/${y}`;
    
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

const SignatureModal = ({ isOpen, title, onSave, onCancel, t, isDark }: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const getPos = (ev: any) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const clientX = (ev.touches ? ev.touches[0].clientX : ev.clientX);
    const clientY = (ev.touches ? ev.touches[0].clientY : ev.clientY);
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const start = (ev: any) => {
    if (ev.cancelable) ev.preventDefault();
    const { x, y } = getPos(ev);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const move = (ev: any) => {
    if (!isDrawing) return;
    if (ev.cancelable) ev.preventDefault();
    const { x, y } = getPos(ev);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stop = () => setIsDrawing(false);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const canvas = canvasRef.current!;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d')!;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3 * dpr;
      ctx.strokeStyle = isDark ? '#818cf8' : '#4f46e5';
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen, isDark]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
      <div className={`w-full max-w-xl p-8 border rounded-[3rem] ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200 shadow-2xl'}`}>
        <h3 className={`text-2xl font-black uppercase mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
        <div className={`h-64 border-2 rounded-[2rem] overflow-hidden mb-6 ${isDark ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
          <canvas
            ref={canvasRef}
            onMouseDown={start} onMouseMove={move} onMouseUp={stop} onMouseOut={stop}
            onTouchStart={start} onTouchMove={move} onTouchEnd={stop}
            className="w-full h-full block touch-none"
          />
        </div>
        <div className="flex gap-4">
          <button onClick={() => {
             const c = canvasRef.current!;
             c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
          }} className={`flex-1 py-4 rounded-xl font-bold uppercase transition-colors ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t.reset}</button>
          <button onClick={onCancel} className={`flex-1 py-4 rounded-xl font-bold uppercase transition-colors ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t.cancel}</button>
          <button onClick={() => onSave(canvasRef.current!.toDataURL())} className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase shadow-xl hover:bg-indigo-500 active:scale-95">{t.sign}</button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<string>(() => db.get(db.KEYS.LN));
  const [theme, setTheme] = useState<string>(() => db.get(db.KEYS.TM));
  const [view, setView] = useState('dash');
  const [trainees, setTrainees] = useState<any[]>(() => db.get(db.KEYS.TR));
  const [logs, setLogs] = useState<any[]>(() => db.get(db.KEYS.LG));
  const [search, setSearch] = useState('');
  
  const [activeUser, setActiveUser] = useState<any>(null);
  const [historyUser, setHistoryUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [sigModal, setSigModal] = useState<any>({ isOpen: false, type: null, rowIndex: null });
  const [isAdding, setIsAdding] = useState(false);
  const [isRenewing, setIsRenewing] = useState<any>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<any>({ isOpen: false });

  const [editSession, setEditSession] = useState<{row: number, date: string, time: string} | null>(null);

  const t = (translations as any)[lang] || translations['en'];
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

  const updateLogRowBatch = (traineeId: number, rowNum: number, updates: Record<string, any>) => {
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
         newLog = { 
           id: logId, traineeId, cycle: currentCycle, row: rowNum, name: activeUser.name,
           date: '', time: '', trainerSig: null, memberSig: null, completedAt: '', completed: false,
           ...updates
         };
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

  const handleApplySession = (row: number) => {
    if (!editSession) return;
    updateLogRowBatch(activeUser.id, row, { date: editSession.date, time: editSession.time });
    setEditSession(null);
  };

  const handleClearSession = (row: number) => {
    updateLogRowBatch(activeUser.id, row, { date: '', time: '' });
    setEditSession(null);
  };

  return (
    <div className={`flex flex-col lg:flex-row h-screen w-screen overflow-hidden ${isDark ? 'text-white' : 'text-slate-900'}`}>
      {/* SIDEBAR */}
      <nav className={`hidden lg:flex w-64 flex-col gap-6 p-6 border-r shrink-0 ${isDark ? 'border-white/5 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20"><Icon name="Activity" className="text-white w-6 h-6" /></div>
          <h1 className="text-lg font-black uppercase tracking-tight">FitCheck Pro</h1>
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto">
          {[
            ['dash', 'LayoutDashboard', t.dash],
            ['att', 'Table', t.att],
            ['manage', 'Users2', t.manage],
            ['logs', 'ClipboardList', t.logs]
          ].map(([id, icon, label]) => (
            <button key={id} onClick={() => { setView(id); setActiveUser(null); setHistoryUser(null); setIsDropdownOpen(false); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${view === id ? 'bg-indigo-600 text-white shadow-xl' : (isDark ? 'text-slate-500 hover:bg-white/5' : 'text-slate-400 hover:bg-slate-50')}`}>
              <Icon name={icon} className="w-4 h-4" />
              <span className="font-black uppercase text-[10px] tracking-widest">{label}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-2">
           <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className={`flex items-center justify-between p-3 rounded-lg border text-[9px] font-black uppercase ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50 text-slate-900'}`}>
              {t.theme} <Icon name={isDark ? 'Moon' : 'Sun'} className="w-3.5 h-3.5 opacity-50" />
           </button>
           <button onClick={() => setIsLangOpen(true)} className={`flex items-center justify-between p-3 rounded-lg border text-[9px] font-black uppercase ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-100 bg-slate-50 text-slate-900'}`}>
              {t.lang} <span className="opacity-50 truncate ml-1">{t.langName}</span>
           </button>
        </div>
      </nav>

      {/* MOBILE HEADER */}
      <header className={`lg:hidden mobile-header-pad flex justify-between items-center px-4 border-b z-50 shrink-0 ${isDark ? 'bg-slate-950/95 border-white/5' : 'bg-white border-slate-200'} backdrop-blur-xl`}>
        <h1 className="font-black uppercase text-lg">FitCheck</h1>
        <div className="flex gap-1">
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2"><Icon name={isDark ? 'Moon' : 'Sun'} className="opacity-60 w-5 h-5" /></button>
          <button onClick={() => setIsLangOpen(true)} className="p-2 text-[10px] font-black uppercase">{lang.toUpperCase()}</button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden flex flex-col p-3 lg:p-6">
        <div className="w-full flex-1 flex flex-col overflow-hidden animate-fade-in">
          {view === 'dash' && (
            <div className="space-y-4 overflow-y-auto pr-1 custom-scroll flex-1">
              <header>
                <h2 className="text-2xl lg:text-4xl font-black mb-1">{t.welcome}</h2>
                <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-[9px]">Performance Dashboard</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  [t.total, stats.total, 'text-indigo-500'],
                  [t.today, stats.today, 'text-emerald-500'],
                  [t.active, stats.active, 'text-slate-500']
                ].map(([label, val, cls]: any) => (
                  <div key={label} className={`p-5 rounded-[1.5rem] border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
                    <p className={`text-3xl font-black mt-1 ${cls}`}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'att' && !activeUser && (
             <div className="flex flex-col flex-1 overflow-hidden space-y-3">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
                   <h2 className="text-xl font-black uppercase italic">{t.att}</h2>
                   <div className="relative w-full md:max-w-xs">
                      <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-30" />
                      <input placeholder={t.search} onChange={e => setSearch(e.target.value)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg border outline-none text-xs ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pr-1 custom-scroll pb-24 lg:pb-0">
                   {trainees.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(u => (
                      <div key={u.id} className={`p-4 rounded-[1.5rem] border group ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                         <div className="flex justify-between items-start mb-3">
                            <div>
                               <h3 className="text-base font-black truncate max-w-[150px]">{u.name}</h3>
                               <p className="text-[8px] font-black uppercase text-slate-500 mt-0.5">C{u.cycle} • {u.done}/{u.total}</p>
                            </div>
                            <button onClick={() => setActiveUser(u)} className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg active:scale-90"><Icon name="FileText" className="w-4 h-4"/></button>
                         </div>
                         <div className={`w-full h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                            <div className="h-full bg-indigo-500 transition-all duration-700" style={{ width: `${Math.min(((u.done||0)/u.total)*100, 100)}%` }} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {view === 'att' && activeUser && (
             <div className="flex flex-col flex-1 overflow-hidden space-y-3 pb-20 lg:pb-0">
                <div className="flex justify-between items-end gap-2 shrink-0">
                   <div className="overflow-hidden">
                      <button onClick={() => setActiveUser(null)} className="flex items-center gap-1 text-indigo-500 font-black uppercase text-[8px] mb-0.5 hover:translate-x-[-1px]">
                         <Icon name="ArrowLeft" className="w-2.5 h-2.5" /> Back
                      </button>
                      <h2 className={`text-xl font-black uppercase italic truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeUser.name}</h2>
                   </div>
                </div>

                <div className={`flex-1 overflow-hidden rounded-[1.5rem] border flex flex-col ${isDark ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                   <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scroll">
                      <table className="w-full table-fixed border-collapse">
                         <thead className="sticky top-0 z-10">
                            <tr className={`${isDark ? 'bg-slate-800' : 'bg-slate-50'} text-slate-500 text-[8px] font-black uppercase tracking-widest`}>
                               <th className="p-2 w-[8%] text-center">#</th>
                               <th className="p-2 w-[35%] text-left">{t.sessionInfo}</th>
                               <th className="p-2 w-[20%] text-center">{t.trainerSign}</th>
                               <th className="p-2 w-[20%] text-center">{t.memberSign}</th>
                               <th className="p-2 w-[17%] text-center">Status</th>
                            </tr>
                         </thead>
                         <tbody>
                            {userSheetData.map((row: any) => (
                               <tr key={row.row} className={`border-t ${isDark ? 'border-white/5' : 'border-slate-100'} ${row.completed ? 'bg-emerald-500/5' : ''}`}>
                                  <td className="p-1 text-center font-black opacity-30 text-[10px]">{row.row}</td>
                                  <td className="p-2 relative overflow-visible">
                                     <div className="flex items-center">
                                       {editSession?.row === row.row ? (
                                          <div className={`absolute top-0 left-0 w-64 p-3 rounded-lg border shadow-2xl z-[100] ${isDark ? 'bg-slate-800 border-white/10' : 'bg-white border-slate-200'}`}>
                                             <div className="grid grid-cols-2 gap-2 mb-2">
                                                <input type="date" value={editSession.date} onChange={e => setEditSession({ ...editSession, date: e.target.value })} className="session-input h-8 text-[10px]" />
                                                <input type="time" value={editSession.time} onChange={e => setEditSession({ ...editSession, time: e.target.value })} className="session-input h-8 text-[10px]" />
                                             </div>
                                             <div className="flex gap-2">
                                                <button onClick={() => handleApplySession(row.row)} className="flex-1 py-2 bg-indigo-600 text-white rounded-md font-black uppercase text-[9px] shadow active:scale-95">{t.saveChange}</button>
                                                <button onClick={() => handleClearSession(row.row)} className="p-2 bg-rose-500/10 text-rose-500 rounded-md active:scale-95"><Icon name="Eraser" className="w-3.5 h-3.5"/></button>
                                                <button onClick={() => setEditSession(null)} className={`p-2 rounded-md ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}><Icon name="X" className="w-3.5 h-3.5 opacity-40"/></button>
                                             </div>
                                          </div>
                                       ) : (
                                          <button onPointerDown={() => setEditSession({ row: row.row, date: row.date || new Date().toISOString().split('T')[0], time: row.time || "10:00" })} className={`w-full px-2 py-3 rounded-md border flex items-center justify-between overflow-hidden ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'} ${!row.date ? 'opacity-30' : ''}`}>
                                             <span className="font-black text-[9px] truncate">{row.date ? formatSessionDisplay(row.date, row.time) : t.placeholder}</span>
                                             <Icon name="ChevronRight" className="w-2.5 h-2.5 opacity-20 shrink-0" />
                                          </button>
                                       )}
                                     </div>
                                  </td>
                                  <td className="p-1 text-center cursor-pointer" onClick={() => setSigModal({ isOpen: true, type: 'trainerSig', rowIndex: row.row })}>
                                     {row.trainerSig ? <img src={row.trainerSig} className={`h-8 mx-auto ${isDark ? 'invert' : ''}`} /> : <Icon name="ShieldCheck" className="mx-auto opacity-5 w-5 h-5" />}
                                  </td>
                                  <td className="p-1 text-center cursor-pointer" onClick={() => setSigModal({ isOpen: true, type: 'memberSig', rowIndex: row.row })}>
                                     {row.memberSig ? <img src={row.memberSig} className={`h-8 mx-auto ${isDark ? 'invert' : ''}`} /> : <Icon name="UserCheck" className="mx-auto opacity-5 w-5 h-5" />}
                                  </td>
                                  <td className="p-1 text-center">
                                     <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase block truncate ${row.completed ? 'bg-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                                        {row.completed ? t.completed : t.pending}
                                     </span>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          )}

          {view === 'manage' && (
             <div className="flex flex-col flex-1 overflow-hidden space-y-3">
                <div className="flex justify-between items-center shrink-0">
                   <h2 className="text-xl font-black uppercase italic">{t.manage}</h2>
                   <button onClick={() => setIsAdding(true)} className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-black text-[9px] uppercase shadow active:scale-95">{t.add}</button>
                </div>
                <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3 pr-1 custom-scroll pb-24 lg:pb-0">
                   {trainees.map(tr => (
                      <div key={tr.id} className={`p-5 rounded-[1.5rem] border flex justify-between items-center ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                         <div>
                            <h3 className="text-base font-black truncate max-w-[150px]">{tr.name}</h3>
                            <p className="text-[8px] font-black uppercase text-slate-500 opacity-60 mt-0.5">Cycle {tr.cycle} • {tr.total} Sessions</p>
                         </div>
                         <div className="flex gap-2">
                            <button onClick={() => setIsRenewing(tr)} className="p-2 border rounded-lg hover:bg-indigo-500/10 border-indigo-500/20 text-indigo-500"><Icon name="RotateCcw" className="w-4 h-4" /></button>
                            <button onClick={() => setConfirmModal({ isOpen: true, type: 'trainee', targetId: tr.id })} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg"><Icon name="Trash2" className="w-4 h-4" /></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {view === 'logs' && (
             <div className="flex flex-col flex-1 overflow-hidden space-y-3 pb-20 lg:pb-0">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shrink-0">
                   <h2 className="text-xl font-black uppercase italic">{t.logs}</h2>
                   <div className="relative w-full md:max-w-md">
                      <button onPointerDown={() => setIsDropdownOpen(!isDropdownOpen)} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border font-black text-[10px] uppercase ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'}`}>
                         <span className="truncate">{historyUser ? historyUser.name : t.selectMember}</span>
                         <Icon name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} className="w-4 h-4 opacity-30 shrink-0" />
                      </button>
                      {isDropdownOpen && (
                        <div className={`absolute top-full left-0 right-0 mt-2 border rounded-xl overflow-hidden shadow-2xl max-h-[250px] overflow-y-auto animate-fade-in z-[300] ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                           {trainees.map(tr => (
                              <button key={tr.id} onPointerDown={() => { setHistoryUser(tr); setIsDropdownOpen(false); }} className={`w-full text-left p-3 font-black text-[10px] uppercase border-b last:border-none ${isDark ? 'border-white/5 hover:bg-indigo-600 text-white' : 'border-slate-100 hover:bg-indigo-50 text-slate-900'}`}>{tr.name}</button>
                           ))}
                        </div>
                      )}
                   </div>
                </header>

                <div className={`flex-1 overflow-hidden rounded-[1.5rem] border flex flex-col ${isDark ? 'bg-slate-900 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'}`}>
                   {historyUser ? (
                      <div className="flex flex-col flex-1 overflow-hidden">
                         <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scroll p-3">
                            {[...new Set(logs.filter(l => l.traineeId === historyUser.id && l.completed).map(l => l.cycle))].sort((a: any, b: any) => Number(b) - Number(a)).map(cycleNum => (
                               <div key={cycleNum} className="mb-8 last:mb-0">
                                  <div className="flex items-center gap-3 mb-2">
                                     <span className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[8px] font-black uppercase">Cycle {cycleNum}</span>
                                     <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
                                  </div>
                                  <div className="rounded-xl border overflow-hidden">
                                     <table className="w-full table-fixed border-collapse">
                                        <thead>
                                           <tr className={`text-[8px] font-black uppercase text-slate-500 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                              <th className="p-2 w-[8%] text-center">#</th>
                                              <th className="p-2 w-[35%]">
                                                 <p>{t.sessionInfo}</p>
                                                 <p className="text-[7px] opacity-40 font-bold">(MM/DD/YYYY)</p>
                                              </th>
                                              <th className="p-2 w-[18%] text-center">{t.trainerSign}</th>
                                              <th className="p-2 w-[18%] text-center">{t.memberSign}</th>
                                              <th className="p-2 w-[21%] text-right">{t.completeAt}</th>
                                              <th className="p-2 w-[10%] text-center">{t.del}</th>
                                           </tr>
                                        </thead>
                                        <tbody>
                                           {logs.filter(l => l.traineeId === historyUser.id && l.completed && l.cycle === cycleNum).sort((a: any, b: any) => Number(a.row) - Number(b.row)).map(l => (
                                              <tr key={l.id} className={`border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                                                 <td className="p-2 text-center font-black opacity-20 text-[9px]">{l.row}</td>
                                                 <td className="p-2 truncate font-black text-[10px]">{formatSessionDisplay(l.date, l.time)}</td>
                                                 <td className="p-2 text-center">
                                                    {l.trainerSig ? <img src={l.trainerSig} className={`h-8 w-auto mx-auto object-contain ${isDark ? 'invert' : ''}`} /> : <Icon name="Minus" className="opacity-10 mx-auto w-3 h-3" />}
                                                 </td>
                                                 <td className="p-2 text-center">
                                                    {l.memberSig ? <img src={l.memberSig} className={`h-8 w-auto mx-auto object-contain ${isDark ? 'invert' : ''}`} /> : <Icon name="Minus" className="opacity-10 mx-auto w-3 h-3" />}
                                                 </td>
                                                 <td className="p-2 text-right text-[8px] font-black text-emerald-500 uppercase leading-tight truncate">
                                                    {l.completedAt}
                                                 </td>
                                                 <td className="p-2 text-center">
                                                    <button onPointerDown={() => setConfirmModal({ isOpen: true, type: 'log', targetId: l.id })} className="p-2 text-rose-500 bg-rose-500/10 rounded-md active:scale-90 transition-transform"><Icon name="Trash2" className="w-3.5 h-3.5"/></button>
                                                 </td>
                                              </tr>
                                           ))}
                                        </tbody>
                                     </table>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   ) : (
                      <div className="flex-1 flex flex-col items-center justify-center opacity-10 gap-3 text-center p-8 animate-pulse">
                         <Icon name="Users" className="w-16 h-16" />
                         <p className="font-black uppercase text-lg tracking-[0.3em]">{t.selectToView}</p>
                      </div>
                   )}
                </div>
             </div>
          )}
        </div>
      </main>

      {/* MOBILE NAV */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t flex items-center justify-around backdrop-blur-3xl pb-[env(safe-area-inset-bottom)] z-[400] ${isDark ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        {[
          ['dash', 'LayoutDashboard', t.dash],
          ['att', 'Table', t.att],
          ['manage', 'Users2', t.manage],
          ['logs', 'ClipboardList', t.logs]
        ].map(([id, icon, label]) => (
          <button key={id} onClick={() => { setView(id); setActiveUser(null); setHistoryUser(null); setIsDropdownOpen(false); }} className={`flex flex-col items-center gap-0.5 p-1 flex-1 transition-colors ${view === id ? 'text-indigo-500' : 'text-slate-400'}`}>
            <Icon name={icon} className="w-4 h-4" />
            <span className="text-[7px] font-black uppercase tracking-widest">{label}</span>
          </button>
        ))}
      </nav>

      {/* RENEW CYCLE MODAL */}
      {isRenewing && (
         <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs p-6 border rounded-[2rem] ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}`}>
               <h3 className="text-xl font-black uppercase mb-1 text-center italic">{t.renew}</h3>
               <p className="text-center text-slate-500 text-[9px] mb-6 font-medium tracking-wide">Starting Cycle {isRenewing.cycle + 1}</p>
               <div className="space-y-4">
                  <input id="re-total" type="number" defaultValue={isRenewing.total} className={`w-full p-3 rounded-lg border font-black text-lg outline-none ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`} />
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => {
                       const total = parseInt((document.getElementById('re-total') as HTMLInputElement).value) || 15;
                       setTrainees(prev => prev.map(u => u.id === isRenewing.id ? { ...u, cycle: u.cycle + 1, total, done: 0 } : u));
                       setIsRenewing(null);
                    }} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-black uppercase text-xs active:scale-95">{t.save}</button>
                    <button onClick={() => setIsRenewing(null)} className="w-full py-1 text-slate-500 font-bold uppercase text-[8px] tracking-widest">{t.cancel}</button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* SIGNATURE PAD */}
      <SignatureModal isOpen={sigModal.isOpen} title={sigModal.type === 'trainerSig' ? t.trainerSign : t.memberSign} isDark={isDark} t={t} onCancel={() => setSigModal({ isOpen: false })} onSave={(sig: string) => { updateLogRowBatch(activeUser.id, sigModal.rowIndex, { [sigModal.type]: sig }); setSigModal({ isOpen: false }); }} />

      {/* ADD NEW MEMBER */}
      {isAdding && (
         <div className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs p-6 border rounded-[2rem] ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}`}>
               <h3 className="text-xl font-black uppercase mb-6 text-center italic">{t.add}</h3>
               <div className="space-y-4">
                  <div>
                    <label className="text-[8px] font-black uppercase text-slate-500 mb-1 block tracking-widest">{t.traineeLabel}</label>
                    <input id="in-name" placeholder="Full Name" className={`w-full p-3 rounded-lg border font-black text-xs outline-none focus:ring-1 focus:ring-indigo-500/20 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`} />
                  </div>
                  <div>
                    <label className="text-[8px] font-black uppercase text-slate-500 mb-1 block tracking-widest">{t.lessons}</label>
                    <input id="in-total" type="number" defaultValue={15} className={`w-full p-3 rounded-lg border font-black text-xs outline-none focus:ring-1 focus:ring-indigo-500/20 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'}`} />
                  </div>
                  <div className="pt-2 flex flex-col gap-1.5">
                    <button onClick={() => {
                       const name = (document.getElementById('in-name') as HTMLInputElement).value;
                       const total = parseInt((document.getElementById('in-total') as HTMLInputElement).value) || 15;
                       if (!name) return;
                       setTrainees(prev => [...prev, { id: Date.now(), name, cycle: 1, total, done: 0 }]);
                       setIsAdding(false);
                    }} className="w-full py-3 bg-indigo-600 text-white rounded-lg font-black uppercase text-xs active:scale-95">{t.add}</button>
                    <button onClick={() => setIsAdding(false)} className="w-full py-1 text-slate-500 font-bold uppercase text-[8px] tracking-widest">{t.cancel}</button>
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* LANGUAGE OVERLAY */}
      {isLangOpen && (
         <div className="fixed inset-0 z-[700] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className={`w-full max-w-xs p-6 border rounded-[2rem] ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}`}>
               <h3 className="text-lg font-black uppercase mb-4 text-center italic">{t.lang}</h3>
               <div className="flex flex-col gap-1.5 max-h-[40vh] overflow-y-auto pr-1 custom-scroll">
                  {Object.keys(translations).map(k => (
                     <button key={k} onPointerDown={() => { setLang(k); setIsLangOpen(false); }} className={`w-full p-3 rounded-lg font-black text-left flex justify-between items-center transition-all text-[10px] ${lang === k ? 'bg-indigo-600 text-white shadow-lg' : (isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600')}`}>
                        {(translations as any)[k].langName}
                        {lang === k && <Icon name="CheckCircle" className="w-3.5 h-3.5" />}
                     </button>
                  ))}
               </div>
               <button onClick={() => setIsLangOpen(false)} className="w-full py-3 text-slate-500 font-bold uppercase text-[8px] mt-2 tracking-widest">{t.cancel}</button>
            </div>
         </div>
      )}

      {/* GLOBAL CONFIRMATION OVERLAY */}
      {confirmModal.isOpen && (
         <div className="fixed inset-0 z-[800] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className={`w-full max-w-xs p-8 border rounded-[2rem] text-center ${isDark ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-2xl'}`}>
               <h3 className="text-xl font-black uppercase mb-3 italic">{t.confirm}</h3>
               <p className="text-slate-400 mb-8 font-medium text-xs leading-relaxed">
                 {confirmModal.type === 'trainee' ? t.confirmDel : t.delLog}
               </p>
               <div className="flex flex-col gap-2">
                  <button onPointerDown={() => {
                     if (confirmModal.type === 'trainee') {
                        setTrainees(prev => prev.filter(x => x.id !== confirmModal.targetId));
                        setLogs(prev => prev.filter(x => x.traineeId !== confirmModal.targetId));
                        if (activeUser?.id === confirmModal.targetId) setActiveUser(null);
                        if (historyUser?.id === confirmModal.targetId) setHistoryUser(null);
                     } else {
                        setLogs(prev => prev.filter(x => x.id !== confirmModal.targetId));
                     }
                     setConfirmModal({ isOpen: false });
                  }} className="w-full py-4 bg-rose-500 text-white rounded-lg font-black uppercase text-xs active:scale-95">{t.yes}</button>
                  <button onClick={() => setConfirmModal({ isOpen: false })} className={`w-full py-3 rounded-lg font-black uppercase text-[9px] tracking-widest ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t.no}</button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);