import React from 'react';

interface SquareAbsenceProps {
    numberAbsence: number;
}

const AbsenceSquare: React.FC<SquareAbsenceProps> = ({ numberAbsence }) => {
    return (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg border-4 border-zinc-300 bg-zinc-800 text-white font-semibold text-lg float-right ml-4">
            {numberAbsence}
        </div>
    );
};

export default AbsenceSquare;