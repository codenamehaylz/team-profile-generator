# Team Profile Generator

## Description

The Team Profile Generator is a command line application. The app prompts the user with questions about their team members and then generates a HTML file using those inputs. The result is a styled web page that displays cards for each team member and their information. 

See the screenshot below for an example of a generated page.

![Screenshot of a 'My Team' web page created using the app](/images/team-generator-ss.png)

## Installation
Download or clone this repository, and then use the command line (e.g. Git Bash) to navigate to team-profile-generator\starter. To run the program you must first enter `npm install`. Then start the program by typing `node index.js`.

## Usage
The program will ask questions one at a time, starting with information about the Team Manager. It will then ask if you wish to add an Engineer, an Intern, or to finish building the team. You can add as many team members as you like. Once you select 'finish building the team', your html file entitled 'team.html' will be created inside the 'output' folder.

## Features
- Node.js
- inquirer npm for prompts
- jest npm for tests
- Bootstrap CSS
- Custom CSS styling
- fontawesome icons

## License
MIT License.