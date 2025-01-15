import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Task } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskProgressProps {
  tasks: Task[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ tasks }) => {
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.length - completed;

  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#4CAF50', '#FFA726'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          fontColor: '#333',
          fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          

        },
      },
    },
    
    
  };

  return (
    <div className="relative w-50 h-50 mx-auto dark:text-white">
      <Doughnut data={data} options={options} />
      {/* legend */}
      
      <div className="absolute top-0  inset-0 flex items-center justify-center">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold">{Math.round((completed / tasks.length) * 100)}%</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;