import React, { useState } from 'react';
import ChildsPoseImage from '../components/imgs/childs-pose.jpg';  
import NeckStretchImage from '../components/imgs/neck-stretch.jpg';

const exercises = [
    {
        name: "Child’s Pose",
        image: ChildsPoseImage,
        description: "Your lower back is a prime place for the body to hold tension, Decker says. Stretches like this one, which elongates the back, release low back tightness and stiffness. The yoga pose can also promote healthy sleep, according to Harvard Health Publishing.",
        instructions: "Kneel on the floor. Bring your feet together and open your knees to create a V shape. Sit back, keeping your butt on or reaching toward your heels, and walk your hands in front of you so that your chest lowers to the ground. Breathe deeply through your diaphragm. Add cushioning (such as a pillow) under your lower body if you’re having discomfort with kneeling. You can also limit how far you move your head and chest toward the floor to make the pose easier."
    },
    {
        name: "Rotational Neck Stretch",
        image: NeckStretchImage,
        description: "Reacting to stress by tensing up your neck and scalp muscles can trigger a tension headache, according to MedlinePlus. To keep healthy flexion in your neck and let go of tightness, Decker recommends this simple and effective neck stretch, which targets the muscles in the back of your neck.",
        instructions: "Bring your chin to your chest and rotate your chin toward an armpit. If you need more of a stretch, Decker suggests placing your hand on the back of your head and pushing your head closer to your armpit. Repeat, rotating your chin to the other armpit. Be mindful not to elevate your shoulders, keeping them relaxed throughout the stretch."
    }
];

const ProgressiveMuscleRelaxation = () => {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const handleNext = () => {
        if (currentExerciseIndex < exercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        }
    };

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div className='max-w-[1200px] mx-auto py-12' style={{ backgroundColor: 'rgba(228, 138, 221, 0.167)' }}> {/* Background color */}
            <h2 className='text-3xl font-bold mb-4 text-center text-blue-700'>Progressive Muscle Relaxation</h2>
            <div className="flex flex-col items-center">
                <img 
                    src={currentExercise.image} 
                    alt={currentExercise.name} 
                    className="w-100 h-80 object-cover rounded-lg mb-6" 
                    style={{ borderRadius: '10px' }} 
                />
                <h3 className='text-2xl font-bold mb-6'>{currentExercise.name}</h3>
                <section className="p-6 rounded-lg" style={{ backgroundColor: 'transparent' }}> {/* Transparent background */}
                    <h4 className='text-xl font-semibold mb-2'>Why to do this:</h4>
                    <p className='text-gray-700 mb-4'>
                        {currentExercise.description}
                    </p>
                    <h4 className='text-xl font-semibold mb-2'>How to Do It:</h4>
                    <p className='text-gray-700'>
                        {currentExercise.instructions}
                    </p>
                </section>
                <div className="mt-6">
                    {currentExerciseIndex > 0 && (
                        <button 
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-4"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    )}
                    {currentExerciseIndex < exercises.length - 1 && (
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProgressiveMuscleRelaxation;
