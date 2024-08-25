import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import DeepBreathingImage from '../components/imgs/Group 958.png'; 
import MindfulnessMeditationImage from '../components/imgs/40066-girl-yoga.svg';  
import ProgressiveMuscleRelaxationImage from '../components/imgs/fineoffinal.jpg'; 
const StressRelief = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const navigate = useNavigate();

    const exercises = [
        { id: 1, name: "Deep Breathing", description: "Practice deep breathing for 5 minutes.", image: DeepBreathingImage },
        { id: 2, name: "Progressive Muscle Relaxation", description: "Tense and relax each muscle group.", image: ProgressiveMuscleRelaxationImage },
        { id: 3, name: "Mindfulness Meditation", description: "Focus on the present moment without judgment.", image: MindfulnessMeditationImage },
    ];

    // Function to handle exercise click
    const handleExerciseClick = (exercise) => {
        if (exercise.name === "Progressive Muscle Relaxation") {
            navigate('/progressive-muscle-relaxation'); // Navigate to the new route
        } else {
            setSelectedExercise(exercise); // Set state to show modal popup for other exercises
        }
    };

    // Function to close the popup
    const handleClosePopup = () => {
        setSelectedExercise(null);
    };

    return (
        <div className='max-w-[1400px] mx-auto py-12'>
            <h2 className='text-3xl font-bold mb-4 text-center text-blue-700'>Stress Relief Exercises</h2>
            <p className='text-lg text-center mb-8 text-gray-700'>
                Discover various exercises that can help relieve stress and promote relaxation. Click on each exercise to learn more!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent">
                {exercises.map((exercise) => (
                    <div 
                        key={exercise.id} 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 p-6 rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105 flex flex-col justify-between"
                        onClick={() => handleExerciseClick(exercise)}
                        style={{ borderRadius: '15px', width: '100%', maxWidth: '350px', margin: '0 auto' }}  // Increased box size
                    >
                        <div className="flex flex-col items-center flex-grow">
                            <img 
                                src={exercise.image} 
                                alt={exercise.name} 
                                className={`object-cover rounded-lg mb-4`}  // Adjusted image height and width
                                style={{ width: '100%', height: '200px', borderRadius: '10px' }}  // Set specific width and height for consistency
                            />
                            <h3 className='text-xl font-semibold mb-2 text-white'>{exercise.name}</h3>
                            <p className='text-white text-center'>{exercise.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup */}
            {selectedExercise && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full"> {/* Changed background color to pale pink */}
                        <h3 className='text-2xl font-bold mb-4'>{selectedExercise.name}</h3>
                        {selectedExercise.name === "Deep Breathing" && (
                            <div>
                                <ol className='list-decimal list-inside mb-4'>
                                    <li>Find a quiet space: Sit comfortably with your back straight or lie on your back.</li>
                                    <li>Close your eyes: Focus your attention inward.</li>
                                    <li>Inhale deeply: Breathe in slowly through your nose, filling your lungs completely (count to 4).</li>
                                    <li>Hold: Hold your breath for a few seconds (count to 2).</li>
                                    <li>Exhale slowly: Breathe out slowly through your mouth, emptying your lungs completely (count to 4).</li>
                                    <li>Repeat: Continue this cycle for 5 minutes, focusing on your breath.</li>
                                </ol>
                            </div>
                        )}
                        {selectedExercise.name === "Mindfulness Meditation" && (
                            <div>
                                <ol className='list-decimal list-inside mb-4'>
                                    <li>Find a quiet space: Sit comfortably with eyes closed.</li>
                                    <li>Focus on your breath: Feel the sensation of air entering and leaving your nostrils.</li>
                                    <li>When your mind wanders: Gently bring it back to your breath.</li>
                                    <li>Be present: Notice the present moment without judgment.</li>
                                    <li>Body scan: Bring awareness to your body, starting from your toes to the top of your head.</li>
                                    <li>Loving-kindness: Repeat phrases like "May I be happy, may I be healthy, may I be at peace".</li>
                                    <li>Start small: Begin with 5-10 minute sessions and increase as you become more comfortable.</li>
                                    <li>Be gentle: Remember that it's okay if your mind wanders.</li>
                                </ol>
                            </div>
                        )}
                        <p className='mb-4'>{selectedExercise.description}</p>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StressRelief;
