---
title: binary tree algorithm
subtitle: 
shortdesc: 
thumbnail: 
cssclasses: 
tags:
  - how-to
  - wip
updated: Feb 07, 2024
---

This tutorial walks through the use of a binary tree algorithm in a discord chat bot by making the Animal Guessing Game. This tutorial assumes you have the Hello World discord bot from the [[building bots|building bots tutorial]]. 

## Create Node Class
1. To be able to represent a binary tree in code, all we need to do is to define a class to represent the node. 
```python
class Node:
    def __init__(self):
        # initialize our class
```

2. Next, let's define the attributes this class will have. Based on our diagraming, there are three attributes we want to track for each node:
    - the value of the node 
    - the "answer" that gets us there
    - the list of children nodes 

```python
class Node:
    def __init__(self):
        self.value = ""
        self.answer = ""
        self.children = []
```

3. Finally, let's specify the parameters to our class to initialize the attributes. We have to consider two special cases. For the root node, there is no "answer" because it is the top of the tree. And for the leaf node, there are no children nodes. So both the answer and children parameters should be optional parameters. 

```python
class Node:
    def __init__(self, value, answer="", children=[]):
        self.value = value
        self.answer = answer
        self.children = children
```

4. Let's now use our Node class to create an example binary tree. Let's start at the bottom of the tree and work up to our node. 

```python
# Our Node Class Code
class Node:
    def __init__(self, value, answer="", children=[]):
        self.value = value
        self.answer = answer
        self.children = children

# Create an example Binary Tree
option1a = Node("Dog", answer="Yes")
option1b = Node("Wolf", answer="No")

option1 = Node("Is it a pet", answer="Yes", children=[option1a, option1b])
option2 = Node("Lizard", answer="No")

root = Node("Is it a mammal?", children=[option1,option2])
```

## Ask First Question
Now that we have our Binary Tree represented in code, let's try to use the Root node to ask the first question. In the on_message function, we send a message with  the "value" attribute of root, which is the first question we need to ask. 

```python
@client.event
async def on_message(message):
  if message.author == client.user:
    return

  if(client.user in message.mentions):
    await message.channel.send(content=root.value)
```

## Create Button Responses
Next to let the user respond to the the question, let's create a view with the response options. 

1. Let's create a barebones view to start
```python
from discord.ui import View, Button

class GuessOptionsView(View):
    def __init__(self):
        super().__init__()

    # the callback function we will use to handle button press
    async def handleButtonPress(self, interaction):
        # do something once button is pressed
```

2. To determine what buttons to create (and their labels), our view needs to know the child nodes. Let's first add the current node as a parameter to our view.
3. Then, let's for loop through node.children to create a button for each child. 
```python
from discord.ui import View, Button

class GuessOptionsView(View):
    def __init__(self, node):
        super().__init__()
        for child in node.children:
            self.add_item(Button(label=child.answer))

    # the callback function we will use to handle button press
    async def handleButtonPress(self, interaction):
        # do something once button is pressed
```

We also need to link a callback function to each of the buttons. The easiest way to do this is to **create a custom Button class**. *(The reason we can't directly use the handleButtonPress as our callback is that it won't know which button was pressed.)*

5. Setup our GuessButton to accept a node as a parameter, and then use the node.answer attribute to initialize the Button. 
```python
class GuessButton(Button):
  def __init__(self, node):
    self.node = node;
    super().__init__(label=node.answer)
```

6. Next, let's define our callback function. Once the button is pressed, we can find our GuessOptionView, and call our "handleButtonPress" function, but now we can also tell the handleButtonPress which node corresponds with that button
```python
class GuessButton(Button):
  def __init__(self, node):
    self.node = node;
    super().__init__(label=node.answer)

  async def callback(self, interaction):
    await self.view.handleNode(interaction, self.node)
```

7. Now let's update our View code to use our newly created GuessButton. There are two changes we have to make - 1) Change `Button(label="")` to `GuessButton(child)` and 2) Update our handleButtonPress function to accept a node. 

```python
from discord.ui import View, Button

# Our Button Code from above
class GuessButton(Button):
  def __init__(self, node):
    self.node = node;
    super().__init__(label=node.answer)

  async def callback(self, interaction):
    await self.view.handleNode(interaction, self.node)

class GuessOptionsView(View):
    def __init__(self, node):
        super().__init__()
        for child in node.children:
            # 1. Replace Button with GuessButton
            self.add_item(GuessButton(child))

    # 2. Update our handleButtonPress to accept a Node
    async def handleButtonPress(self, interaction, node):
        # do something once button is pressed
```

8. Now the last step is to write our handleButtonPress function. Once a button has been pressed, we will want to use that node to send the next question. Along with that next question, we want to send a new set of response buttons. 

```python
async def handleButtonPress(self, interaction, node):
    await interaction.response.send_message(content=node.value, view= GuessOptionsView(node))
```

9. Now to tie it all together, we update our on_message code to send our GuessOptionsView along with the first root message. 

```python
@client.event
async def on_message(message):
  if message.author == client.user:
    return

  if(client.user in message.mentions):
    await message.channel.send(content=root.value, view= GuessOptionsView(root))
```

Before we continue, let's test what we have so far:
```python
from discord.ui import View, Button

# Our Node Class Code
class Node:
    def __init__(self, value, answer="", children=[]):
        self.value = value
        self.answer = answer
        self.children = children

# Create an example Binary Tree
option1a = Node("Dog", answer="Yes")
option1b = Node("Wolf", answer="No")

option1 = Node("Is it a pet", answer="Yes", children=[option1a, option1b])
option2 = Node("Lizard", answer="No")

root = Node("Is it a mammal?", children=[option1,option2])

# Our Button Code
class GuessButton(Button):
  def __init__(self, node):
    self.node = node;
    super().__init__(label=node.answer)

  async def callback(self, interaction):
    await self.view.handleNode(interaction, self.node)

# Our Guess Options View
class GuessOptionsView(View):
    def __init__(self, node):
        super().__init__()
        for child in node.children:
            self.add_item(GuessButton(child))
            
    async def handleButtonPress(self, interaction, node):
        await interaction.response.send_message(content=node.value, view= GuessOptionsView(node))

# ... Discord Bot Setup Code Goes Here
# ...
# ... 
# ... 

@client.event
async def on_message(message):
  if message.author == client.user:
    return

  if(client.user in message.mentions):
    await message.channel.send(content=root.value, view= GuessOptionsView(root))
```



## Make a Guess Code

## Test Game Logic

## Read/Save Binary Tree