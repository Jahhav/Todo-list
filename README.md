Welcome to the TO-DO LIST web app! This simple and intuitive application helps you manage your tasks efficiently. And it's pretty simple to use :)

Prerequisites:
Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

Installation

Extract the Project Files:

If you're using WinRAR, right-click the zipped file and select "Extract Here".
Navigate to the Project Directory:

Open your terminal.
Navigate to the folder "interview_project_jan_havlat" using the command:

cd path/to/interview_project_jan_havlat

Run the following command to install the required dependencies (just if you don't have it):

npm install

Start the Application:

npm start
If you encounter any errors, verify npm is installed by checking its version:
npm -v

Usage
Once the application is running, you can perform the following actions:

1. Add a New Task:
   Click on the white input box, type your task, and click "Add Task".

2. Mark a Task as Completed:
   Click on the circle on the left side of the task item.

3. Mark a Task as Incomplete:
   Click on the exclamation mark on the left side of the task item.

4. Edit an Existing Task:
   Click on the marker icon on the right side of the task item. To cancel editing, press enter or click anywhere outside the editing box.

5. Remove a Task:
   Click on the "X" in the circle to remove the task from the list.

Features

1. Task Completion:
   Completed tasks are highlighted in green and sorted to the bottom of the list. The circle on the left side is filled for these tasks.

2. Task Incompletion:
   Incomplete tasks are highlighted in yellow, with an orange exclamation mark on the left side.

3. Dynamic Sorting:
   Unmarking a completed task will move it back to the active tasks list.

Known Issues

1. Item Shuffling:
   Tasks may appear shuffled after a page refresh.

2. Editing Bug:
   Cancelling the editing of an item by clicking the marker icon again can feel buggy.

3. Performance:
   The app may exhibit slow performance due to the API and local run.

Conclusion
Thank you for using the TO-DO LIST web app! I hope it helps you stay organized and efficient. If you encounter any issues or have suggestions for improvements, please feel free to contribute.
