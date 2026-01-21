
import React from 'react';

interface HeatmapProps {
  data: number[][];
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex gap-[2px] text-[10px] text-slate-500 font-bold uppercase tracking-tighter mb-1">
        {months.map((m, i) => (
          <div key={i} className="flex-1 text-center">{m}</div>
        ))}
      </div>
      <div className="flex gap-1 overflow-x-auto pb-4 no-scrollbar">
        {data.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-1 shrink-0">
            {week.map((day, dIdx) => {
              const colors = [
                'bg-slate-800/50', 
                'bg-green-900/40', 
                'bg-green-700/60', 
                'bg-green-500/80', 
                'bg-[#39FF14]'
              ];
              const intensity = Math.min(day, 4);
              return (
                <div 
                  key={dIdx} 
                  className={`w-3 h-3 rounded-[2px] ${colors[intensity]} transition-all hover:ring-1 hover:ring-white cursor-pointer`}
                  title={`Activity Level: ${day}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-[1px] bg-slate-800/50"></div>
          <div className="w-2 h-2 rounded-[1px] bg-green-900/40"></div>
          <div className="w-2 h-2 rounded-[1px] bg-green-700/60"></div>
          <div className="w-2 h-2 rounded-[1px] bg-green-500/80"></div>
          <div className="w-2 h-2 rounded-[1px] bg-[#39FF14]"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default Heatmap;
