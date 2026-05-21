import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[#FDFAF4] rounded-2xl border border-stone-200/60 p-5 space-y-4 animate-pulse shadow-sm">
      <div className="flex justify-between items-center">
        <div className="h-5 bg-stone-300 rounded-full w-20" />
        <div className="h-5 bg-stone-300 rounded-full w-14" />
      </div>
      <div className="h-6 bg-stone-300 rounded w-3/4" />
      <div className="flex items-center space-x-3 mt-4">
        <div className="h-8 w-8 rounded-full bg-stone-300" />
        <div className="h-4 bg-stone-300 rounded w-24" />
      </div>
      <div className="space-y-2 pt-2 border-t border-dashed border-stone-200">
        <div className="h-4 bg-stone-300 rounded w-1/2" />
        <div className="h-3 bg-stone-300 rounded w-1/3" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-5 bg-stone-300 rounded w-16" />
        <div className="h-10 bg-stone-300 rounded-full w-28" />
      </div>
    </div>
  );
};

export const SkeletonVideoCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden animate-pulse shadow-sm">
      <div className="aspect-video bg-stone-300 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-stone-300 rounded w-1/3" />
        <div className="h-6 bg-stone-300 rounded w-5/6" />
        <div className="h-4 bg-stone-300 rounded w-1/2" />
      </div>
    </div>
  );
};
export default SkeletonCard;
