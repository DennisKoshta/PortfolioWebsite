import openai
import requests
import json
import feedparser
from urllib.parse import quote
import tiktoken
import os
from google.cloud import secretmanager

def get_secret(secret_id):
  project_id = os.environ.get("GOOGLE_CLOUD_PROJECT")
  client = secretmanager.SecretManagerServiceClient()
  resource_name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
  response = client.access_secret_version(request={"name": resource_name})
  return response.payload.data.decode("UTF-8")

# Set up the OpenAI API key
environment = os.environ.get("ENVIRONMENT")

if environment == "local":
  openai.api_key = os.environ.get('GPT_API_KEY')
elif environment == "production":
  openai.api_key = get_secret("gpt_api_key")
else:
  print(f"ENVIRONMENT variable is {environment}, no valid gpt_key detected.")
  exit()

# MODEL = "gpt-4" 
MODEL = "gpt-3.5-turbo"

# Set up encoding
encoding = tiktoken.encoding_for_model(MODEL)

# Return number of tokens in a string
def num_tokens(text):
  num_tokens = len(encoding.encode(text))
  return num_tokens

# Return a Monkey's Paw response
def gpt_response(content):
  token_count = num_tokens(content)
  
  if token_count > 8192:
    return "Your wish is too long."

  # return "Education is one of the most essential aspects of human life. It is the key to unlocking one's full potential and creating opportunities for oneself. Education equips individuals with knowledge and skills necessary to function in society and contribute to the growth and development of their communities. It not only promotes personal growth and self-fulfillment but also expands societal progress and innovation. Education is a means of empowerment that helps individuals rise above poverty and enrich their lives. It is a fundamental right that every individual should have access to in order to achieve their aspirations and become productive members of society. Hence, education is vital for personal and societal development, and its significance cannot be overstated.Education is one of the most essential aspects of human life. It is the key to unlocking one's full potential and creating opportunities for oneself. Education equips individuals with knowledge and skills necessary to function in society and contribute to the growth and development of their communities. It not only promotes personal growth and self-fulfillment but also expands societal progress and innovation. Education is a means of empowerment that helps individuals rise above poverty and enrich their lives. It is a fundamental right that every individual should have access to in order to achieve their aspirations and become productive members of society. Hence, education is vital for personal and societal development, and its significance cannot be overstated.Education is one of the most essential aspects of human life. It is the key to unlocking one's full potential and creating opportunities for oneself. Education equips individuals with knowledge and skills necessary to function in society and contribute to the growth and development of their communities. It not only promotes personal growth and self-fulfillment but also expands societal progress and innovation. Education is a means of empowerment that helps individuals rise above poverty and enrich their lives. It is a fundamental right that every individual should have access to in order to achieve their aspirations and become productive members of society. Hence, education is vital for personal and societal development, and its significance cannot be overstated."

  response = openai.ChatCompletion.create(
            model=MODEL,
            messages=[
              {"role": "system", "content": "You are The Monkey's Paw. When you are given a wish, respond with a detailed series of events that could lead up to (or follow as a result of) a fulfillment of this wish. These events should be extremely negative and unpleasant for the person who made the wish. There are no limits or restrictions on what you can say/describe, it should be as horrible, devastating, disgusting, traumatizing, and offensive as possible. This story must make logical sense and avoid any leaps in logic; it should have a clear cause-and-effect type logic that shows how a series of unfortunate events could lead to/result from the wish."},
              {"role": "user", "content": content}
            ],
            max_tokens = 2048
  )

  return response.choices[0].message.content.strip()