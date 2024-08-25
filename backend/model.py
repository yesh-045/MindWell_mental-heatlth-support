import json
import random
from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
from resources import mental_health_resources, stress_relief_exercises

# Load models and tokenizers
distilbert_tokenizer = DistilBertTokenizer.from_pretrained('C:\\Users\\yeshp\\Desktop\\MentalHealthBot\\fine-tuned-distilbert')
distilbert_model = DistilBertForSequenceClassification.from_pretrained('C:\\Users\\yeshp\\Desktop\\MentalHealthBot\\fine-tuned-distilbert')
mental_health_classifier = pipeline('text-classification', model=distilbert_model, tokenizer=distilbert_tokenizer)

blenderbot_tokenizer = AutoTokenizer.from_pretrained("facebook/blenderbot-400M-distill")
blenderbot_model = AutoModelForSeq2SeqLM.from_pretrained("facebook/blenderbot-400M-distill")
blenderbot_generator = pipeline("text2text-generation", model=blenderbot_model, tokenizer=blenderbot_tokenizer)

sentiment_classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
emotion_classifier = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")

def load_intents(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading intents: {e}")
        return None

intents = load_intents('intents.json')

class ContextManager:
    def __init__(self):
        self.context = {
            "mood": None,
            "emotion": None,
            "mental_health_state": None,
            "stress_level": None,
            "history": [],
            "exercises_offered": [],
            "resources_provided": False,
            "quotes_given": []
        }
        self.initial_interaction_done = False  # Track if the initial message was shown

    def update(self, user_input, mood, emotion, mental_health_state, stress_level):
        self.context["mood"] = mood
        self.context["emotion"] = emotion
        self.context["mental_health_state"] = mental_health_state
        self.context["stress_level"] = stress_level
        self.context["history"].append({
            "user": user_input, 
            "mood": mood, 
            "emotion": emotion, 
            "mental_health_state": mental_health_state,
            "stress_level": stress_level
        })
        if len(self.context["history"]) > 5:
            self.context["history"] = self.context["history"][-5:]

    def get_context_string(self):
        return f"User's current mood: {self.context['mood']}, emotion: {self.context['emotion']}, " \
               f"mental health state: {self.context['mental_health_state']}, stress level: {self.context['stress_level']}. " \
               f"Recent conversation: {' '.join([h['user'] for h in self.context['history']])}"

    def set_initial_interaction_done(self):
        self.initial_interaction_done = True


context_manager = ContextManager()

def detect_mood_emotion_and_mental_state(text):
    sentiment = sentiment_classifier(text)[0]
    emotion = emotion_classifier(text)[0]
    mental_health_state = mental_health_classifier(text)[0]
    
    stress_keywords = ['stressed', 'anxious', 'overwhelmed', 'worried', 'tense']
    stress_level = sum(word in text.lower() for word in stress_keywords)
    
    return sentiment['label'], emotion['label'], mental_health_state['label'], stress_level

def generate_blenderbot_response(user_input, context):
    context_string = context_manager.get_context_string()
    prompt = (f"Context: {context_string}\nUser: {user_input}\nAI (respond as a supportive mental health chatbot):")
    response = blenderbot_generator(prompt, max_length=100, num_return_sequences=1)[0]['generated_text']
    return response.strip()

def generate_mental_health_response(user_input, context):
    classification = mental_health_classifier(user_input)[0]
    label = classification['label']
    
    response_templates = {
    "depression": (
        "I understand that depression can be overwhelming. It's important to take small steps towards feeling better. "
        "Would you like to try a mood-lifting exercise or talk more about what you're going through?"
    ),
    "anxiety": (
        "Anxiety can be very challenging. Remember, there are ways to manage it effectively. "
        "Would you like to try a relaxation technique or discuss some strategies for handling anxiety?"
    ),
    "stress": (
        "Stress can be really tough, but you don't have to face it alone. "
        "Would you like to learn a simple relaxation technique or find ways to manage your stress?"
    ),
    "positive": (
        "It's wonderful to hear you're feeling positive! Maintaining a positive outlook is great for your mental health. "
        "What activities or habits help you stay positive? Keep doing what works for you!"
    ),
    "sadness": (
        "Feeling sad is a normal part of life, but it's important to address it. "
        "Would you like to try a grounding exercise or talk about what's making you feel this way?"
    ),
    "anger": (
        "Anger can be a powerful emotion, and it's important to express it in healthy ways. "
        "Would you like to try an anger management exercise or discuss what might be causing your anger?"
    ),
    "fear": (
        "Fear can be quite overwhelming, but there are ways to cope with it. "
        "Would you like to practice some calming techniques or talk about what you're afraid of?"
    ),
    "confusion": (
        "Feeling confused can be disorienting. It's okay to take time to sort things out. "
        "Would you like to talk through what's confusing you or try a focus exercise to help clarify things?"
    ),
    "frustration": (
        "Frustration is a common feeling, especially when things don't go as planned. "
        "Would you like to try a stress-relief exercise or discuss what's causing your frustration?"
    ),
    "overwhelmed": (
        "Feeling overwhelmed can make everything seem harder to handle. "
        "Would you like to try a relaxation technique or discuss ways to break down your tasks into smaller steps?"
    ),
    "exhaustion": (
        "Exhaustion can take a toll on both your body and mind. "
        "Would you like to try a restorative exercise or talk about ways to get better rest and manage your energy levels?"
    ),
    "loneliness": (
        "Loneliness can be very tough, and it's important to reach out for support. "
        "Would you like to talk about what's making you feel lonely or find ways to connect with others?"
    ),
    "guilt": (
        "Guilt can be a heavy burden. It's important to address these feelings and find ways to move forward. "
        "Would you like to discuss what's causing your guilt or try an exercise to help you cope?"
    )
}

    
    return response_templates.get(label, "I'm here to support you. Can you tell me more about how you're feeling?")


def get_motivational_quote():
    quotes = [
        "You are stronger than you think.",
        "Every day is a new beginning.",
        "Small steps lead to big changes.",
        "You've got this!",
        "Believe in yourself and all that you are.",
    ]
    return random.choice(quotes)

def provide_mental_health_resources(mental_health_state):
    resources = []
    if mental_health_state in ["depression", "anxiety", "stress"]:
        resources.extend(mental_health_resources["crisis"].items())
    resources.extend(mental_health_resources["therapy"].items())
    return "Here are some helpful resources:\n" + "\n".join(f"{k}: {v}" for k, v in random.sample(resources, min(2, len(resources))))

def enhance_response(response, context):
    enhanced_response = response
    
    if random.random() < 0.5: 
        quote = get_motivational_quote()
        if quote not in context["quotes_given"]:
            enhanced_response += f"\n\nHere's a thought for you: {quote}"
            context["quotes_given"].append(quote)

    if random.random() < 0.5:
        tip = get_wellness_tip()
        enhanced_response += f"\n\nWellness tip: {tip}"

    return enhanced_response

def get_wellness_tip():
    tips = [
        "Stay hydrated throughout the day.",
        "Take short breaks every hour to stretch and move.",
        "Practice mindfulness for a few minutes each day.",
        "Aim for 7-9 hours of sleep each night.",
        "Reach out to a friend or loved one for support."
    ]
    return random.choice(tips)


first_interaction = True 

def process_user_input(user_input):
    global first_interaction, context_manager
    
    if user_input.lower() in ['exit', 'quit', 'bye']:
        return "Take care! Remember, it's okay to seek help when you need it. If you need support in the future, don't hesitate to reach out. Goodbye!", True

    mood, emotion, mental_health_state, stress_level = detect_mood_emotion_and_mental_state(user_input)
    context_manager.update(user_input, mood, emotion, mental_health_state, stress_level)
    
    if "suicide" in user_input.lower() or "kill myself" in user_input.lower():
        return get_crisis_response(), False

    if first_interaction:
        response = "I'm here to support you. Can you tell me more about how you're feeling?"
        first_interaction = False
    else:
        response = generate_contextual_response(user_input, mood, emotion, mental_health_state, stress_level)
        
    response = enhance_response(response, context_manager.context)
    
    return response, False

def generate_contextual_response(user_input, mood, emotion, mental_health_state, stress_level):
    response = generate_empathetic_response(mood, emotion)
    
    if "counselling" in user_input.lower() or "help" in user_input.lower() or "resources" in user_input.lower():
        response += "\n\n" + provide_resources(mental_health_state)
    
    if "depression" in user_input.lower() or mental_health_state == "depression":
        response += "\n\nDepression can be challenging, but there are ways to manage it. Would you like some tips or resources for dealing with depression?"
    
    if stress_level > 2:
        exercises = get_personalized_exercises(emotion, stress_level, mental_health_state)
        response += f"\n\nIt seems you might be feeling stressed. Here are two exercises that might help:\n1. {exercises[0]}\n2. {exercises[1]}\nWould you like to try one of these?"
    
    return response

def provide_resources(mental_health_state):
    resources = []
    if mental_health_state in ["depression", "anxiety", "stress"]:
        resources.extend(mental_health_resources["crisis"].items())
    resources.extend(mental_health_resources["therapy"].items())
    resources.extend(mental_health_resources["self_help"].items())  # Add this line
    return "Here are some helpful resources:\n" + "\n".join(f"- {k}: {v}" for k, v in random.sample(resources, min(3, len(resources))))

def get_crisis_response():
    return ("I'm very concerned about what you're saying. Your life matters, and there are people who can help. "
            "Please reach out to a suicide prevention hotline immediately. "
            "Here's the number for the National Suicide Prevention Lifeline: 1-800-273-8255. "
            "Would you like me to provide more resources or talk through what you're feeling?")



def generate_empathetic_response(mood, emotion):
    responses = {
        "sadness": "I hear that you're feeling down. It's okay to have these emotions, and you're not alone in this.",
        "fear": "It sounds like you're feeling anxious or scared. Remember, it's normal to feel this way sometimes.",
        "anger": "I can sense that you're frustrated or angry. These are valid feelings, and it's important to acknowledge them.",
        "joy": "I'm glad you're feeling positive! It's great to acknowledge and celebrate good moments.",
        "surprise": "Unexpected events can be challenging to process. How are you handling this surprise?",
        "neutral": "Thank you for sharing how you're feeling. Your emotions are valid, whatever they may be."
    }
    return responses.get(emotion, responses.get(mood, "I'm here to support you."))

def get_personalized_exercises(emotion, stress_level, mental_health_state):
    exercises = [
        "Deep Breathing: Inhale for 4 counts, hold for 4, exhale for 4.",
        "5-4-3-2-1 Grounding: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
        "Mindful Walking: Take a walk and focus on your surroundings and sensations.",
        "Journaling: Write down your thoughts and feelings for 10 minutes.",
        "Progressive Muscle Relaxation: Tense and relax each muscle group in your body.",
        "Gratitude Practice: List three things you're grateful for today."
    ]
    return random.sample(exercises, 2)

