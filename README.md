
# Snakes and Ladders
Snakes and Ladders brings the popular board game to the screen. The game is aimed at players of all ages and is build purely for entertainement.
![Responsive Mockup]()

## Deployed at

## UX
### User Stories
1. As a player:
	- I can easily understand the purpose of the game and how to play it. 
	- I can go back to instructions if I need to and read them again.
	- I can choose the avatar I want to use and chnge it at any time during the game. 
	- I can see the different types of fields and understand what will happen when 'I step' on them. 
	- I can see where the players are on the board at each point of the game, see their dice throw results and follow as each of them moves. 
	- I know whose turn it is. 
	- I know who won the game. 
	- I can reset the game at any point. 
	- I can play the game again.
	<!-- - I can find out more about the game creator and their work.  -->
	<!-- - I can choose whether I want to see Croc's turn info or not -->

2. As a returning player: 
	- On returning to/reloading the site I don't want to see the instructions pop up again. 
	- I want to be able to select another avatar at any point during the game. 
	- I can play the game on another device and have the same user experience.

### Features and Desing

#### Existing Features
- Instructions are placed in a full-screen pop-up and are accessible at any point during the game by clicking the help icon.
- Two avatars to select from: the player can choose one of two avatars and change them at any point during the game. The new avatar then replaces the old one in the current player position on the board. 
- Checking for avatar selection: on first loading the page the player cannot leave the instructions before selecting an avatar. This prevents the board showing null instead of the avatar image.
- The board is generated automatically and can be automatically reset to it's initial position.
- The image placed in the dice reflects the number thrown by the player. 
- Player's dice throw initiates also Jazzy Croc's move. 
- Results for individual players are highlighted at the time of change to make the turn and movement clearer to the user
- The avatars move on the board by one field at a time, to make it easier for the player to follow the game. 
- Messages with information about Croc's turn can be turned off or on, depending on the player's preference.
	<!-- - Throughout the game various messages with information about snakes/ladders/Croc's turn and who won are displayed as full screen. -->
	<!-- - Afer game is finished the board is automatically reset to its starting position. -->


#### Features Left to Implement
- Different color scheme(s) and greater selection of avatars to choose from.
- Randomisation of the position of the snakes/ladders on the board.
- Different difficulty level (more fields, more snakes and more ladders).
<!-- - highlight the field that the avatar will placed on and delay the movement  -->
<!-- - Toggle between showing messages or not. -->


## Testing 

### User Testing

1. As a player:
	- I can easily understand the purpose of the game and how to play it. 
		- Instructions for the game load on first load of the page and are available at any point during the game. The visuals of the game also help the user understand its purpose and how to play.
	- I can go back to instructions if I need to and read them again.
		- Instructions are available at the click of !["Help icon"]().
	- I can choose the avatar I want to use and chnge it at any time during the game.
		- The player can choose from two avatars and can change it at any point in the Instructions section. 
	- I can see the different types of fields and understand what will happen when.
		- The board contains the images of snakes and ladders that indicate the direction of movement for the avatars.
	-	I can see where the players are on the board at each point of the game, see their dice throw results and follow as each of them moves.
		- The avatars are moving by one field at a time to simulate movement of pawns on a real-life board. This helps the player follow what is happening during the game.
	- I know whose turn it is.
		<!-- - The player's turn is initiated by a throw of dice. When Croc's turn starts, his result increases size temporarily and/or a message pops up with his result. -->
	-	I know who won the game. 
		- When one of the players reaches the last field a message with information who won appears. 
	- I can reset the game at any point.
		- A Reset button that reloads the game is visible at all times during the game and can be clicked when needed.
	- I can play the game again.
		- Once a game is finished, the board and all objects are reset and reloaded. The dice switches back to Start Game button and a new game can me started. 
		<!-- • I can find out more about the game creator and their work. -->

2. As a returning player: 
	- On returning to/reloading the site I don't want to see the instructions pop up again.
		- Instructions appear automatically only on first loading the page. After that, when player loads the page again, they are presented with the board, but can access instructions/avatars by clicking the Help button.
  - I want to be able to select another avatar at any point during the game.
		- Avatar can be swapped at any time in the instructions sections without board beign reset.
  - I can playe the game on another device and have the same user experience.
		- The game has been designed to appear correctly and maintain the same functionality on devices of different sizes using media queries. On SurfaceDuo, however, some vertical scrolling is required to show the board in full. It does not affect the player experience too much though since the whole board is visible on the screen.

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator]()
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator)


### Bugs and Fixes

During the development and testing the game various bugs appeared. A summary of most important ones can be found below: 
<!-- 1. 	issue with the way board is showing on small devices; need to fix this - resized fields / Added media queries;  -->
1.  Dice not hiding after viewing and closing Instructions. The use of showDice() function does not solve the issue as it shows the dice even if game not started preventing initiation of game. 
	__FIXED__ Removed dice toggle from hide() function when toggling Instructions. 

