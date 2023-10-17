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