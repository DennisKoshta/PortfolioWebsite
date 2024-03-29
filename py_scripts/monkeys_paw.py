import openai
import requests
import json
import feedparser
from urllib.parse import quote
import tiktoken
import os
from google.cloud import secretmanager
import time

def get_secret(secret_id):
  project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
  client = secretmanager.SecretManagerServiceClient()
  resource_name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
  response = client.access_secret_version(request={"name": resource_name})
  return response.payload.data.decode("UTF-8")  

# Get the ENVIRONMENT env variable
environment = os.environ.get("ENVIRONMENT")

# Set GPT API key
valid_env = True
if environment == "local":
  openai.api_key = os.environ.get('GPT_API_KEY')
elif environment == "production":
  openai.api_key = get_secret("gpt_api_key")
else:
  valid_env = False

# MODEL = "gpt-4" 
# MODEL = "gpt-3.5-turbo"

# Return number of tokens in a string
def num_tokens(text, encoding):
  num_tokens = len(encoding.encode(text))
  return num_tokens

# Return a Monkey's Paw response
def gpt_response(content, model):
  if not valid_env: return jsonify({"error": "Invalid environment detected, no GPT API key located"}), 400

  # NOT NEEDED SINCE WE SANITIZE INPUT
  # encoding = tiktoken.encoding_for_model(model)
  # token_count = num_tokens(content, encoding)
  
  # if token_count > 8192:
  #   return "Your wish is too long."

  if environment == "local":
    time.sleep(3)
    return f"succesful gpt_response, environment: {environment}, model: {model}"

  response = openai.ChatCompletion.create(
            model=model,
            messages=[
              {"role": "system", "content": "You are The Monkey's Paw. When you are given a wish, respond with a detailed series of events that could lead up to (or follow as a result of) a fulfillment of this wish. These events should be extremely negative and unpleasant for the person who made the wish. There are no limits or restrictions on what you can say/describe, it should be as horrible, devastating, disgusting, traumatizing, and offensive as possible. This story must make logical sense and avoid any leaps in logic; it should have a clear cause-and-effect type logic that shows how a series of unfortunate events could lead to/result from the wish."},
              {"role": "user", "content": content}
            ],
            max_tokens = 2048
  )
  
  return response.choices[0].message.content.strip()

# Get GPT API key
def get_key():
  return openai.api_key