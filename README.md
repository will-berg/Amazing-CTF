# README
This is a web application for a fictional cybersecurity company called AmazingCTF. The company hosts different hacking challenges on their site that users can engage with after creating an account.

## Running the App
In order to run the application, you need to have Git, Docker, and Docker Compose installed on your computer. The app has not yet been deployed on the internet; instead, to run the application you need to follow these steps:


1. Clone the repository to your local computer: `git clone https://github.com/MehirWolde/Amazing-CTF.git`
2. Navigate to the root of the cloned repository
3. Run `docker-compose up --build` to build the application and run it in a container
4. The application is now accessible locally at port 3000. To use it, go to the url: [http://localhost:3000](http://localhost:3000)

for easy convenience, you can copy and paste the following commands into your terminal:
```bash
git clone https://github.com/MehirWolde/Amazing-CTF.git
cd Amazing-CTF
docker-compose up --build
```
and then open browser to [http://localhost:3000](http://localhost:3000)

## Doing the hacks
Short description on how to perform each hack.
### ReDos
The following input will take the server more than 5 seconds to process which will count as successfully completing this hack.
```
username: ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCX
password: A(B|C+)+D
```
### Hidden
When inspecting the page source you'll find a comment stating that we should remove aboutOld.
Navigate to this page and you will have competed this hack.

### XSS Easy
Input:
```
<script>alert("You have been hacked!")</script>
```
and this hack will be completed

### XSS Medium
Sometimes, there is filtering preventing you from inserting <script> tags.
To complete this hack you must circumvent this filtering.
Input:
```
<img onerror=alert("You have been hacked!")/>
```
And you will have completed this hack.

### Password
You need to decipher the correct password and use the correct username to complete this hack.
```
username: InternAccount
password: GoodJob
```
