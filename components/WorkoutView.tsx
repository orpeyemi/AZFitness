
import React from 'react';
// Added CheckCircle2 to the imports
import { Plus, Trash2, Save, Play, Search, X, Dumbbell, Timer, History, CheckCircle2 } from 'lucide-react';
import { EXERCISE_LIBRARY } from '../constants';
import { Exercise } from '../types';

interface WorkoutSetEntry {
  exercise: Exercise;
  sets: {
    weight: number;
    reps: number;
    rpe: number;
    completed: boolean;
  }[];
}

const WorkoutView: React.FC = () => {
  const [isLogging, setIsLogging] = React.useState(false);
  const [showExerciseSearch, setShowExerciseSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [entries, setEntries] = React.useState<WorkoutSetEntry[]>([]);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval: any;
    if (isLogging) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isLogging]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredExercises = EXERCISE_LIBRARY.filter(ex => 
    ex.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addExercise = (exercise: Exercise) => {
    setEntries([...entries, { 
      exercise, 
      sets: [{ weight: 0, reps: 0, rpe: 8, completed: false }] 
    }]);
    setShowExerciseSearch(false);
    setSearchQuery('');
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateSet = (entryIdx: number, setIdx: number, field: string, value: any) => {
    const updated = [...entries];
    (updated[entryIdx].sets[setIdx] as any)[field] = value;
    setEntries(updated);
  };

  const addSet = (entryIdx: number) => {
    const updated = [...entries];
    const lastSet = updated[entryIdx].sets[updated[entryIdx].sets.length - 1];
    updated[entryIdx].sets.push({ 
      weight: lastSet.weight, 
      reps: lastSet.reps, 
      rpe: lastSet.rpe, 
      completed: false 
    });
    setEntries(updated);
  };

  if (!isLogging) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-700">
        <div className="relative">
          <div className="w-24 h-24 bg-[#39FF14]/20 rounded-full flex items-center justify-center text-[#39FF14] animate-pulse">
            <Dumbbell size={48} />
          </div>
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">HQ</div>
        </div>
        <div>
          <h2 className="text-4xl font-black mb-3 italic tracking-tighter uppercase leading-none">Protocol Authorization</h2>
          <p className="text-slate-400 max-w-sm mx-auto leading-relaxed text-sm font-medium">
            Initiate a new performance logging session. All metrics will be synchronized with the Central Forge database.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsLogging(true)}
            className="group relative flex items-center gap-3 bg-[#39FF14] text-black font-black px-10 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.3)]"
          >
            <Play size={20} fill="black" />
            START EMPTY
          </button>
          <button 
            className="flex items-center gap-3 bg-slate-900 text-slate-400 border border-slate-800 font-black px-8 py-5 rounded-2xl hover:text-white transition-all"
          >
            <History size={20} />
            PAST ROUTINES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-32 animate-in slide-in-from-bottom-12">
      <div className="flex items-center justify-between sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md py-6 z-40 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-[#39FF14]">
            <Timer size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">{formatTime(seconds)}</h2>
            <p className="text-[10px] text-slate-500 font-black tracking-[0.2em]">ELAPSED TIME</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsLogging(false)}
            className="p-3 text-slate-500 hover:text-white bg-slate-900 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
          <button 
            className="flex items-center gap-2 bg-[#39FF14] text-black font-black px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all"
            onClick={() => {
              alert('Workout Finished! Analysis complete.');
              setIsLogging(false);
              setEntries([]);
            }}
          >
            <Save size={18} />
            FINISH
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {entries.map((entry, entryIdx) => (
          <div key={entryIdx} className="bg-[#121212] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-black text-xl italic text-[#39FF14] tracking-tight uppercase leading-none">{entry.exercise.name}</h3>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">{entry.exercise.category}</p>
              </div>
              <button onClick={() => removeEntry(entryIdx)} className="text-slate-600 hover:text-red-500 transition-colors bg-slate-900 p-2 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">
                <div className="col-span-1 text-center">Set</div>
                <div className="col-span-4">Weight (lbs)</div>
                <div className="col-span-3">Reps</div>
                <div className="col-span-3">RPE</div>
                <div className="col-span-1"></div>
              </div>
              
              {entry.sets.map((set, setIdx) => (
                <div key={setIdx} className={`grid grid-cols-12 gap-2 items-center p-2 rounded-2xl transition-all ${set.completed ? 'bg-green-500/10 border border-green-500/20' : 'bg-slate-900/40 border border-transparent'}`}>
                  <div className="col-span-1 text-center font-black text-xs text-slate-500">
                    {setIdx + 1}
                  </div>
                  <div className="col-span-4">
                    <input 
                      type="number" 
                      className="w-full bg-[#0a0a0a] border border-slate-800 rounded-xl py-2 px-3 text-sm font-bold text-white focus:border-blue-500 outline-none"
                      value={set.weight || ''}
                      onChange={(e) => updateSet(entryIdx, setIdx, 'weight', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="col-span-3">
                    <input 
                      type="number" 
                      className="w-full bg-[#0a0a0a] border border-slate-800 rounded-xl py-2 px-3 text-sm font-bold text-white focus:border-blue-500 outline-none"
                      value={set.reps || ''}
                      onChange={(e) => updateSet(entryIdx, setIdx, 'reps', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="col-span-3">
                    <select 
                      className="w-full bg-[#0a0a0a] border border-slate-800 rounded-xl py-2 px-2 text-xs font-bold text-slate-400 outline-none"
                      value={set.rpe}
                      onChange={(e) => updateSet(entryIdx, setIdx, 'rpe', parseInt(e.target.value))}
                    >
                      {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button 
                      onClick={() => updateSet(entryIdx, setIdx, 'completed', !set.completed)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${set.completed ? 'bg-[#39FF14] text-black' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                    >
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => addSet(entryIdx)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-slate-800"
            >
              + Add Set
            </button>
          </div>
        ))}

        <button 
          onClick={() => setShowExerciseSearch(true)}
          className="w-full py-10 border-2 border-dashed border-slate-800 rounded-[2.5rem] text-slate-500 font-black tracking-[0.2em] hover:border-[#39FF14]/40 hover:text-[#39FF14] transition-all flex items-center justify-center gap-4 bg-slate-900/10"
        >
          <Plus size={32} strokeWidth={3} />
          AUGMENT PROTOCOL
        </button>
      </div>

      {showExerciseSearch && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60] flex items-end md:items-center justify-center p-4">
          <div className="bg-[#121212] border border-slate-800 w-full max-w-lg rounded-t-[3rem] md:rounded-[3rem] p-10 space-y-8 animate-in slide-in-from-bottom-full duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">TARGET ACQUISITION</h3>
              <button onClick={() => setShowExerciseSearch(false)} className="bg-slate-900 p-3 rounded-2xl text-slate-500"><X size={20}/></button>
            </div>
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#39FF14] transition-colors" size={24} />
              <input 
                autoFocus
                type="text"
                placeholder="Search database..."
                className="w-full bg-[#0a0a0a] border border-slate-800 rounded-[1.5rem] py-5 pl-16 pr-8 outline-none focus:border-[#39FF14] font-bold text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="max-h-[40vh] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {filteredExercises.map(ex => (
                <button 
                  key={ex.id}
                  onClick={() => addExercise(ex)}
                  className="w-full text-left p-6 rounded-[1.5rem] bg-slate-900/50 border border-slate-800/50 hover:border-[#39FF14]/50 transition-all flex justify-between items-center group"
                >
                  <div>
                    <p className="font-black text-xl italic uppercase tracking-tighter group-hover:text-[#39FF14] transition-colors">{ex.name}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest font-black mt-1">{ex.category}</p>
                  </div>
                  <Plus size={24} className="text-slate-700 group-hover:text-[#39FF14]" strokeWidth={3} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutView;
