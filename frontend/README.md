# HTML/CSS/JS web page 

## What it consists of and how to navigate it?
* One page (hello.html) is the login/registration page that takes the credentials and sends them to obtain a JWT token from the API,
saving the token in the browser's storage.
* The other page (main.html) is the primary page that all the action takes place in (group and character data is created/displayed).
* The supporting CSS and JS files are in their respective folders.

## How to run it locally?
The project is written now how it is on the server, which means that to run locally it is required to:
* in *scripts/hello.js* **replace the 4th for the 5th line** (const api url declaration)
* in *scripts/hello.js* **replace the 8th for the 10th line** (const main.html location filled in)
* in *scripts/main_init.js* **replace the 6th for the 7th line** (const api url declaration)
* in *scripts/main_init.js* **replace the 12th for the 11th line** (const hello.html location filled in)

## How to see the a preview of a functioning account and how the webpage is supposed to be used?
* When opening (http://34.107.6.19/), fill in the login credentials and log in.
* Select one of the prepared parties in the picker.
* Select one of the prepared opponent groups in the other picker.
* Edit, delete or do whatever else to them 
(**very important - don't change the HP in rapid successions - sending multiple update requests tends to cause internal server errors**)

## How to test the functionalities?
* When opening (http://34.107.6.19/) or hello.html locally, you sign in with all the needed to fill out fields
* You click the "Create new" button for either a opponent group or a party and enter a title for them in a modal.
* You select the created party in a picker and click the "Create new PC" or "Create new NPC" accordingly.
* You write a name, a number between -7 and 100 for the Armor Class, a number between 1 and 1024 for the Hit Points and a description.
* You can quickly mark taking damage by entering a "HP change" number and clicking the arrow down button to see the HP decrease
(**very important - don't change the HP in rapid successions - sending multiple update requests tends to cause internal server errors**)
* After that, the only things left are more characters or their edition or deletion.
