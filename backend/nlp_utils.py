import random

# CBT Exercises
def cognitive_restructuring():
    return "Let's challenge that negative thought. What evidence do you have for this thought?"

def behavioral_activation():
    return "What small, enjoyable activity can you do today that might lift your mood?"

def mindfulness_exercise():
    return "Let's practice mindfulness for a moment. Close your eyes, focus on your breath."

def gratitude_exercise():
    return "What are three things you're grateful for today?"

def offer_cbt_exercise(emotion):
    cbt_exercises = {
        "joy": gratitude_exercise,
        "sadness": behavioral_activation,
        "anger": mindfulness_exercise,
        "fear": cognitive_restructuring
    }
    return cbt_exercises.get(emotion, mindfulness_exercise)()

# Function to provide motivational content
motivational_quotes = [
    "You are stronger than you think.",
    "Every day is a new beginning."
]

wellness_tips = [
    "Stay hydrated throughout the day.",
    "Take short breaks every hour to stretch and move."
]

def get_motivational_content(emotion):
    quote = random.choice(motivational_quotes)
    tip = random.choice(wellness_tips)
    return f"Here's a thought for you: {quote}\n\nWellness tip: {tip}"

class DialogueManager:
    def __init__(self):
        self.context = {}
        self.conversation_stage = "greeting"

    def update_context(self, user_input, emotion, stress_level):
        self.context["last_input"] = user_input
        self.context["current_emotion"] = emotion
        self.context["stress_level"] = stress_level

    def get_next_response(self):
        if self.conversation_stage == "greeting":
            self.conversation_stage = "assess_stress"
            return "Hello! How are you feeling today?"
        elif self.conversation_stage == "assess_stress":
            self.conversation_stage = "offer_exercise"
            return f"I see you're feeling {self.context['current_emotion']}. On a scale of 1-10, how would you rate your stress level?"
        elif self.conversation_stage == "offer_exercise":
            self.conversation_stage = "follow_up"
            cbt_exercise = offer_cbt_exercise(self.context['current_emotion'])
            return f"Let's try this CBT exercise: {cbt_exercise}"
        elif self.conversation_stage == "follow_up":
            self.conversation_stage = "assess_stress"
            return "How are you feeling now? Has your stress level changed?"
