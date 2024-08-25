import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const GuidedBreathingGame = () => {
    const [isBreathing, setIsBreathing] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [isExpanding, setIsExpanding] = useState(true);
    const inhaleDuration = 4000; // 4 seconds inhale
    const exhaleDuration = 4000; // 4 seconds exhale

    const instructionsRef = useRef(null);
    const inhaleTextRef = useRef(null);
    const exhaleTextRef = useRef(null);
    const breathingCircleRef = useRef(null);

    const navigate = useNavigate(); // Use the navigate hook

    useEffect(() => {
        let inhaleTimeout;
        let exhaleTimeout;

        const speak = (text) => {
            const msg = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(msg);
        };

        const breatheCycle = () => {
            if (cycleCount >= 5) {  // Stop after 5 sets
                instructionsRef.current.innerHTML = "Great job! You've completed 5 sets.";
                speak("Great job! You've completed 5 sets.");
                inhaleTextRef.current.classList.remove('show');
                exhaleTextRef.current.classList.remove('show');
                setIsBreathing(false);
                setCycleCount(0);  
                return;
            }

            if (isExpanding) {
                instructionsRef.current.innerHTML = "Inhale";
                inhaleTextRef.current.classList.add('show');
                exhaleTextRef.current.classList.remove('show');
                speak("Inhale");
                breathingCircleRef.current.classList.add('expand');
                breathingCircleRef.current.classList.remove('contract');
                inhaleTimeout = setTimeout(() => {
                    setIsExpanding(false);
                    setCycleCount(prevCount => prevCount + 1);
                    breatheCycle(); // Continue the cycle
                }, inhaleDuration);
            } else {
                instructionsRef.current.innerHTML = "Exhale";
                inhaleTextRef.current.classList.remove('show');
                exhaleTextRef.current.classList.add('show');
                speak("Exhale");
                breathingCircleRef.current.classList.add('contract');
                breathingCircleRef.current.classList.remove('expand');
                exhaleTimeout = setTimeout(() => {
                    setIsExpanding(true);
                    breatheCycle(); // Continue the cycle
                }, exhaleDuration);
            }
        };

        if (isBreathing) {
            breatheCycle();
        } else {
            clearTimeout(inhaleTimeout);
            clearTimeout(exhaleTimeout);
            window.speechSynthesis.cancel();
        }

        return () => {
            clearTimeout(inhaleTimeout);
            clearTimeout(exhaleTimeout);
            window.speechSynthesis.cancel(); 
        };
    }, [isBreathing, isExpanding, cycleCount]);

    const startBreathing = () => {
        if (!isBreathing) {
            setIsBreathing(true);
            instructionsRef.current.innerHTML = "Click 'Start' to Begin";
            inhaleTextRef.current.classList.remove('show');
            exhaleTextRef.current.classList.remove('show');
        }
    };

    const stopBreathing = () => {
        setIsBreathing(false);
        window.speechSynthesis.cancel();
        instructionsRef.current.innerHTML = "Breathing exercise stopped.";
        inhaleTextRef.current.classList.remove('show');
        exhaleTextRef.current.classList.remove('show');
    };

    const handleClose = () => {
        navigate('/'); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4 text-blue-700">Guided Breathing Exercise</h1>
                <div
                    ref={breathingCircleRef}
                    className="breathing-circle mb-4"
                />
                <div
                    ref={instructionsRef}
                    className="text-2xl text-blue-700 font-bold mb-4"
                >
                    Click "Start" to Begin
                </div>
                <div className="flex flex-col items-center mb-4">
                    <div
                        ref={inhaleTextRef}
                        className="text-3xl text-blue-700 mb-2 opacity-0 transition-opacity duration-500"
                    >
                        Breathe in slowly through your nose...
                    </div>
                    <div
                        ref={exhaleTextRef}
                        className="text-3xl text-blue-700 mb-2 opacity-0 transition-opacity duration-500"
                    >
                        Breathe out slowly through your mouth...
                    </div>
                </div>
                <div id="buttonsContainer" className="flex space-x-2 mb-4">
                    <button
                        className="bg-teal-700 text-white py-2 px-4 rounded-lg"
                        onClick={startBreathing}
                    >
                        Start
                    </button>
                    <button
                        className="bg-teal-700 text-white py-2 px-4 rounded-lg"
                        onClick={stopBreathing}
                    >
                        Stop
                    </button>
                </div>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleClose} 
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default GuidedBreathingGame;