2. Various issues with hidding board and game buttons (Start button, Dice and Reset Button) when showing full screen messages and instruction text. 
	__FIXED__ Removed div for AI's turn message and showing all messages using the same 'message-box' div (otherwise, if both coinicinding clicking the one on top would unhide the board while still showing the second message) and eventually hiding the 'game-container' div rather than just 'game-board' div to solve issues with Dice and Reset Game being visible.

3. Game could be initiated even if avatar is not selected, resulting in the avatar showing as 'null' instead of an image. 	  	  __FIXED__ Added checkForAvatar() function to the Let's go button, which displays a "Choose avatar!" message and prevents the Instructions from closing. This way the player cannot start the game until one of the avatars is selected.

4. Changing avatar while game started causes duplication of avatar and its placement in the first field. 
	__FIXED__ Adjusted SelectAvatar() function to place the avatar in its current field rather than f1 and in f1 only if no avatar has been previously selected.

5. Reset Board adds another game board below with reverse numbers; objects values not cleared.
	__FIXED__  Changed Reset Button to reload page rather than create new board. Before board is created the innerHtML of the 'game-board' is now first cleared to prevent similar issues when createGameBoard function is initiated without window reloading. Will prevent issues if any new feaures are added in the future. 
	
6. When goesFirst() result is tie, Start Button replaced by Dice not allowing to the player to try again nor to proceed with the game. 
	__FIXED__ Deleted showDice() from goesFirst() tie condition.

7. 	Players position reaching beyond 25 causing undefined errors.
	__FIXED__ Adjusted function currentPlayerTurn() to change currentPlayer.postion and newPosition to 25 as well as actual placement of the avatar on the board. This way positons are never out of range.
	
8. All movment functions for both players executing at the same time making it difficult to understand what is happening and whose turn it is.
	__FIXED__ Added interval for the currentPlayerTurn() function to imitate movement on the board and setTimeouts and messages to inform the player of snakes/ladders and turns. As further improvement and to prevent messages and movements overlapping, added initiateAiMove() function and embeded it in checkType() so that it gets initiated only at the end of the player turn. Previously used setTimout() was not precise enough - the break was too short if the special field message was displayed.

9. On first starting the game after loading the page for the first time 'Choose avatar' message showing briefly. 
	__FIXED__ Cleared message content as a first step of goesFirst().

<!-- 10. After deploying, it appears that the link to the dice image is broken
 __FIXED__ Removed ../ from the start of the path -->



<!-- ### Unfixed Bugs

You will need to mention unfixed bugs and why they were not fixed. This section should include shortcomings of the frameworks or technologies used. Although time can be a big variable to consider, paucity of time and difficulty understanding implementation is not a valid reason to leave bugs unfixed. 
 -->

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
	<!-- - Select Pages -->
  <!-- - From the source section drop-down menu, select the Master Branch / root (without theme) -->
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here: 

## Credits 

A great thank you to: 
- My mentor, Caleb, for the most valuable pointers on how to visualise the movement on the board and support throughout the whole project.
- [How to code school](https://www.howtocodeschool.com) and [w3School](https://www.w3schools.com/) for various hints and tips on JavaScript functionality.
- [BetterProgramming](https://betterprogramming.pub/how-to-build-a-chess-board-with-javascript-480ab182739e?gi=e116ff4de5b6) for great help in working out how to generate the board. 
- Web Dev Simplified and their [YouTube Tic Tac Toe tutorial](https://www.youtube.com/watch?v=Y-GkMjUZsmM&t=1478s) for the inspiration on alternatives to using alerts.
- My son for creating the art for the game.
- Code Speedy for tips on how [create variables dynamically](https://www.codespeedy.com/dynamic-variable-names-in-javascript)

### Content 

- Information about the deployement to GitHub were taken from a sample Readme file provided by CodeInstitute.
- The icon for the help button was taken from [Font Awesome](https://fontawesome.com/)

### Media

- Images of the avatars, snake and ladder were created by my son, Phillip.
- Background image is a photo by Pexels, downloaded form Pixelbay

<!-- ## Other General Project Advice

Below you will find a couple of extra tips that may be helpful when completing your project. Remember that each of these projects will become part of your final portfolio so it’s important to allow enough time to showcase your best work! 

- One of the most basic elements of keeping a healthy commit history is with the commit message. When getting started with your project, read through [this article](https://chris.beams.io/posts/git-commit/) by Chris Beams on How to Write  a Git Commit Message 
  - Make sure to keep the messages in the imperative mood 


- Do some extra research on good and bad coding practices, there are a handful of useful articles to read, consider reviewing the following list when getting started:
  - [Writing Your Best Code](https://learn.shayhowe.com/html-css/writing-your-best-code/)
  - [HTML & CSS Coding Best Practices](https://medium.com/@inceptiondj.info/html-css-coding-best-practice-fadb9870a00f)
  - [Google HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html#General)

Getting started with your Portfolio Projects can be daunting, planning your project can make it a lot easier to tackle, take small steps to reach the final outcome and enjoy the process!  --> 