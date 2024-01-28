---
title: building a discord bot
subtitle: 
shortdesc: a workshop for designers on AI
thumbnail: 
cssclasses: 
updated: Jan 25, 2024
tags:
  - how-to
---
Through this walkthrough, you should have a discord bot, hosted on either your local machine, or through the online IDE Repl.it. This tutorial just builds upon a few existing online resources that you can directly reference, if you would prefer. 

- [Building a Discord bot with Python and Repl.it](https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-python-and-repl-it-miblcwejz)
- [How to make a Discord Bot in Python](https://realpython.com/how-to-make-a-discord-bot-python/#interacting-with-discord-apis)

## Create app in the Discord UI

1. Sign up for a free [Discord](https://discord.com/) account
2. Go to the [Discord developer portal](https://discord.com/developers/applications) and click on the 'New Application' button. 

You will now be redirected to a page where you can configre all the options for your app, creating a bot user and more. 

1. Click on the "Bot" tab, press the "Add Bot" button
2. Scroll down to the 'Privileged Gateway Intents' section, and turn on the 'Message Content Intent' switch. 

Now you have to add your bot to the discord servers you want it to run in. For this project, we'll add all of our bots to the server I've created 'A Place to Talk to Bots'

1. Use the invite link to join the project server: https://discord.gg/qteg27c6vM
2. Go back to your application in the [Discord developer portal](https://discord.com/developers/applications)  
4. Navigate to the 'OAuth2 -> URL Generator' tab
5. Under 'Scopes' check the 'bot' option
6. In the Bot permissions section, check all the things that you would like to give your bot access to. Some of the permissions you would likely want to set:
	1. Read Messages/View Channels
	2. Send Messages
	3. Send Messages in Threads
	4. Read Message History
7. Copy the Generated URL at the bottom of the page and paste it into your browser.
8. You will see a page asking you which server to add this bot to. Select the 'A Place to Talk to Bots' server.
9. Click authorize
10. Once you hit accept, you should get a notification that your bot has joined the server. You can see the bot listed as a member of the server in the right panel. 

## Building Bot Behavior

In this tutorial, there are two options for running the code for your bot. You can run the code locally on your machine, or you can use an online IDE like Repl.it

Repl.it is simpler to setup and get started, and will include hosting, so you can keep your bot online all the time. However, there are storage, CPU and RAM limitations that might get in the way.

A local machine setup will be slightly more complicated if you don't have python already setup, and if you close your computer, your bot will go offline. But, you won't face as many of the resource limitations as you will with Repl.it.

I reccomend starting with Repl.it, and then moving over to a local setup if necessary in the future. 

### Setup Repl.it

1. Make an account on Repl.it
2. Click on the Create Button
3. Select 'python' under Template, give your project a name, and then click 'Create Repl'

Before we start writing code, we have to add the Discord Bot Token to our Repl.it project. This will connect our code to the Bot we created. 

4. Add the Discord Bot Token to the 'Secrets' tab of Repl.it.
	1. Go to the [Discord Developer Portal](https://discord.com/developers/applications), click on the Application you created earlier
	2. Navigate to the Bot tab, and under the 'Token' section, click on the copy button. (If the copy button doesn't appear, click on the 'Reset Token' button)
	3. In your Repl.it project, click on the 'Secrets' tool under Tools section in the sidebar. 
	4. Create a New Secret. Name the key `DISCORD_BOT_SECRET` and in the value field paste the Token that you copied from the Discord Developer Portal.

Finally, lets install the main packages that we will be using. You can use this same process to install other useful python packages in the future. 

5. Click on the packages tool under the Tools section in the sidebar
6. In the new Packages pane, search for **discord.py**, and click on the plus icon to install the library. 

### Setup Local Environment
### Create Hello World Bot

To actually create our Hello World bot, we'll have to write some python code into our main.py file. 

1. Let's start by importing the necessary libraries:
	- The **discord.py package** is the main way we will be working with the Discord API. ([documentation](https://discordpy.readthedocs.io/en/stable/))
	- The **os module** is a standard library (so you don't need to install it) but it isn't included by default, so you have to import it. 
```python
import discord
import os
```

2. Next let's define our bot's **"intents."** This is an object that we define to tell Discord what events our bots wants to listen to. For our bot, we want all the message_content events. 
   
   (See the documentation [here](https://discordpy.readthedocs.io/en/stable/api.html#intents) for a list of all the intents.) 
```python
# Create an empty intents object
intents = discord.Intents.default()

# Set all required intents True
intents.message_content = True
```

3. Now, lets **create our Client** object using the intents we just created
```python
client = discord.Client(intents=intents)
```

4. Now we can start creating our different event callbacks. This is where most of the logic of our chatbot will go. The first callback we'll use is the **on_ready** callback, which is called when our bot first gets online. Once the bot connects, we print out the bot's username. 
```python
@client.event
async def on_ready():
    print(f'We have logged in as {client.user.name}')
```

5. The next callback we'll use is **on_message** which is called whenever a message is sent on the discord server. 
	1. First, we check what user has sent the message. Because we don't want the bot to respond to itself, we skip if the user who sent the message is the bot itself.
	2. Then we check the content of the message. If it starts with the text '$hello', then we want to respond. *Edit this string to change how the bot is triggered*
	3. To respond, we grab the channel that the message was sent to, and then send our 'Hello' to that same channel. *Change that string to change how your bot responds.* 
```python
@client.event
async def on_message(message):
	# Check the user who sent the message
    if message.author == client.user:
        return

	# Check the content of the message
    if message.content.startswith('$hello'):
	    # Send our response
        await message.channel.send('Hello!')
      
```

6. The last step is to **run the Client**. To do this, we'll need to get our Bot Token that we saved into the Repl.it secrets or in our .env file, and then pass that into our client. We will use the 'os' library to access that secret variable. 
```python
token = os.getenv("DISCORD_BOT_SECRET")
client.run(token)
```

7. Finally, run your python file to see your Hello World bot come online in the discord server, and respond to anyone who types '$hello'
	1. *Repl.it*: Press the green play button at the top of the page
	2. *Local machine*: Run the command `python main.py` from the project folder in your terminal. 

You can copy paste the full main.py file below or fork the file from my example Repl.it: https://replit.com/@andoncemore/Basic-Discord-Bot#main.py

```python
import discord
import os

# Create an empty intents object
intents = discord.Intents.default()
# Set all required intents True
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user.name}')

@client.event
async def on_message(message):
	# Check the user who sent the message
    if message.author == client.user:
        return

	# Check the content of the message
    if message.content.startswith('$hello'):
	    # Send our response
        await message.channel.send('Hello!')

token = os.getenv("DISCORD_BOT_SECRET")
client.run(token)
```


### Keep bot alive (Repl.it only)
Source: https://www.codementor.io/@garethdwyer/building-a-discord-bot-with-python-and-repl-it-miblcwejz

When using Repl.it, your bot will only stay online as long as you keep the browser tab open. There are two ways to keep your bot alive:

1. **Use the "Always On" Feature**. This will cost "20 cycles/day" where a cycle is a token you buy from Repl.it for $0.01/cycle. So keeping your Repl "always on" will cost you $0.20 a day. 

2. **Create a web server and ping the web server every hour.** Repl.it will keep your code running if it is running a web server. If your web server doesn't get any traffic for one hour, it will stop the code. We can then use Uptime Bot to ping the web server every hour to keep it alive. 

Create a new file in the project called `keep_alive.py`

```python
from flask import Flask 
from threading import Thread 

app = Flask('') 

@app.route('/') 
def home(): 
	return "I'm alive" 

def run(): 
	app.run(host='0.0.0.0',port=8080) 

def keep_alive(): 
	t = Thread(target=run) 
	t.start()
```

in your main file, import the keep_alive snippet you just created.

`from keep_alive import keep_alive`

and then run the keep_alive function at the top of the file. 


## Working with discord.py
The discord.py library documentation will have the most comprehensive description of all the features of the library, but I've written out some helpful tips some common behaviors. 

**Guild vs DM**
As a note, in the documentation, you will notice references to Guilds and DMs. A guild is another word for server. The variation in intents (from messages, guild_messages, dm_messages) lets you specify where the bot can listen to messages (everywhere, in the server, or in the DMs)

### Creating UI Elements

#### Buttons

#### Modals

#### Dropdowns