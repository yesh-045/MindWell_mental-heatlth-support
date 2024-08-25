from transformers import DistilBertTokenizer, DistilBertForSequenceClassification, Trainer, TrainingArguments
from datasets import load_dataset
import evaluate

# Load tokenizer and model
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertForSequenceClassification.from_pretrained('distilbert-base-uncased', num_labels=2)

# Load dataset without header (skip the first row)
dataset = load_dataset('csv', data_files={
    'train': 'C:\\Users\\yeshp\\MentalHealth-Support\\data\\train.csv',
    'test': 'C:\\Users\\yeshp\\MentalHealth-Support\\data\\test.csv'
}, column_names=['text', 'label'], skiprows=1)

# Print dataset column names and a few examples to verify structure
print("Dataset column names:", dataset['train'].features.keys())
print("Sample from train dataset:", dataset['train'][0])
print("Sample from test dataset:", dataset['test'][0])

# Load the accuracy metric
metric = evaluate.load('accuracy')

# Tokenize data
def preprocess_function(examples):
    tokenized_inputs = tokenizer(examples['text'], padding='max_length', truncation=True)

    # Ensure 'label' exists and is numeric
    if 'label' not in examples:
        print(f"Columns in the dataset: {examples.keys()}")
        raise KeyError("'label' key not found in examples")
    
    # Convert labels to integers
    tokenized_inputs['labels'] = [int(label) for label in examples['label']]
    
    return tokenized_inputs

try:
    tokenized_datasets = dataset.map(preprocess_function, batched=True)
except KeyError as e:
    print(f"Error during tokenization: {e}")
    # Additional debugging information
    print(f"Dataset columns: {dataset.column_names}")
    tokenized_datasets = None

if tokenized_datasets:
    # Define evaluation metric
    def compute_metrics(eval_pred):
        logits, labels = eval_pred
        predictions = logits.argmax(axis=-1)
        return metric.compute(predictions=predictions, references=labels)

    # Training arguments
    training_args = TrainingArguments(
        output_dir="./results",  # Specify the output directory
        per_device_train_batch_size=8,
        per_device_eval_batch_size=8,
        num_train_epochs=1,
        weight_decay=0.01,
        eval_strategy="epoch",  # Use eval_strategy instead of evaluation_strategy
        logging_dir="./logs",
    )

    # Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_datasets['train'],
        eval_dataset=tokenized_datasets['test'],
        compute_metrics=compute_metrics,
    )

    # Start training
    trainer.train()

    # Save model and tokenizer
    model.save_pretrained('./fine-tuned-distilbert')
    tokenizer.save_pretrained('./fine-tuned-distilbert')
else:
    print("Tokenization failed. Please check the dataset and preprocessing function.")
